const CACHE_NAME = "leviro-utils-v2";
const ASSETS = [
  "/",
  "/css/output.css",
  "/manifest.json",
  "/services/age-calculator",
  "/services/currency-converter",
  "/services/secret-generator",
  "/services/password-generator",
  "/services/qr-generator",
  "/services/json-formatter",
  "/services/image-converter",
  "/services/word-counter",
  "/services/pdf-splitter",
  "/services/pwa-generator",
  "/services/seo-generator",
  "/services/world-info",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
