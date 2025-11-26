import sharp from "sharp";
import path from "path";
import fs from "fs";

export const getImageConverter = (req, res) => {
  res.render("services/image-converter", {
    title: "Image Converter",
    description:
      "Convert images between different formats (JPG, PNG, WEBP, AVIF) with quality control.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Image Converter",
      url: "https://leviro.net/services/image-converter",
      description:
        "Convert images between different formats (JPG, PNG, WEBP, AVIF) with quality control.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

export const convertImageAPI = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded" });
  }

  const { format = "jpeg", quality = 80 } = req.body;
  const inputPath = req.file.path;
  const outputFileName = `converted-${Date.now()}.${format}`;
  const outputPath = path.join("public/downloads", outputFileName);

  try {
    // Ensure downloads directory exists
    if (!fs.existsSync("public/downloads")) {
      fs.mkdirSync("public/downloads", { recursive: true });
    }

    let pipeline = sharp(inputPath);

    // Apply format and quality
    const qual = parseInt(quality);
    if (format === "jpeg" || format === "jpg") {
      pipeline = pipeline.jpeg({ quality: qual });
    } else if (format === "png") {
      pipeline = pipeline.png({ quality: qual });
    } else if (format === "webp") {
      pipeline = pipeline.webp({ quality: qual });
    } else if (format === "avif") {
      pipeline = pipeline.avif({ quality: qual });
    }

    await pipeline.toFile(outputPath);

    // Clean up uploaded file
    fs.unlinkSync(inputPath);

    // Return download URL
    res.json({
      downloadUrl: `/downloads/${outputFileName}`,
      filename: outputFileName,
    });

    // Schedule cleanup of converted file (e.g., after 10 mins)
    setTimeout(() => {
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    }, 10 * 60 * 1000);
  } catch (error) {
    console.error("Image conversion error:", error);
    // Try to clean up uploaded file if it exists
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }
    res.status(500).json({ error: "Failed to convert image" });
  }
};
