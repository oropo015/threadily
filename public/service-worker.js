// Service worker version
const CACHE_VERSION = "v1"
const CACHE_NAME = `threadily-cache-${CACHE_VERSION}`

// Assets to cache on install
const PRECACHE_ASSETS = [
  "/",
  "/app",
  "/logo.png",
  "/favicon.ico",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/apple-icon.png",
  "/social-media-thread-generator",
]

// Install event - precache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith("threadily-cache-") && cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              return caches.delete(cacheName)
            }),
        )
      })
      .then(() => {
        return self.clients.claim()
      }),
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Skip browser-sync requests
  if (event.request.url.includes("browser-sync")) {
    return
  }

  // Skip API requests
  if (event.request.url.includes("/api/")) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          // Cache the response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // If both cache and network fail, return a fallback
          if (event.request.url.includes(".html") || event.request.mode === "navigate") {
            return caches.match("/")
          }

          return new Response("Network error occurred", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          })
        })
    }),
  )
})

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
