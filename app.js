import express from "express";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";
import expressLayouts from "express-ejs-layouts";
import mainRoutes from "./src/routes/index.js";

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

const corsOptions = process.env.CORS_OPTIONS?.split(",");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
