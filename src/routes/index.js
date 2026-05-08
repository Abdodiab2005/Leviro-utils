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
import { getPasswordGenerator } from "../controllers/passwordController.js";
import { getQrGenerator, generateQrAPI } from "../controllers/qrController.js";
import { getJsonFormatter } from "../controllers/jsonController.js";
import {
  getImageConverter,
  convertImageAPI,
} from "../controllers/imageController.js";
import {
  getBase64Tool,
  getUrlEncoder,
  getHashGenerator,
  getColorConverter,
  getLoremIpsum,
  getUuidGenerator,
  getMarkdownPreview,
  getCaseConverter,
  getTimestampConverter,
  getJwtDecoder,
  getRegexTester,
  getCssMinifier,
} from "../controllers/utilsController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", (req, res) => {
  const description =
    "Free online tools for developers and everyday tasks: password generator, JSON formatter, image converter, QR code maker, JWT decoder, regex tester, hash generator, Base64 encoder, color converter and more. No signup, all in your browser.";
  res.render("index", {
    title: "Free Online Tools",
    description,
    keywords:
      "free online tools, developer tools, daily utility tools, json formatter, image converter, qr generator, password generator, age calculator, currency converter, base64, jwt decoder, regex tester, hash generator, uuid, lorem ipsum, color picker, markdown preview, css minifier, timestamp converter",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Leviro Utils",
      url: "https://leviro.net/",
      description,
      potentialAction: {
        "@type": "SearchAction",
        target: "https://leviro.net/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    }),
  });
});

router.get("/services/age-calculator", getAgeCalculator);
router.get("/services/currency-converter", getCurrencyConverter);
router.get("/services/secret-generator", getSecretGenerator);
router.get("/services/world-info", getWorldInfo);
router.get("/services/word-counter", getWordCounter);
router.get("/services/pdf-splitter", getPdfSplitter);
router.get("/services/password-generator", getPasswordGenerator);
router.get("/services/qr-generator", getQrGenerator);
router.get("/services/json-formatter", getJsonFormatter);
router.get("/services/image-converter", getImageConverter);

// New utility tools
router.get("/services/base64", getBase64Tool);
router.get("/services/url-encoder", getUrlEncoder);
router.get("/services/hash-generator", getHashGenerator);
router.get("/services/color-converter", getColorConverter);
router.get("/services/lorem-ipsum", getLoremIpsum);
router.get("/services/uuid-generator", getUuidGenerator);
router.get("/services/markdown-preview", getMarkdownPreview);
router.get("/services/case-converter", getCaseConverter);
router.get("/services/timestamp-converter", getTimestampConverter);
router.get("/services/jwt-decoder", getJwtDecoder);
router.get("/services/regex-tester", getRegexTester);
router.get("/services/css-minifier", getCssMinifier);

// API Routes
router.get("/api/currencies", getCurrenciesAPI);
router.post("/api/secret/generate", generateSecretAPI);
router.get("/api/countries", getCountriesAPI);
router.post("/api/qr/generate", generateQrAPI);
router.post("/api/image/convert", upload.single("image"), convertImageAPI);

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
