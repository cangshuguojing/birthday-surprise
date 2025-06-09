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
    // 礼物到达日期 - 设置为3天后
    const arrivalDate = new Date();
    arrivalDate.setDate(arrivalDate.getDate() + 3);
    
    // 倒计时更新
    function updateCountdown() {
        const now = new Date();
        const diff = arrivalDate - now;
        
        // 如果已经到达，显示到达信息
        if (diff <= 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            
            const countdownP = document.querySelector('.countdown p');
            if (countdownP) {
                countdownP.textContent = '礼物已经在路上啦！随时会到～';
            }
            return;
        }
        
        // 计算剩余天数、小时、分钟、秒数
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // 更新显示
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    // 立即更新一次倒计时
    updateCountdown();
    
    // 每秒更新一次倒计时
    setInterval(updateCountdown, 1000);
    
    // 创建随机漂浮的心形
    function createHearts() {
        const heartsContainer = document.querySelector('.hearts');
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤';
                heart.className = 'heart';
                heart.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 10 + 10}px;
                    color: rgba(255, ${Math.random() * 50 + 100}, ${Math.random() * 50 + 150}, ${Math.random() * 0.6 + 0.4});
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float-heart ${Math.random() * 5 + 3}s linear infinite;
                    z-index: 5;
                    pointer-events: none;
                    opacity: 0;
                `;
                
                heartsContainer.appendChild(heart);
                
                // 添加动画关键帧
                const style = document.createElement('style');
                const animationName = `float-heart-${i}`;
                
                const startX = Math.random() * 100;
                const endX = startX + (Math.random() * 40 - 20);
                
                style.textContent = `
                    @keyframes float-heart {
                        0% {
                            transform: translate(0, 0) rotate(0deg);
                            opacity: 0;
                        }
                        10% {
                            opacity: 1;
                        }
                        90% {
                            opacity: 1;
                        }
                        100% {
                            transform: translate(${Math.random() * 40 - 20}px, -${Math.random() * 100 + 50}px) rotate(${Math.random() * 90 - 45}deg);
                            opacity: 0;
                        }
                    }
                `;
                
                document.head.appendChild(style);
                
                // 循环动画
                setInterval(() => {
                    heart.style.animation = 'none';
                    heart.offsetHeight; // 触发重绘
                    heart.style.left = `${Math.random() * 100}%`;
                    heart.style.top = `${Math.random() * 100}%`;
                    heart.style.animation = `float-heart ${Math.random() * 5 + 3}s linear`;
                }, (Math.random() * 3000) + 2000);
                
            }, i * 300);
        }
    }
    
    // 创建心形动画
    createHearts();
    
    // 礼物图片悬浮效果
    const giftImg = document.getElementById('giftImg');
    if (giftImg) {
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