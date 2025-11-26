import { getCurrencies } from "../services/dbService.js";

export const getCurrencyConverter = (req, res) => {
  res.render("services/currency-converter", {
    title: "Currency Converter",
    description:
      "Convert between currencies instantly using real-time exchange rates.",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Currency Converter",
      url: "https://leviro.net/services/currency-converter",
      description:
        "Convert between currencies instantly using real-time exchange rates.",
      applicationCategory: "Utility",
      operatingSystem: "All",
    }),
  });
};

export const getCurrenciesAPI = (req, res) => {
  const currencies = getCurrencies();
  res.json(currencies);
};
