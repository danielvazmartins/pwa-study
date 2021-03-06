let cacheName = 'pwa-home-screen-v.1.0.8';
let filesToCache = [
    './',
    './index.html',
    './js/main.js'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Installer');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {            
            console.log('[ServiceWorker] Caching app shell');
            cache.addAll(filesToCache).then(function() {
                // Ativa um novo service worker sem precisar do "Update on Reload"
                return self.skipWaiting();
              }).catch(function(error) {
                // Se nao encontrar algum arquivo do pre cache entao da erro
                console.log('[ServiceWorker] Error to init cache', error);
              });
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});