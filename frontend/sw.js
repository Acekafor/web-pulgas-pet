const CACHE_NAME = "pulgas-pet-v2";
const RECURSOS_STATICOS = [
  "/",
  "/index.html",
  "/catalogo.html",
  "/contacto.html",
  "/nosotros.html",
  "/orden.html",
  "/assets/css/base.css",
  "/assets/css/layout.css",
  "/assets/css/componentes.css",
  "/assets/css/paginas.css",
  "/assets/js/main.js",
  "/assets/js/config.js",
  "/assets/js/catalogo.js",
  "/assets/js/orden.js",
  "/assets/js/utils.js",
  "/assets/js/whatsapp.js",
  "/assets/js/imagenes.js",
  "/assets/js/horario.js",
  "/data/productos-respaldo.js"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(RECURSOS_STATICOS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((claves) => {
      return Promise.all(
        claves.map((clave) => {
          if (clave !== CACHE_NAME) {
            return caches.delete(clave);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
  // Estrategia: Buscar en red primero, si falla usar cache offline
  evento.respondWith(
    fetch(evento.request).catch(() => {
      return caches.match(evento.request);
    })
  );
});
