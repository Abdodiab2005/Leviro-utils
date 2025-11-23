import { getCurrencies } from "../services/dbService.js";

export const getCurrencyConverter = (req, res) => {
  res.render("services/currency-converter", {
    title: "Currency Converter",
    description:
      "Convert between currencies instantly using real-time exchange rates.",
  });
};

export const getCurrenciesAPI = (req, res) => {
  const currencies = getCurrencies();
  res.json(currencies);
};
