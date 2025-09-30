const CACHE_NAME = 'gallaa-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap'
];

const API_CACHE_URLS = [
  '/api/health',
  '/api/pricing'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful API responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // Handle static assets with cache first strategy
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache the response for future use
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });

            return response;
          });
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'registration-sync') {
    event.waitUntil(syncRegistrations());
  }
});

async function syncRegistrations() {
  try {
    const registrations = await getStoredRegistrations();
    for (const registration of registrations) {
      try {
        await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registration.data)
        });
        // Remove from IndexedDB after successful sync
        await removeStoredRegistration(registration.id);
      } catch (error) {
        console.log('Failed to sync registration:', error);
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', event => {
  if (!event.data) return;

  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'view',
        title: 'View Details'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Gallaa', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Utility functions for IndexedDB operations
async function getStoredRegistrations() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('gallaa-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['registrations'], 'readonly');
      const store = transaction.objectStore('registrations');
      const getRequest = store.getAll();
      
      getRequest.onsuccess = () => resolve(getRequest.result || []);
      getRequest.onerror = () => reject(getRequest.error);
    };
  });
}

async function removeStoredRegistration(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('gallaa-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['registrations'], 'readwrite');
      const store = transaction.objectStore('registrations');
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
  });
}