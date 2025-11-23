import {
  getCountries,
  getStates,
  getCities,
} from "../services/worldService.js";

export const getWorldInfo = (req, res) => {
  res.render("services/world-info", {
    title: "World Info",
    description:
      "Explore detailed information about countries, states, and cities worldwide.",
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
