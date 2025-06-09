// 缓存名称和版本
const CACHE_NAME = 'birthday-surprise-v1';
const IMAGE_CACHE_NAME = 'birthday-surprise-images-v1';

// 需要缓存的资源列表
const CACHE_URLS = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './manifest.json'
];

// 图片资源列表
const IMAGE_URLS = [
  './images/gift.png'
];

// 安装服务工作线程时，预缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('缓存已打开');
          return cache.addAll(CACHE_URLS);
        }),
      caches.open(IMAGE_CACHE_NAME)
        .then(cache => {
          console.log('图片缓存已打开');
          return cache.addAll(IMAGE_URLS);
        })
    ]).then(() => self.skipWaiting())
  );
});

// 激活时清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, IMAGE_CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 处理资源请求
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // 对图片请求使用特殊的缓存策略
  if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            // 如果有缓存，先返回缓存
            // 同时在后台更新缓存
            const fetchPromise = fetch(event.request)
              .then(networkResponse => {
                caches.open(IMAGE_CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, networkResponse.clone());
                  });
                return networkResponse;
              });
            return response;
          }
          
          // 如果没有缓存，从网络获取
          return fetch(event.request)
            .then(response => {
              const responseClone = response.clone();
              caches.open(IMAGE_CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                });
              return response;
            });
        })
    );
    return;
  }
  
  // 其他资源的处理
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
}); 