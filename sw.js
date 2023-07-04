import { sources } from './souces.js';

const staticCache = 'app-v1';
const dynamicCache = 'app-c2';
const assestsUrls = [...sources];

const failedRes = new Response(null, {
  status: 400,
  headers: { 'Content-Type': 'text/plain' },
});

self.addEventListener(`install`, async () => {
  console.log(`sw: install`);
  const cache = await caches.open(staticCache);
  await cache.addAll(assestsUrls);
});

self.addEventListener(`activate`, async () => {
  console.log(await navigator.storage.estimate());
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
    // console.log(`responded with cahce`, resFromCache);
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
    // console.log(`responded with net`, resFromNet);
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
