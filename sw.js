const CACHE_NAME = "avanti-altro-v10";
const ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/src/style.css",
    "/src/domande.js",
    "/src/field.js",
    "/src/players.js",
    "/src/grafica.js",
    "/src/main.js",
    "/src/key.js",
    "/img/quizshow.png",
    "/img/sfera.png",
    "/img/background.png",
    "/img/back.png",
    "/img/cuboblu.png",
    "/img/cubogia.png",
    "/img/cubogrn.png",
    "/img/cuborux.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).catch(() => cached);
        })
    );
});
