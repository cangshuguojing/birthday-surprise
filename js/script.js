// 注册Service Worker以支持离线功能
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('ServiceWorker 注册成功: ', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker 注册失败: ', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // 角色动画效果
    const characterImg = document.getElementById('characterImg');
    if (characterImg) {
        // 图片加载完成时的处理
        characterImg.onload = function() {
            characterImg.classList.add('loaded');
        };
        
        // 如果图片已经缓存，直接触发loaded
        if (characterImg.complete) {
            characterImg.classList.add('loaded');
        }
    }
    
    // 创建粉色小爱心
    function createHearts() {
        const heartsContainer = document.querySelector('.hearts');
        
        // 预定义的粉色系列
        const pinkColors = [
            '#ffb6c1', // 浅粉红
            '#ff69b4', // 热情的粉红
            '#ffc0cb', // 粉红
            '#ffb7ce', // 浅玫瑰
            '#ff91a4'  // 鲜粉红
        ];
        
        // 创建更多小爱心
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤';
                heart.className = 'heart';
                
                // 随机选择一个粉色
                const randomPink = pinkColors[Math.floor(Math.random() * pinkColors.length)];
                
                // 设置更小的爱心尺寸和粉色系列颜色
                heart.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 6 + 6}px;
                    color: ${randomPink};
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float-heart ${Math.random() * 4 + 2}s linear infinite;
                    z-index: 5;
                    pointer-events: none;
                    opacity: 0;
                    text-shadow: 0 0 2px #fff;
                `;
                
                heartsContainer.appendChild(heart);
                
                // 添加动画关键帧
                const style = document.createElement('style');
                
                style.textContent = `
                    @keyframes float-heart {
                        0% {
                            transform: translate(0, 0) rotate(0deg);
                            opacity: 0;
                        }
                        10% {
                            opacity: 0.8;
                        }
                        80% {
                            opacity: 0.8;
                        }
                        100% {
                            transform: translate(${Math.random() * 30 - 15}px, -${Math.random() * 60 + 30}px) rotate(${Math.random() * 60 - 30}deg);
                            opacity: 0;
                        }
                    }
                `;
                
                document.head.appendChild(style);
                
                // 循环动画，更快的循环
                setInterval(() => {
                    heart.style.animation = 'none';
                    heart.offsetHeight; // 触发重绘
                    heart.style.left = `${Math.random() * 100}%`;
                    heart.style.top = `${Math.random() * 100}%`;
                    heart.style.animation = `float-heart ${Math.random() * 4 + 2}s linear`;
                }, (Math.random() * 2000) + 1000);
                
            }, i * 200);
        }
    }
    
    // 创建心形动画
    createHearts();
    
    // 礼物图片加载处理
    const giftImg = document.getElementById('giftImg');
    const giftImageContainer = giftImg.parentElement;
    
    if (giftImg) {
        // 图片加载完成时的处理
        giftImg.onload = function() {
            giftImg.classList.add('loaded');
            giftImageContainer.classList.add('loaded');
        };
        
        // 如果图片已经缓存，直接触发loaded
        if (giftImg.complete) {
            giftImg.classList.add('loaded');
            giftImageContainer.classList.add('loaded');
        }
        
        giftImg.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        giftImg.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // 点击查看更多按钮
    const revealBtn = document.getElementById('revealBtn');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');
    
    if (revealBtn && overlay && closeBtn) {
        revealBtn.addEventListener('click', function() {
            overlay.classList.remove('hidden');
            overlay.classList.add('visible');
        });
        
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('visible');
            overlay.classList.add('hidden');
        });
    }
    
    // 适配移动端触摸事件
    document.addEventListener('touchstart', function() {
        // 只是为了启动触摸事件，使hover效果在移动设备上更好工作
    });
}); 