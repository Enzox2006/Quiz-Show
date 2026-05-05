const CACHE_NAME = "avanti-altro-v11"; // Incrementato per forzare l'aggiornamento
const ASSETS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./src/style.css",
    "./src/domande.js",
    "./src/field.js",
    "./src/players.js",
    "./src/grafica.js",
    "./src/main.js",
    "./src/key.js",
    "./img/quizshow.png",
    "./img/sfera.png",
    "./img/background.png",
    "./img/back.png",
    "./img/cuboblu.png",
    "./img/cubogia.png",
    "./img/cubogrn.png",
    "./img/cuborux.png"
];

// Installazione: mette in cache tutti i file sopra elencati
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // carichiamo i file uno alla volta per evitare che un errore su un file blocchi tutto
            return Promise.all(
                ASSETS.map(url => {
                    return cache.add(url).catch(err => console.warn("Errore caricamento file in cache:", url));
                })
            );
        })
    );
    self.skipWaiting();
});

// Attivazione: elimina le vecchie versioni della cache
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Strategia: Cache-First (Prova la cache, se fallisce vai in rete)
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).catch(() => {
                // Se non c'è rete e non è in cache, restituisce la root
                if (event.request.mode === 'navigate') {
                    return caches.match("./index.html");
                }
            });
        })
    );
});
