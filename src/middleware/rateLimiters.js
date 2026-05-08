import rateLimit from "express-rate-limit";

const make = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: message },
    skip: (req) => req.method === "OPTIONS",
  });

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

// Page navigation: generous so legitimate browsing is never throttled.
export const pageLimiter = make(
  15 * MIN,
  600,
  "Too many requests. Please slow down and try again in a few minutes."
);

// Generic API limit (light endpoints like GET /api/currencies, /api/countries).
export const apiLimiter = make(
  15 * MIN,
  300,
  "API rate limit exceeded. Try again in a few minutes."
);

// Tighter limit for endpoints that perform heavier work.
export const heavyApiLimiter = make(
  15 * MIN,
  60,
  "You're hitting this endpoint too quickly. Please wait a bit and retry."
);

// Image conversion is CPU-bound (Sharp).
export const imageLimiter = make(
  15 * MIN,
  20,
  "Image conversion limit reached (20 per 15 min). Please wait before uploading more."
);

// PDF splitting is heavy and stores temp files.
export const pdfLimiter = make(
  DAY,
  10,
  "Daily PDF upload limit reached (10 per day). Please try again tomorrow."
);

// PWA asset generation kicks off a zip + many image resizes.
export const pwaLimiter = make(
  HOUR,
  5,
  "PWA generation limit reached (5 per hour). Please wait before generating another."
);
