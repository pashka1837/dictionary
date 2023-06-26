const staticCache = 'app-v1';
const dynamicCache = 'app-c2';
const assestsUrls = [
  '/',
  'index.html',
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
  'assets/images/favicon-32x32.png',
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
  try {
    const resFromNet = await fetch(req);
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
