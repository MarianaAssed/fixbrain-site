/* FixBrain: cache simples das páginas do próprio site.
   Rede primeiro; o cache só entra quando não há conexão.
   Chamadas ao banco de dados nunca passam por aqui. */
const CACHE = 'fixbrain-v6';
const SHELL = ['./', 'orbita/', 'termos.html', 'privacidade.html', 'nebula/', 'nebula/core.js', 'nebula/content.js', 'nebula/sons/mar.mp3', 'nebula/sons/passaros.mp3', 'nebula/sons/serena.mp3', 'nebula/sons/chuva.mp3', 'nebula/sons/inspirar.wav', 'nebula/sons/expirar.wav', 'manifest.webmanifest', 'icons/icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
