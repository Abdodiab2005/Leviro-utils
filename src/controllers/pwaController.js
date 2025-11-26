import multer from "multer";
import sharp from "sharp";
import archiver from "archiver";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Configure Multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("logo");

export const getPwaGenerator = (req, res) => {
  res.render("pwa-generator", {
    title: "PWA Asset Generator",
    description: "Generate PWA assets, manifest, and more from a single logo.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "PWA Asset Generator",
      url: "https://leviro.net/services/pwa-generator",
      description:
        "Generate PWA assets, manifest, and more from a single logo.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

export const generatePwa = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No logo uploaded." });
    }

    const {
      appName,
      shortName,
      description,
      themeColor,
      backgroundColor,
      startUrl,
      display,
    } = req.body;

    try {
      const archive = archiver("zip", { zlib: { level: 9 } });
      const zipName = `pwa-assets-${uuidv4()}.zip`;
      const downloadPath = path.join("public", "downloads");

      if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
      }

      const output = fs.createWriteStream(path.join(downloadPath, zipName));

      output.on("close", () => {
        // Auto-delete after 10 minutes
        setTimeout(() => {
          const filePath = path.join(downloadPath, zipName);
          if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
              if (err) console.error(`Error deleting file ${zipName}:`, err);
            });
          }
        }, 10 * 60 * 1000);

        res.json({ downloadUrl: `/api/download/${zipName}` });
      });

      archive.on("error", (err) => {
        throw err;
      });

      archive.pipe(output);

      // 1. Process Images
      const imageBuffer = req.file.buffer;

      // 192x192
      const icon192 = await sharp(imageBuffer).resize(192, 192).toBuffer();
      archive.append(icon192, { name: "icons/icon-192x192.png" });

      // 512x512
      const icon512 = await sharp(imageBuffer).resize(512, 512).toBuffer();
      archive.append(icon512, { name: "icons/icon-512x512.png" });

      // favicon.ico (32x32 png for simplicity, usually sufficient)
      const favicon = await sharp(imageBuffer).resize(32, 32).toBuffer();
      archive.append(favicon, { name: "favicon.ico" });

      // 2. Generate manifest.json
      const manifest = {
        name: appName || "My PWA",
        short_name: shortName || "PWA",
        description: description || "My Awesome PWA",
        start_url: startUrl || "/",
        display: display || "standalone",
        background_color: backgroundColor || "#ffffff",
        theme_color: themeColor || "#000000",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      };
      archive.append(JSON.stringify(manifest, null, 2), {
        name: "manifest.json",
      });

      // 3. Generate robots.txt
      const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap.xml`;
      archive.append(robotsTxt, { name: "robots.txt" });

      // 4. Generate sitemap.xml (Plain)
      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
      archive.append(sitemapXml, { name: "sitemap.xml" });

      archive.finalize();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
};
