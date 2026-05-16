// ========== 割草机配置区域 ==========
// 位置X：调整数值可以左右移动割草机 (0=最左边, 540=居中, 1080=最右边)
var mowerX = 700;
// 位置Y：调整数值可以上下移动割草机 (0=最顶部, 960=居中, 1920=最底部)
var mowerY = 1400;
// 缩放比例：调整数值可以改变割草机大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var mowerScale = 0.25;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var mowerClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var mowerAnimDuration = 100;
// ==================================

// ========== 兑换配置 ==========
// 兑换所需肥料数量
var mowerCost = 50;
// ==================================

function showMowerToast(message) {
    var toast = document.getElementById('mower-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 1500);
}

function openMowerModal() {
    var modal = document.getElementById('mower-modal');
    var fertCountEl = document.getElementById('mower-fertilizer-count');
    var buyBtn = document.getElementById('mower-buy');

    if (!modal) return;

    if (GameData.isMowerUnlocked()) {
        showMowerToast('你已经拥有割草机了');
        return;
    }

    loadFertilizerCounter();
    if (fertCountEl) {
        fertCountEl.textContent = fertilizerCounter;
    }

    if (fertilizerCounter < mowerCost) {
        if (buyBtn) {
            buyBtn.disabled = true;
            buyBtn.textContent = '肥料不足';
        }
    } else {
        if (buyBtn) {
            buyBtn.disabled = false;
            buyBtn.textContent = '兑换割草机';
        }
    }

    modal.classList.add('show');
    var canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.pointerEvents = 'none';
    }
}

function closeMowerModal() {
    var modal = document.getElementById('mower-modal');
    if (modal) {
        modal.classList.remove('show');
        var canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'auto';
        }
    }
}

function doMowerExchange() {
    loadFertilizerCounter();

    if (fertilizerCounter < mowerCost) {
        showMowerToast('肥料不足，需要20袋肥料！');
        return;
    }

    fertilizerCounter -= mowerCost;
    saveFertilizerCounter();
    updateFertilizerDisplay();

    GameData.unlockMower();

    closeMowerModal();
    showMowerToast('兑换成功！获得1台割草机');
}

function blockEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}

function initMowerSystem() {
    var modal = document.getElementById('mower-modal');
    var closeBtn = document.getElementById('mower-close');
    var buyBtn = document.getElementById('mower-buy');

    if (closeBtn) {
        closeBtn.addEventListener('pointerdown', function(e) {
            blockEvent(e);
            closeMowerModal();
        });
        closeBtn.addEventListener('click', blockEvent);
    }

    if (modal) {
        modal.addEventListener('pointerdown', function(e) {
            if (e.target === modal) {
                closeMowerModal();
            }
            blockEvent(e);
        });
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeMowerModal();
            }
            blockEvent(e);
        });

        var content = modal.querySelector('.mower-content');
        if (content) {
            content.addEventListener('pointerdown', blockEvent);
            content.addEventListener('click', blockEvent);
        }
    }

    if (buyBtn) {
        buyBtn.addEventListener('pointerdown', function(e) {
            blockEvent(e);
            doMowerExchange();
        });
        buyBtn.addEventListener('click', function(e) {
            blockEvent(e);
            doMowerExchange();
        });
    }
}

function createMower(scene) {
    var mower = scene.add.image(mowerX, mowerY, 'mower');
    mower.setScale(mowerScale);
    mower.setInteractive();

    var isAnimating = false;
    mower.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: mower,
            scaleX: mowerScale * mowerClickScale,
            scaleY: mowerScale * mowerClickScale,
            duration: mowerAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                openMowerModal();
            }
        });
    });
}

window.addEventListener('load', function() {
    initMowerSystem();
});
