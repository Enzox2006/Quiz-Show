const CACHE_NAME = "avanti-altro-v3";
const ASSETS = [
    "/Quiz-Show/",
    "/Quiz-Show/index.html",
    "/Quiz-Show/manifest.json",
    "/Quiz-Show/src/style.css",
    "/Quiz-Show/src/domande.js",
    "/Quiz-Show/src/field.js",
    "/Quiz-Show/src/players.js",
    "/Quiz-Show/src/grafica.js",
    "/Quiz-Show/src/main.js",
    "/Quiz-Show/src/key.js",
    "/Quiz-Show/img/quizshow.png",
    "/Quiz-Show/img/sfera.png",
    "/Quiz-Show/img/background.png",
    "/Quiz-Show/img/back.png",
    "/Quiz-Show/img/cuboblu.png",
    "/Quiz-Show/img/cubogia.png",
    "/Quiz-Show/img/cubogrn.png",
    "/Quiz-Show/img/cuborux.png"
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
