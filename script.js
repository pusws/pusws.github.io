// 显示加载动画
document.addEventListener('DOMContentLoaded', function() {
    // 创建加载动画元素
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingElement);
    
    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', function() {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 300);
    });
    
    // 初始化AOS动画库
    AOS.init({
        duration: 1000,
        once: true
    });
    
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
    const contactForm = document.querySelector('#contact form');
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
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: none;
        z-index: 9999;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
    `;
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