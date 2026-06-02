import express from "express";
import { getAgeCalculator } from "../controllers/ageController.js";
import {
  getCurrencyConverter,
  getCurrenciesAPI,
} from "../controllers/currencyController.js";
import { getSecretGenerator } from "../controllers/secretController.js";
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
import { getQrGenerator } from "../controllers/qrController.js";
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
  getHtmlViewer,
  getHtmlToMarkdown,
  getMarkdownToHtml,
  getMarkdownToWhatsapp,
  getBmiCalculator,
  getTipCalculator,
  getUnitConverter,
  getLoanCalculator,
  getDiscountCalculator,
  getDurationCalculator,
} from "../controllers/utilsController.js";
import {
  apiLimiter,
  heavyApiLimiter,
  imageLimiter,
  pdfLimiter,
  pwaLimiter,
} from "../middleware/rateLimiters.js";
import {
  listCategories,
  showCategory,
} from "../controllers/categoryController.js";
import { categories, totalToolCount } from "../data/categories.js";
import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
});
const router = express.Router();

router.get("/", (req, res) => {
  const description =
    "Free online tools for developers and everyday tasks: password generator, JSON formatter, image converter, QR code maker, JWT decoder, regex tester, hash generator, Base64 encoder, color converter and more. No signup, all in your browser.";
  res.render("index", {
    title: "Free Online Tools",
    description,
    keywords:
      "free online tools, developer tools, daily utility tools, json formatter, image converter, qr generator, password generator, age calculator, currency converter, base64, jwt decoder, regex tester, hash generator, uuid, lorem ipsum, color picker, markdown preview, css minifier, timestamp converter",
    categoriesData: categories,
    totalToolCount,
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Leviro Utils",
      url: "https://utils.leviro.net/",
      description,
      potentialAction: {
        "@type": "SearchAction",
        target: "https://utils.leviro.net/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    }),
  });
});

// Category pages
router.get("/categories", listCategories);
router.get("/categories/:slug", showCategory);

// Tool pages (HTML shells - tools themselves run client-side)
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
router.get("/services/pwa-generator", getPwaGenerator);
router.get("/services/seo-generator", getSeoGenerator);

// New utility tools (all 100% client-side)
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

// HTML / Markdown converters
router.get("/services/html-viewer", getHtmlViewer);
router.get("/services/html-to-markdown", getHtmlToMarkdown);
router.get("/services/markdown-to-html", getMarkdownToHtml);
router.get("/services/markdown-to-whatsapp", getMarkdownToWhatsapp);

// Daily life calculators
router.get("/services/bmi-calculator", getBmiCalculator);
router.get("/services/tip-calculator", getTipCalculator);
router.get("/services/unit-converter", getUnitConverter);
router.get("/services/loan-calculator", getLoanCalculator);
router.get("/services/discount-calculator", getDiscountCalculator);
router.get("/services/duration-calculator", getDurationCalculator);

// API Routes - each gets a tailored rate limit
router.get("/api/currencies", apiLimiter, getCurrenciesAPI);
router.get("/api/countries", apiLimiter, getCountriesAPI);
router.post(
  "/api/image/convert",
  imageLimiter,
  upload.single("image"),
  convertImageAPI,
);
router.post("/api/pdf/split", pdfLimiter, splitPdf);
router.get("/api/download/:filename", heavyApiLimiter, downloadPdf);
router.post("/api/pwa/generate", pwaLimiter, generatePwa);

export default router;
