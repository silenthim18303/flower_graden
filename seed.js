// ========== 随机种子配置区域 ==========
// 位置X：调整数值可以左右移动随机种子 (0=最左边, 540=居中, 1080=最右边)
var seedX = 700;
// 位置Y：调整数值可以上下移动随机种子 (0=最顶部, 960=居中, 1920=最底部)
var seedY = 500;
// 缩放比例：调整数值可以改变随机种子大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var seedScale = 0.2;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var seedClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var seedAnimDuration = 100;
// ==================================

// ========== 兑换配置 ==========
// 兑换所需肥料数量
var seedCost = 5;
// ==================================

function showSeedToast(message) {
    var toast = document.getElementById('seed-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 1500);
}

function openSeedModal() {
    var modal = document.getElementById('seed-modal');
    var fertCountEl = document.getElementById('seed-fertilizer-count');
    var buyBtn = document.getElementById('seed-buy');

    if (!modal) return;

    loadFertilizerCounter();
    if (fertCountEl) {
        fertCountEl.textContent = fertilizerCounter;
    }

    if (fertilizerCounter < seedCost) {
        if (buyBtn) {
            buyBtn.disabled = true;
            buyBtn.textContent = '肥料不足';
        }
    } else {
        if (buyBtn) {
            buyBtn.disabled = false;
            buyBtn.textContent = '兑换种子';
        }
    }

    modal.classList.add('show');
    var canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.pointerEvents = 'none';
    }
}

function closeSeedModal() {
    var modal = document.getElementById('seed-modal');
    if (modal) {
        modal.classList.remove('show');
        var canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'auto';
        }
    }
}

function doSeedExchange() {
    loadFertilizerCounter();

    if (fertilizerCounter < seedCost) {
        showSeedToast('肥料不足，需要5袋肥料！');
        return;
    }

    fertilizerCounter -= seedCost;
    saveFertilizerCounter();
    updateFertilizerDisplay();

    GameData.addSeedCount(1);

    closeSeedModal();
    showSeedToast('兑换成功！获得1包随机种子');
}

function blockEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}

function initSeedSystem() {
    var modal = document.getElementById('seed-modal');
    var closeBtn = document.getElementById('seed-close');
    var buyBtn = document.getElementById('seed-buy');

    if (closeBtn) {
        closeBtn.addEventListener('pointerdown', function(e) {
            blockEvent(e);
            closeSeedModal();
        });
        closeBtn.addEventListener('click', blockEvent);
    }

    if (modal) {
        modal.addEventListener('pointerdown', function(e) {
            if (e.target === modal) {
                closeSeedModal();
            }
            blockEvent(e);
        });
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeSeedModal();
            }
            blockEvent(e);
        });

        var content = modal.querySelector('.seed-content');
        if (content) {
            content.addEventListener('pointerdown', blockEvent);
            content.addEventListener('click', blockEvent);
        }
    }

    if (buyBtn) {
        buyBtn.addEventListener('pointerdown', function(e) {
            blockEvent(e);
            doSeedExchange();
        });
        buyBtn.addEventListener('click', function(e) {
            blockEvent(e);
            doSeedExchange();
        });
    }
}

function createSeed(scene) {
    var seed = scene.add.image(seedX, seedY, 'seed');
    seed.setScale(seedScale);
    seed.setInteractive();

    var isAnimating = false;
    seed.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: seed,
            scaleX: seedScale * seedClickScale,
            scaleY: seedScale * seedClickScale,
            duration: seedAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                openSeedModal();
            }
        });
    });
}

window.addEventListener('load', function() {
    initSeedSystem();
});
