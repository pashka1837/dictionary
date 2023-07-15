import { sources } from './app/soucesForSW.js';

const staticCache = 'app-static';
const dynamicCache = 'app-dynamic';
const assestsUrls = [...sources];

const failedRes = new Response(null, {
  status: 400,
  headers: { 'Content-Type': 'text/plain' },
});

self.addEventListener(`install`, async () => {
  // console.log(`sw: install`);
  const cache = await caches.open(staticCache);
  await cache.addAll(assestsUrls);
});

self.addEventListener(`activate`, async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== staticCache)
      .filter((name) => name !== dynamicCache)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener(`fetch`, async (e) => {
  const { request } = e;
  await e.respondWith(cacheFirst(request));
});

async function cacheFirst(req) {
  const resFromCache = await caches.match(req);
  if (resFromCache) {
    return resFromCache;
  }
  return await netFirst(req);
}

async function netFirst(req) {
  const url = new URL(req.url);
  try {
    const resFromNet = await fetch(req);
    if (url.origin !== location.origin)
      await putInCache(req, resFromNet, dynamicCache);
    return resFromNet;
  } catch {
    const resFromCached = await caches.match(req);
    if (resFromCached) return resFromCached;
    return failedRes;
  }
}

async function putInCache(req, res, typeOfCache) {
  const cache = await caches.open(typeOfCache);
  await cache.put(req, res.clone());
}
