import express from "express";
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

// API Routes
router.get("/api/currencies", getCurrenciesAPI);
router.post("/api/secret/generate", generateSecretAPI);
router.get("/api/countries", getCountriesAPI);

export default router;
