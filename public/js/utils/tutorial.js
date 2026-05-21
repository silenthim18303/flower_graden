// ========== 新手教程系统 ==========

var Tutorial = {
    // 是否已看过教程的键名
    KEY: 'tutorialCompleted',
    
    // 当前页数
    currentPage: 0,
    
    // 教程总页数
    totalPages: 5,
    
    // 检查是否需要显示教程
    shouldShow: function() {
        return localStorage.getItem(this.KEY) !== 'true';
    },
    
    // 标记教程已完成
    markCompleted: function() {
        localStorage.setItem(this.KEY, 'true');
    },

    // 重置教程状态
    reset: function() {
        localStorage.removeItem(this.KEY);
    },

    // 重新开始教程
    replay: function() {
        this.reset();
        this.currentPage = 0;
        this.show();
    },
    
    // 显示教程
    show: function() {
        var overlay = document.getElementById('tutorial-overlay');
        if (!overlay) return;
        
        overlay.style.display = 'flex';
        this.currentPage = 0;
        this.updatePage();
    },
    
    // 隐藏教程
    hide: function() {
        var overlay = document.getElementById('tutorial-overlay');
        if (!overlay) return;
        
        overlay.style.display = 'none';
        this.markCompleted();
    },
    
    // 更新当前页
    updatePage: function() {
        var page = this.currentPage + 1;
        var pageIndicator = document.getElementById('tutorial-page-indicator');
        var prevBtn = document.getElementById('tutorial-prev');
        var nextBtn = document.getElementById('tutorial-next');
        var tutorialImg = document.getElementById('tutorial-img');
        var tutorialTitle = document.getElementById('tutorial-title');
        var tutorialDesc = document.getElementById('tutorial-desc');
        
        if (pageIndicator) {
            pageIndicator.textContent = page + ' / ' + this.totalPages;
        }
        
        // 上一页按钮
        if (prevBtn) {
            prevBtn.style.display = this.currentPage === 0 ? 'none' : 'block';
        }
        
        // 下一页/完成按钮
        if (nextBtn) {
            if (this.currentPage === this.totalPages - 1) {
                nextBtn.textContent = '开始玩';
            } else {
                nextBtn.textContent = '下一页';
            }
        }
        
        // 更新教程内容
        this.updateTutorialContent(tutorialImg, tutorialTitle, tutorialDesc);
    },
    
    // 更新教程内容
    updateTutorialContent: function(imgEl, titleEl, descEl) {
        var contents = [
            {
                img: '', // 你可以在这里添加图片路径
                title: '欢迎来到花园！',
                desc: '这是一个温馨的花园小游戏，让我们一起开始吧！'
            },
            {
                img: '',
                title: '收集杂草',
                desc: '点击花园中的杂草来收集它们，这是获得资源的第一步！'
            },
            {
                img: '',
                title: '使用工具栏',
                desc: '底部工具栏有各种工具：镰刀可以快速除草，施肥能种菊花，种子可以种更多花！'
            },
            {
                img: '',
                title: '收集资源',
                desc: '通过收集杂草和种植花卉，你可以获得种子、肥料和货币，解锁更多功能！'
            },
            {
                img: '',
                title: '开始种花吧！',
                desc: '现在你已经了解了基本操作，让我们开始打造属于自己的美丽花园吧！'
            }
        ];
        
        var content = contents[this.currentPage];
        
        if (imgEl && content.img) {
            imgEl.src = content.img;
            imgEl.style.display = 'block';
        } else if (imgEl) {
            imgEl.style.display = 'none';
        }
        
        if (titleEl) {
            titleEl.textContent = content.title;
        }
        
        if (descEl) {
            descEl.textContent = content.desc;
        }
    },
    
    // 下一页
    nextPage: function() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.updatePage();
        } else {
            this.hide();
        }
    },
    
    // 上一页
    prevPage: function() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updatePage();
        }
    },
    
    // 初始化
    init: function() {
        var self = this;
        
        // 绑定教程内部按钮事件
        var nextBtn = document.getElementById('tutorial-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                self.nextPage();
            });
        }
        
        var prevBtn = document.getElementById('tutorial-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                self.prevPage();
            });
        }
        
        // 绑定重玩按钮事件
        var replayBtn = document.getElementById('replay-tutorial-btn');
        if (replayBtn) {
            replayBtn.addEventListener('click', function() {
                self.replay();
            });
        }
        
        // 检查是否需要显示教程
        if (this.shouldShow()) {
            // 延迟显示，确保页面加载完成
            setTimeout(function() {
                self.show();
            }, 500);
        }
    }
};
