const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./css/style.css",
    "./components/Contador.js"
];

const CACHE_NAME = "v1_cache_contador_react";

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
                self.skipWaiting();
            }).catch(error =>{
                console.log(error);
            })
        })
    );
});

self.addEventListener("activate", (e) => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map((cacheName) => {
                return cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }));
        }).then(() => self.clients.claim()).catch(console.log)
    );
});

    self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((resp) => {
            if(resp){
                return resp;
            }

            return fetch(e.request);
        })
    );
});