importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCA1tSPPLTBpNmHryC_H2TqeU_P-U_w1ow",
    authDomain: "fir-push-notification-81c56.firebaseapp.com",
    projectId: "fir-push-notification-81c56",
    storageBucket: "fir-push-notification-81c56.firebasestorage.app",
    messagingSenderId: "959048959295",
    appId: "1:959048959295:web:ac3c3a53487f8bf14f3f8a",
    //   measurementId: "G-MGTXSQWCBM"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log(' Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icons/icon-512x512.png' // Yahan ek icon image do
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('glamgully-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]);
    })
  );
  console.log("Service Worker Installed");
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});