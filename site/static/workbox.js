importScripts("assets/workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "assets/workbox-v4.3.1"});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.NetworkFirst({
    cacheName: "static-cache",
  })
);

workbox.routing.registerRoute(
  /\.css$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-cache",
  })
);
workbox.routing.registerRoute(
  /.*cloudfront\.net/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "cloudfront-cache",
  }),
);

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg)$/, 
  new workbox.strategies.CacheFirst({
    "cacheName": "static-cache",
    plugins: [new workbox.expiration.Plugin({
      maxEntries: 30,
      purgeOnQuotaError: true,
      maxAgeSeconds: 7 * 24 * 60 * 60,
    })]
  }), "GET");


const offlinePage = "/offline/index.html";

workbox.routing.registerRoute(/\/posts.|\/feed.|./,
  async({event}) => {
    try {
      return await workbox.strategies.staleWhileRevalidate({
        cacheName: "content-cache"
      }).handle({event});
    } catch (error) {
      return caches.match(offlinePage);
    }
  }
);

self.addEventListener("fetch", (event) => {
  if (event.request.url === "/") {
    const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate();
    event.respondWith(staleWhileRevalidate.handle({event}));
  }
});


const queue = new workbox.backgroundSync.Queue("Sync");

self.addEventListener("fetch", (event) => {
  // Clone the request to ensure it's safe to read when
  // adding to the Queue.
  const promiseChain = fetch(event.request.clone())
    .catch((err) => {
      return queue.pushRequest({request: event.request});
    });

  event.waitUntil(promiseChain);
});
