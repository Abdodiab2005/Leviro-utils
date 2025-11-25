import multer from "multer";
import { PDFDocument } from "pdf-lib";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Configure Multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).single("pdfFile");

export const getPdfSplitter = (req, res) => {
  res.render("pdf-splitter", {
    title: "PDF Splitter",
    description: "Split PDF files by page ranges.",
  });
};

export const splitPdf = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed." });
    }

    const { pages } = req.body;
    if (!pages) {
      return res.status(400).json({ error: "Page selection is required." });
    }

    const socketId = req.body.socketId;
    const io = req.io;

    try {
      if (socketId && io) {
        io.to(socketId).emit("progress", {
          message: "Loading PDF...",
          percent: 10,
        });
      }

      const pdfDoc = await PDFDocument.load(req.file.buffer);
      const totalPages = pdfDoc.getPageCount();
      const newPdf = await PDFDocument.create();

      // Parse page ranges
      const pageIndices = [];
      const ranges = pages.split(",");

      for (const range of ranges) {
        const parts = range.trim().split(/[-:]/); // Support both - and :
        if (parts.length === 1) {
          const pageNum = parseInt(parts[0]);
          if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            pageIndices.push(pageNum - 1);
          }
        } else if (parts.length === 2) {
          const start = parseInt(parts[0]);
          const end = parseInt(parts[1]);
          if (
            !isNaN(start) &&
            !isNaN(end) &&
            start >= 1 &&
            end <= totalPages &&
            start <= end
          ) {
            for (let i = start; i <= end; i++) {
              pageIndices.push(i - 1);
            }
          }
        }
      }

      if (pageIndices.length === 0) {
        return res.status(400).json({ error: "Invalid page selection." });
      }

      if (socketId && io) {
        io.to(socketId).emit("progress", {
          message: "Splitting pages...",
          percent: 30,
        });
      }

      const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);

      let processed = 0;
      for (const page of copiedPages) {
        newPdf.addPage(page);
        processed++;
        if (socketId && io) {
          const percent =
            30 + Math.round((processed / copiedPages.length) * 60);
          io.to(socketId).emit("progress", {
            message: `Processing page ${processed}/${copiedPages.length}`,
            percent,
          });
        }
      }

      if (socketId && io) {
        io.to(socketId).emit("progress", {
          message: "Saving file...",
          percent: 95,
        });
      }

      const pdfBytes = await newPdf.save();
      const fileName = `split-${uuidv4()}.pdf`;
      const downloadPath = path.join("public", "downloads");

      if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
      }

      fs.writeFileSync(path.join(downloadPath, fileName), pdfBytes);

      // Auto-delete after 10 minutes
      setTimeout(() => {
        const filePath = path.join(downloadPath, fileName);
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) console.error(`Error deleting file ${fileName}:`, err);
            else console.log(`Auto-deleted file ${fileName}`);
          });
        }
      }, 10 * 60 * 1000); // 10 minutes

      if (socketId && io) {
        io.to(socketId).emit("progress", { message: "Done!", percent: 100 });
      }

      res.json({ downloadUrl: `/api/download/${fileName}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
};

export const downloadPdf = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join("public", "downloads", fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        if (!res.headersSent) {
          res.status(500).send("Error downloading file");
        }
      }
    });
  } else {
    res.status(404).send("File not found or has expired.");
  }
};
