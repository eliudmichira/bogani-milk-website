/// <reference lib="webworker" />

// Define the type of this file as a service worker
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'bogani-cache-v1';
const RUNTIME = 'runtime';

// Resources to cache initially
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
];

// Installation - precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activation - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch strategy - Cache first, then network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests like Google Analytics
  if (event.request.url.startsWith(self.location.origin)) {
    // For image requests, use network-first strategy
    if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
      event.respondWith(
        caches.open(RUNTIME).then(cache => {
          return fetch(event.request)
            .then(response => {
              // Put a copy in cache for later and return response
              cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => {
              // If network fails, try from cache
              return caches.match(event.request).then(cachedResponse => {
                return cachedResponse || Promise.resolve(new Response('Image not found', {
                  status: 404,
                  statusText: 'Not found'
                }));
              });
            });
        })
      );
    } else {
      // For HTML and other assets, use cache-first strategy
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return caches.open(RUNTIME).then(cache => {
            return fetch(event.request).then(response => {
              // Put a copy of the response in the runtime cache.
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            });
          });
        })
      );
    }
  }
}); 