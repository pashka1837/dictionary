const staticCache = 'app-v1';
const dynamicCache = 'app-c2';
const assestsUrls = [
  'index.html',
  'manifest.json',
  'sw.js',
  'app/app.js',
  'app/errorHandlers.js ',
  'app/generateHTML.js',
  'app/inputHandlers.js',
  'app/navigate.js',
  'app/popUps.js',
  'app/touchIF.js',
  'app/variable.js',
  'styles/styles.css',
  'assets/images/arrow-up-right-from-square-solid.svg',
  'assets/images/logo32x32.png',
  'assets/images/logo.svg',
  'assets/images/icon-arrow-down.svg',
  'assets/images/icon-moon-dark.svg',
  'assets/images/icon-moon.svg',
  'assets/images/icon-new-window.svg',
  'assets/images/icon-play.svg',
  'assets/images/icon-search.svg',
  'assets/images/xmark-red.svg',
  'assets/images/xmark.svg',
  'assets/fonts/IBMPlexMono/IBMPlexMono-Bold.ttf',
  'assets/fonts/IBMPlexMono/IBMPlexMono-BoldItalic.ttf',
  'assets/fonts/IBMPlexMono/IBMPlexMono-Regular.ttf',
  'assets/fonts/inter/Inter-VariableFont_slnt,wght.ttf',
  'assets/fonts/lora/Lora-VariableFont_wght.ttf',
];
// 'assets/icons/icon-48x48.png',
// 'assets/icons/icon-72x72.png',
// 'assets/icons/icon-96x96.png',
// 'assets/icons/icon-128x128.png',
// 'assets/icons/icon-144x144.png',
// 'assets/icons/icon-152x152.png',
// 'assets/icons/icon-192x192.png',
// 'assets/icons/icon-384x384.png',
// 'assets/icons/icon-512x512.png',

const failedRes = new Response(null, {
  status: 400,
  headers: { 'Content-Type': 'text/plain' },
});

self.addEventListener(`install`, async () => {
  // if (await caches.has(dynamicCache)) await caches.delete(dynamicCache);
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
    console.log(`responded with cahce`, resFromCache);
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
    console.log(`responded with net`, resFromNet);
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
