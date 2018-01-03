/*global self: true, caches: true */
'use strict';

// Do not update the version manually, it is handled by the gulp task
const app = {
  name: 'govuk',
  version: '0.1.0'
};
const currentCache = `${app.name}_${app.version}`;

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if(url.pathname.endsWith('html')) {
    caches.open(currentCache)
      .then(cache => cache.add(url));
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/offline-true');
        }
      })
  );
});

self.addEventListener('install', event => {
  // This tells the service worker to install itself if there's a new instance
  // It basically prevent the assets being cached out of sync on first page load
  self.skipWaiting();

  event.waitUntil(
    caches.open(currentCache)
      .then(cache => cache.addAll([
        '/public/stylesheets/govuk-template.css',
        '/public/stylesheets/govuk-template-print.css',
        '/public/stylesheets/fonts.css',
        '/public/stylesheets/application.css',
        '/public/javascripts/govuk-template.js',
        '/public/images/gov.uk_logotype_crown_invert_trans.png',
        '/offline-true',
      ]))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (currentCache !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
