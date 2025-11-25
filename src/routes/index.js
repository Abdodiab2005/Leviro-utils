import express from "express";
import rateLimit from "express-rate-limit";
import { getAgeCalculator } from "../controllers/ageController.js";
import {
  getCurrencyConverter,
  getCurrenciesAPI,
} from "../controllers/currencyController.js";
import {
  getSecretGenerator,
  generateSecretAPI,
} from "../controllers/secretController.js";
import {
  getWorldInfo,
  getCountriesAPI,
} from "../controllers/worldController.js";
import { getWordCounter } from "../controllers/wordController.js";
import {
  getPdfSplitter,
  splitPdf,
  downloadPdf,
} from "../controllers/pdfController.js";
import { getPwaGenerator, generatePwa } from "../controllers/pwaController.js";
import { getSeoGenerator } from "../controllers/seoController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    description:
      "A collection of useful tools including Age Calculator, Currency Converter, and Secret Generator.",
  });
});

router.get("/services/age-calculator", getAgeCalculator);
router.get("/services/currency-converter", getCurrencyConverter);
router.get("/services/secret-generator", getSecretGenerator);
router.get("/services/world-info", getWorldInfo);
router.get("/services/word-counter", getWordCounter);
router.get("/services/pdf-splitter", getPdfSplitter);

// API Routes
router.get("/api/currencies", getCurrenciesAPI);
router.post("/api/secret/generate", generateSecretAPI);
router.get("/api/countries", getCountriesAPI);
// Rate limiter for PDF splitting
const pdfLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    error:
      "You have reached the daily limit of 10 PDF uploads. Please try again tomorrow.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/api/pdf/split", pdfLimiter, splitPdf);
router.get("/api/download/:filename", downloadPdf);

// PWA Generator
router.get("/services/pwa-generator", getPwaGenerator);
router.post("/api/pwa/generate", generatePwa);

// SEO Generator
router.get("/services/seo-generator", getSeoGenerator);

export default router;
