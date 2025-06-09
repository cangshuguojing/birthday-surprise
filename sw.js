// 缓存名称和版本
const CACHE_NAME = 'birthday-surprise-v1';

// 需要缓存的资源列表
const CACHE_URLS = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './manifest.json',
  './images/gift.png'
];

// 安装服务工作线程时，预缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活时清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
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
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果找到了缓存的资源，则返回
        if (response) {
          return response;
        }
        
        // 否则尝试从网络获取
        return fetch(event.request)
          .then(response => {
            // 检查是否是有效的响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 克隆响应，因为响应是一个流，只能使用一次
            const responseToCache = response.clone();
            
            // 将新获取的资源添加到缓存
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
}); 