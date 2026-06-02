const CACHE_NAME = "avanti-altro-v45";
const ASSETS = [
    "./",
    "index.html",
    "manifest.json",
    "src/style.css",
    "src/domande.js",
    "src/domande_cruciverba.js",
    "src/domande_intesa.js",
    "src/domande_ruota.js",
    "src/field.js",
    "src/players.js",
    "src/grafica.js",
    "src/main.js",
    "src/cruciverba.js",
    "src/intesa.js",
    "src/ruota.js",
    "src/ruota-online.js",
    "src/key.js",
    "img/quizshow.png",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
            .catch((err) => console.error("Errore cache.addAll:", err)),
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((k) => k !== CACHE_NAME)
                        .map((k) => caches.delete(k)),
                ),
            ),
    );
    self.clients.claim();
});

// Strategia: Network First — sempre aggiornato quando online, cache come fallback offline
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (
                    response &&
                    response.status === 200 &&
                    response.type === "basic"
                ) {
                    const clone = response.clone();
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => cache.put(event.request, clone));
                }
                return response;
            })
            .catch(() => caches.match(event.request)),
    );
});
