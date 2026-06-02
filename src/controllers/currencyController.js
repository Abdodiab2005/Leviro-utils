import { getCurrencies } from "../services/dbService.js";

export const getCurrencyConverter = (req, res) => {
  const description =
    "Free online currency converter with up-to-date exchange rates for 150+ world currencies. Convert USD, EUR, GBP, JPY, EGP and more in real time.";
  res.render("services/currency-converter", {
    title: "Currency Converter",
    description,
    keywords:
      "currency converter, exchange rate calculator, usd to eur, gbp to usd, real-time currency, money converter, forex rates",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Currency Converter",
      url: "https://utils.leviro.net/services/currency-converter",
      description,
      applicationCategory: "Finance",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

export const getCurrenciesAPI = (req, res) => {
  const currencies = getCurrencies();
  res.json(currencies);
};
