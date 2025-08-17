// 显示加载动画
document.addEventListener('DOMContentLoaded', function() {
    // 创建加载动画元素
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingElement);
    
    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', function() {
        hideLoadingAnimation(loadingElement);
    });
    
    // 添加一个延迟隐藏加载动画的保障机制
    setTimeout(() => {
        hideLoadingAnimation(loadingElement);
    }, 3000);
    
    // 隐藏加载动画的函数
    function hideLoadingAnimation(element) {
        if (element && element.style) {
            element.style.opacity = '0';
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 300);
        }
    }
    
    // 初始化AOS动画库（添加错误处理）
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            // 添加降级选项，确保即使AOS未正确加载，元素也能显示
            disable: function() {
                // 如果屏幕阅读器正在使用，则禁用AOS
                return navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/) &&
                       window.innerWidth < 768;
            }
        });
    } else {
        // 如果AOS未正确加载，移除所有data-aos属性以确保元素可见
        console.warn('AOS library not loaded. Removing data-aos attributes to ensure content visibility.');
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 简单验证
            if (name && email && message) {
                // 在实际应用中，这里会发送数据到服务器
                alert('感谢您的消息！我会尽快回复您。');
                contactForm.reset();
            } else {
                alert('请填写所有必填字段。');
            }
        });
    }
    
    // 添加视差效果到横幅
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
        }
    });
    
    // 返回顶部按钮
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'btn btn-primary back-to-top';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});