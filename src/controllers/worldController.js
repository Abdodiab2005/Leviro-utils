import {
  getCountries,
  getStates,
  getCities,
} from "../services/worldService.js";

export const getWorldInfo = (req, res) => {
  const { t, canonicalUrl } = res.locals;
  const title = t("tools.worldInfo.title");
  const description = t("tools.worldInfo.description");
  const keywords = t("tools.worldInfo.keywords");
  res.render("services/world-info", {
    title,
    description,
    keywords,
    schemaData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url: canonicalUrl,
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
