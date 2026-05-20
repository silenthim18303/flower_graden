// PageTransition - 页面过渡效果
window.PageTransition = {
    isAnimating: false,

    // 初始化过渡效果
    init: function() {
        console.log('PageTransition initialized');
    },

    // 淡出效果
    fadeOut: function(callback) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(overlay);

        // 触发重排
        overlay.offsetWidth;
        overlay.style.opacity = '1';

        setTimeout(() => {
            if (callback) callback();
            this.isAnimating = false;
        }, 300);
    },

    // 淡入效果
    fadeIn: function() {
        // 简单实现，与淡出配对
    }
};
