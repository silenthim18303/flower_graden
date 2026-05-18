// ========== 页面过渡动画 ==========
var Transition = {
    progress: 0,
    progressInterval: null,

    init: function() {
        this.createTransitionLayer();
        this.overrideLinks();
        this.simulateProgress();
    },

    createTransitionLayer: function() {
        // 创建过渡层
        const transitionLayer = document.createElement('div');
        transitionLayer.id = 'transition-layer';
        transitionLayer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;

        // 添加自定义加载动画
        const loadingImage = document.createElement('img');
        loadingImage.src = 'img/加载动画.gif';
        loadingImage.alt = '加载中...';
        loadingImage.style.cssText = `
            width: 120px;
            height: 120px;
            margin-bottom: 30px;
            animation: pulse 2s ease-in-out infinite;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.1);
            padding: 10px;
        `;

        // 添加进度条容器
        const progressContainer = document.createElement('div');
        progressContainer.style.cssText = `
            width: 200px;
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        `;

        // 添加进度条
        const progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.style.cssText = `
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #4CAF50, #8BC34A);
            border-radius: 4px;
            transition: width 0.2s ease;
            box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        `;

        // 添加进度文本
        const progressText = document.createElement('div');
        progressText.id = 'progress-text';
        progressText.style.cssText = `
            color: white;
            font-size: 14px;
            font-weight: bold;
            margin-top: 5px;
        `;
        progressText.textContent = '0%';

        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;

        document.head.appendChild(style);
        progressContainer.appendChild(progressBar);
        transitionLayer.appendChild(loadingImage);
        transitionLayer.appendChild(progressContainer);
        transitionLayer.appendChild(progressText);
        document.body.appendChild(transitionLayer);
    },

    overrideLinks: function() {
        // 覆盖所有链接的点击事件
        const links = document.querySelectorAll('a, .nav-btn, .toolbar-item');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href') || link.dataset.href;
                if (href && href !== '#' && !href.startsWith('javascript:')) {
                    e.preventDefault();
                    this.navigate(href);
                }
            });
        });
    },

    simulateProgress: function() {
        // 模拟进度增加
        this.progressInterval = setInterval(() => {
            if (this.progress < 80) {
                this.progress += Math.random() * 10;
                if (this.progress > 80) this.progress = 80;
                this.updateProgress();
            }
        }, 200);
    },

    updateProgress: function() {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        if (progressBar && progressText) {
            progressBar.style.width = this.progress + '%';
            progressText.textContent = Math.round(this.progress) + '%';
        }
    },

    completeProgress: function() {
        // 完成进度
        clearInterval(this.progressInterval);
        this.progress = 100;
        this.updateProgress();
    },

    resetProgress: function() {
        // 重置进度
        clearInterval(this.progressInterval);
        this.progress = 0;
        this.updateProgress();
        this.simulateProgress();
    },

    navigate: function(url) {
        // 显示过渡动画
        const transitionLayer = document.getElementById('transition-layer');
        transitionLayer.style.opacity = '1';
        transitionLayer.style.pointerEvents = 'auto';

        // 重置进度
        this.resetProgress();

        // 模拟加载进度
        setTimeout(() => {
            this.completeProgress();
        }, 500);

        // 延迟跳转，让动画有时间显示
        setTimeout(() => {
            window.location.href = url;
        }, 800);
    },

    // 页面加载完成后隐藏过渡层
    onPageLoad: function() {
        const transitionLayer = document.getElementById('transition-layer');
        if (transitionLayer) {
            transitionLayer.style.opacity = '0';
            transitionLayer.style.pointerEvents = 'none';
            this.resetProgress();
        }
    }
};

// 页面加载完成后初始化
window.addEventListener('load', function() {
    Transition.init();
    Transition.onPageLoad();
});
