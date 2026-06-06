import en from "../locales/en.js";
import ar from "../locales/ar.js";

const translations = { en, ar };
const SITE_URL = process.env.SITE_URL || "https://utils.leviro.net";

function resolve(locale, key) {
  const parts = key.split(".");
  let value = translations[locale];
  for (const part of parts) {
    if (value == null) break;
    value = value[part];
  }
  if (value !== undefined && value !== null) return value;
  if (locale !== "en") return resolve("en", key);
  return key;
}

export const i18nMiddleware = (req, res, next) => {
  const reqPath = req.path;
  const isArabic = reqPath === "/ar" || reqPath.startsWith("/ar/");
  const locale = isArabic ? "ar" : "en";

  // basePath strips the /ar prefix so we can build both alternate URLs
  const basePath = isArabic ? reqPath.slice(3) || "/" : reqPath;
  const normalBase = basePath === "/" ? "" : basePath.replace(/\/$/, "");

  res.locals.locale = locale;
  res.locals.dir = locale === "ar" ? "rtl" : "ltr";
  res.locals.t = (key) => resolve(locale, key);

  // Alternate URLs used for hreflang tags and the language switcher
  res.locals.enUrl = `${SITE_URL}${normalBase || "/"}`;
  res.locals.arUrl = `${SITE_URL}/ar${normalBase}`;
  res.locals.langSwitchUrl = isArabic ? normalBase || "/" : `/ar${normalBase}`;

  // Prefix for internal links inside templates (/ar or empty)
  res.locals.localePrefix = isArabic ? "/ar" : "";

  next();
};

// Standalone helper usable in controllers before middleware runs
export function getT(locale) {
  return (key) => resolve(locale ?? "en", key);
}
