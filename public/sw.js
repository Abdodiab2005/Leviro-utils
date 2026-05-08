// Bump this version on every release so old caches are evicted
const VERSION = "v8";
const STATIC_CACHE = `leviro-static-${VERSION}`;
const RUNTIME_CACHE = `leviro-runtime-${VERSION}`;

// Only pre-cache truly static, fingerprintable assets.
// HTML pages are intentionally NOT pre-cached - they must come from network.
const PRECACHE_ASSETS = [
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  // Activate the new SW as soon as it finishes installing
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Drop any cache that doesn't match the current version
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => ![STATIC_CACHE, RUNTIME_CACHE].includes(k))
          .map((k) => caches.delete(k))
      );
      // Enable navigation preload for faster network-first responses
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      await self.clients.claim();
    })()
  );
});

// Allow page to trigger immediate update
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Never cache API calls, uploads, or downloads - always go to network
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/uploads/")
  ) {
    return;
  }

  // Network-first for navigations / HTML so updates show up immediately,
  // with a cached fallback for offline use.
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      (async () => {
        try {
          const preload = await event.preloadResponse;
          if (preload) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(req, preload.clone());
            return preload;
          }
          const fresh = await fetch(req);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(req);
          if (cached) return cached;
          return caches.match("/");
        }
      })()
    );
    return;
  }

  // Stale-while-revalidate for static assets (CSS/JS/images/fonts)
  event.respondWith(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(req);
      const networkPromise = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      return cached || (await networkPromise) || new Response("", { status: 504 });
    })()
  );
});
