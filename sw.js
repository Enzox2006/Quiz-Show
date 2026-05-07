const CACHE_NAME = "avanti-altro-v22"; // Cambia versione per forzare l'aggiornamento
const ASSETS = [
    "./",
    "index.html",
    "manifest.json",
    "src/style.css",
    "src/domande.js",
    "src/domande_cruciverba.js",
    "src/field.js",
    "src/players.js",
    "src/grafica.js",
    "src/main.js",
    "src/cruciverba.js",
    "src/key.js",
    "img/quizshow.png",
    "img/sfera.png",
    "img/background.png",
    "img/back.png",
    "img/cuboblu.png",
    "img/cubogia.png",
    "img/cubogrn.png",
    "img/cuborux.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // addAll fallisce se anche un solo file restituisce 404
                return cache.addAll(ASSETS);
            })
            .catch(err => console.error("Errore cache.addAll: assicurati che tutti i percorsi siano corretti!", err))
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
    if (event.request.method !== "GET") return;
    
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Strategia: Cache First, poi Network (ottimale per gioco offline)
            if (cachedResponse) return cachedResponse;

            return fetch(event.request).then(response => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            });
        })
    );
});
