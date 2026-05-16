// ========== 花箱配置区域 ==========
// 位置X：调整数值可以左右移动花箱 (0=最左边, 540=居中, 1080=最右边)
var flowerboxX = 850;
// 位置Y：调整数值可以上下移动花箱 (0=最顶部, 960=居中, 1920=最底部)
var flowerboxY = 1550;
// 缩放比例：调整数值可以改变花箱大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var flowerboxScale = 0.2;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var flowerboxClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var flowerboxAnimDuration = 100;
// ==================================

// ========== 花卉图片映射 ==========
var flowerImageMap = {
    'orchid': 'img/plants/蝴蝶兰.png',
    'chrysanthemum': 'img/plants/菊花.png'
};

function openFlowerboxModal() {
    var modal = document.getElementById('flowerbox-modal');
    var list = document.getElementById('flowerbox-list');

    if (!modal || !list) return;

    var collection = GameData.getFlowerCollection();
    var keys = Object.keys(collection);

    list.innerHTML = '';

    if (keys.length === 0) {
        var emptyDiv = document.createElement('div');
        emptyDiv.className = 'flowerbox-empty';
        emptyDiv.textContent = '还没有收集到花哦~';
        emptyDiv.addEventListener('pointerdown', function(e) {
            e.stopPropagation();
        });
        list.appendChild(emptyDiv);
    } else {
        keys.forEach(function(key) {
            var flower = collection[key];
            var item = document.createElement('div');
            item.className = 'flowerbox-item';
            var imgSrc = flowerImageMap[key] || 'img/plants/星月相随.png';
            item.innerHTML = '<img class="flowerbox-item-img" src="' + imgSrc + '" alt="' + flower.name + '"><span class="flowerbox-item-name">' + flower.name + '</span><span class="flowerbox-item-count">x' + flower.count + '</span>';
            item.addEventListener('pointerdown', function(e) {
                e.stopPropagation();
            });
            list.appendChild(item);
        });
    }

    modal.classList.add('show');
    var canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.pointerEvents = 'none';
    }
}

function closeFlowerboxModal() {
    var modal = document.getElementById('flowerbox-modal');
    if (modal) {
        modal.classList.remove('show');
        var canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'auto';
        }
    }
}

function initFlowerboxSystem() {
    var modal = document.getElementById('flowerbox-modal');
    var closeBtn = document.getElementById('flowerbox-close');

    if (closeBtn) {
        closeBtn.addEventListener('pointerdown', function(e) {
            e.stopPropagation();
            closeFlowerboxModal();
        });
    }

    if (modal) {
        modal.addEventListener('pointerdown', function(e) {
            if (e.target === modal) {
                closeFlowerboxModal();
            }
            e.stopPropagation();
        });

        var content = modal.querySelector('.flowerbox-content');
        if (content) {
            content.addEventListener('pointerdown', function(e) {
                e.stopPropagation();
            });
        }
    }
}

function createFlowerbox(scene) {
    var flowerbox = scene.add.image(flowerboxX, flowerboxY, 'flowerbox');
    flowerbox.setScale(flowerboxScale);
    flowerbox.setInteractive();

    var isAnimating = false;
    flowerbox.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: flowerbox,
            scaleX: flowerboxScale * flowerboxClickScale,
            scaleY: flowerboxScale * flowerboxClickScale,
            duration: flowerboxAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                openFlowerboxModal();
            }
        });
    });
}

window.addEventListener('load', function() {
    initFlowerboxSystem();
});
