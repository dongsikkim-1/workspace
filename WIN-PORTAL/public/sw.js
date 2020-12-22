/**
 * Service Worker
 */

const _version = 'vz5';
const cacheName = 'v1';
const cacheList = [];
// const cacheList = [
//   '/',
//   '/manifest.json',
//   '/scripts/app.js',
//   '/styles/index.css',
//   '/images/1.jpg',
//   '/images/2.jpg',
//   '/images/3.jpg',
//   '/images/4.jpg',
//   '/images/5.jpg'
// ];

const log = msg => {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
}

// Life cycle: INSTALL
self.addEventListener('install', event => {
  self.skipWaiting();
  log('INSTALL');
  // caches.open(cacheName).then(cache => {
  //   log('Caching app shell');
  //   return cache.addAll(cacheList);
  // })
});

// Life cycle: ACTIVATE
self.addEventListener('activate', event => {
  log('Activate', event);
  // event.waitUntil(
  //   caches.keys().then(keyList => {
  //     return Promise.all(keyList.map(key => {
  //       if (key !== cacheName) {
  //         log('Removing old cache ' + key);
  //         return caches.delete(key);
  //       }
  //     }));
  //   })
  // );
});

// Functional: FETCH
self.addEventListener('fetch', event => {
  //log('Fetch ' + event.request.url);
  // event.respondWith(
  //   caches.match(event.request).then(response => {
  //     return response || fetch(event.request);
  //   })
  // );
});

// Functional: PUSH
self.addEventListener('push', event => {
  log('Push ' + event.data.text());
  debugger;
//   const title = 'My PWA!';
//   const options = {
//     //body: event.data.text()
// 	body: "Dd"
//   };

// debugger;
// console.log('tttttttttttt');
//   event.waitUntil(self.registration.showNotification(title, options));
});

// TODO: Notification click event
self.addEventListener('notificationclick', function(event) {
  log('Push clicked');

  event.notification.close();
  debugger;
  //debugger;
  //var thisvevent = event;
   event.waitUntil(
      clients.openWindow(event.notification.data.click_action).then(client=> {
      //clients.openWindow('http://localhost:8080/#/food_select?qqq=ttt').then(client=> {
        //const test = {page:'food_select', data:'444'};
        //debugger;
        //console.log('thisevent', thisevent);
        //client.postMessage(test)
     })
   );
});
