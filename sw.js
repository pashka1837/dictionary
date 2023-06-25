const staticCache = 'app-v1';
const dynamicCache = 'app-c2';
const assestsUrls = [
  'index.html',
  'app/app.js',
  'styles/styles.css',
  'assets/images/icon-moon.svg',
  'offline.html',
];

self.addEventListener(`install`, async (e) => {
  console.log(`sw: install`);
  const cache = await caches.open(staticCache);
  await cache.addAll(assestsUrls);
});

self.addEventListener(`activate`, async (e) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== staticCache)
      .filter((name) => name !== dynamicCache)
      .map((name) => caches.delete(name))
  );
  console.log(`sw: activated`);
});

self.addEventListener(`fetch`, async (e) => {
  const { request } = e;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    await e.respondWith(cacheFirst(request));
  } else {
    e.respondWith(netFirst(request));
  }
});

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  return await fetch(req);
}

async function netFirst(req) {
  const cache = await caches.open(dynamicCache);
  try {
    const res = await fetch(req);
    await cache.put(req, res.clone());
    return res;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
