import express from "express";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";
import expressLayouts from "express-ejs-layouts";
import mainRoutes from "./src/routes/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const __dirname = path.resolve();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests, please try again later",
});

// View Engine Setup
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.set("trust proxy", 1);

const corsOptions = process.env.CORS_OPTIONS?.split(",");
const SITE_URL = process.env.SITE_URL || "https://leviro.net";

// Middleware
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith("sw.js") || filePath.endsWith("manifest.json")) {
        // Service worker / manifest must always revalidate so updates land
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      } else if (/\.(?:png|jpg|jpeg|svg|webp|ico|woff2?)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (/\.(?:css|js)$/i.test(filePath)) {
        // CSS/JS aren't fingerprinted yet, so revalidate on each load
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      }
    },
  })
);

// SEO defaults: expose siteUrl + canonicalUrl to every view
app.use((req, res, next) => {
  res.locals.siteUrl = SITE_URL;
  res.locals.canonicalUrl = `${SITE_URL}${req.path === "/" ? "/" : req.path.replace(/\/$/, "")}`;
  next();
});

// HTML responses should never be stale-cached by browsers
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache");
  next();
});
app.use(
  cors({
    origin: corsOptions,
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Routes
app.use("/", mainRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).render("error", {
    title: "Error",
    description: "Something went wrong",
    message: "Internal Server Error",
  });
});

import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);
const io = new Server(server);

// Make io available in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
