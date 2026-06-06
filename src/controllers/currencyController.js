import { getCurrencies } from "../services/dbService.js";

const SITE_URL = process.env.SITE_URL || "https://utils.leviro.net";

export const getCurrencyConverter = (req, res) => {
  const { t, locale, canonicalUrl } = res.locals;
  const title = t("tools.currencyConverter.title");
  const description = t("tools.currencyConverter.description");
  const keywords = t("tools.currencyConverter.keywords");

  res.render("services/currency-converter", {
    title,
    description,
    keywords,
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url: canonicalUrl,
      description,
      inLanguage: locale,
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
