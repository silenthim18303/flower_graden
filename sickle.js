// ========== 镰刀配置区域 ==========
// 位置X：调整数值可以左右移动镰刀 (0=最左边, 540=居中, 1080=最右边)
var sickleX = 400;
// 位置Y：调整数值可以上下移动镰刀 (0=最顶部, 960=居中, 1920=最底部)
var sickleY = 700;
// 缩放比例：调整数值可以改变镰刀大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var sickleScale = 0.1;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var sickleClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var sickleAnimDuration = 100;
// ==================================

// ========== 兑换配置 ==========
// 兑换所需肥料数量
var sickleCost = 10;
// ==================================

function showSickleToast(message) {
    var toast = document.getElementById('sickle-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 1500);
}

function openSickleModal() {
    var modal = document.getElementById('sickle-modal');
    var fertCountEl = document.getElementById('sickle-fertilizer-count');
    var buyBtn = document.getElementById('sickle-buy');

    if (!modal) return;

    if (isSickleUnlocked()) {
        showSickleToast('你已经拥有镰刀了');
        return;
    }

    loadFertilizerCounter();
    if (fertCountEl) {
        fertCountEl.textContent = fertilizerCounter;
    }

    if (fertilizerCounter < sickleCost) {
        if (buyBtn) {
            buyBtn.disabled = true;
            buyBtn.textContent = '肥料不足';
        }
    } else {
        if (buyBtn) {
            buyBtn.disabled = false;
            buyBtn.textContent = '兑换镰刀';
        }
    }

    modal.classList.add('show');
    var canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.pointerEvents = 'none';
    }
}

function closeSickleModal() {
    var modal = document.getElementById('sickle-modal');
    if (modal) {
        modal.classList.remove('show');
        var canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'auto';
        }
    }
}

function doSickleExchange() {
    loadFertilizerCounter();

    if (fertilizerCounter < sickleCost) {
        showSickleToast('肥料不足，需要10袋肥料！');
        return;
    }

    fertilizerCounter -= sickleCost;
    saveFertilizerCounter();
    updateFertilizerDisplay();

    unlockSickle();

    closeSickleModal();
    showSickleToast('兑换成功！获得1把镰刀');
}

function initSickleSystem() {
    var modal = document.getElementById('sickle-modal');
    var closeBtn = document.getElementById('sickle-close');
    var buyBtn = document.getElementById('sickle-buy');

    if (closeBtn) {
        closeBtn.addEventListener('pointerdown', function(e) {
            e.stopPropagation();
            closeSickleModal();
        });
    }

    if (modal) {
        modal.addEventListener('pointerdown', function(e) {
            if (e.target === modal) {
                closeSickleModal();
            }
            e.stopPropagation();
        });

        var content = modal.querySelector('.sickle-content');
        if (content) {
            content.addEventListener('pointerdown', function(e) {
                e.stopPropagation();
            });
        }
    }

    if (buyBtn) {
        buyBtn.addEventListener('pointerdown', function(e) {
            e.stopPropagation();
            doSickleExchange();
        });
    }
}

function createSickle(scene) {
    var sickle = scene.add.image(sickleX, sickleY, 'sickle');
    sickle.setScale(sickleScale);
    sickle.setInteractive();

    var isAnimating = false;
    sickle.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: sickle,
            scaleX: sickleScale * sickleClickScale,
            scaleY: sickleScale * sickleClickScale,
            duration: sickleAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                openSickleModal();
            }
        });
    });
}

window.addEventListener('load', function() {
    initSickleSystem();
});
