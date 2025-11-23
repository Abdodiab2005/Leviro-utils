const CACHE_NAME = "leviro-utils-v1";
const ASSETS = [
  "/",
  "/css/output.css",
  "/manifest.json",
  "/services/age-calculator",
  "/services/currency-converter",
  "/services/secret-generator",
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
