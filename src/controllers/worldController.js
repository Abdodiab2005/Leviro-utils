import {
  getCountries,
  getStates,
  getCities,
} from "../services/worldService.js";

export const getWorldInfo = (req, res) => {
  const description =
    "Browse detailed information about every country, state, and city in the world: capital, currency, calling code, time zone, region, languages, and more.";
  res.render("services/world-info", {
    title: "World Info - Countries, States & Cities",
    description,
    keywords:
      "country information, world countries data, calling codes, country capital, currency by country, states list, cities list, country search",
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "World Info",
      url: "https://utils.leviro.net/services/world-info",
      description,
      applicationCategory: "Reference",
      operatingSystem: "All",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
  });
};

export const getCountriesAPI = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const type = req.query.type || "countries";

    let result;
    switch (type) {
      case "states":
        result = getStates({ page, limit, search });
        break;
      case "cities":
        result = getCities({ page, limit, search });
        break;
      case "countries":
      default:
        result = getCountries({ page, limit, search });
        break;
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching world data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
