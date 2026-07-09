const CACHE_NAME = "copygoat-portfolio-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./images/bg.png",
  "./images/icon-192.png",
  "./images/icon-512.png"
];

// Installation : on met les fichiers essentiels en cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activation : on nettoie les anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Récupération : on sert le cache si dispo, sinon on va chercher sur le réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});