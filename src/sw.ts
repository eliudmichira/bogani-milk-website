/// <reference lib="webworker" />

// Define the type of this file as a service worker
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'bogani-cache-v1'; // For precaching static assets
const RUNTIME = 'runtime-bogani-v1'; // For dynamic runtime caching

// Resources to cache initially
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // Add other static assets like logo, critical CSS/JS if not handled by runtime caching strategy
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

// Fetch strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests (e.g., Google Analytics, external APIs not meant to be cached by SW)
  if (!event.request.url.startsWith(self.location.origin)) {
    // Let the browser handle non-same-origin requests by default
    return;
  }

  // CSS and JS: Stale-while-revalidate
  if (event.request.url.match(/\.(css|js)$/i)) {
    event.respondWith(
      caches.open(RUNTIME).then(cache => {
        return cache.match(event.request).then(cachedResponse => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            // Check if response is valid before caching
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // If network fails, and not in cache, this will effectively result in an error for the user.
            // This is standard for stale-while-revalidate if cache is empty and network fails.
            // To provide a fallback, you could return a specific offline response here if cachedResponse is also null.
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  }
  // Images: Cache-first, then network, cache if fetched, with 404 fallback
  else if (event.request.url.match(/\.(?:jpg|jpeg|png|gif|svg|webp)$/i)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          // Check if response is valid before caching
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            return caches.open(RUNTIME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse; // Return potentially non-cacheable response (e.g. opaque)
        }).catch(() => {
          // Return a generic 404 response for images not found in cache or network
          return new Response('Image not found or network error', { status: 404, statusText: 'Image not found or network error' });
        });
      })
    );
  }
  // Fonts: Cache-first, then network, cache if fetched
  else if (event.request.url.match(/\.(?:woff|woff2|ttf|otf)$/i)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
           // Check if response is valid before caching
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            return caches.open(RUNTIME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        }).catch(() => {
          // If network fails for fonts, and not in cache, let the error propagate.
          // The browser might have its own fallback mechanisms for fonts.
        });
      })
    );
  }
  // HTML and other same-origin assets: Cache-first, then network, cache if fetched (default)
  else {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(response => {
          // Ensure responses are valid before caching
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          return caches.open(RUNTIME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        }).catch(() => {
          // Optional: Fallback to a generic offline page if network fails for HTML
          // For example: return caches.match('/offline.html');
          // For now, just letting the error propagate.
        });
      })
    );
  }
});