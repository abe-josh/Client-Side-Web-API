self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('video-store').then(function(cache) {
            return cache.addAll([
                './',
                'index.html',
                'css/style.css',
                'js/script.js',
            ]);
        })
    );
});

self.addEventListener('fetch', e => {
    console.log(e.request.url);

    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});