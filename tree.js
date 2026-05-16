// ========== 树木配置区域 ==========
// 位置X：调整数值可以左右移动树木 (0=最左边, 540=居中, 1080=最右边)
var treeX = 750;
// 位置Y：调整数值可以上下移动树木 (0=最顶部, 960=居中, 1920=最底部)
var treeY = 550;
// 缩放比例：调整数值可以改变树木大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var treeScale = 0.25;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var treeClickScale = 0.98;
// 动画时长：单次动画持续时间（毫秒）
var treeAnimDuration = 100;
// ==================================

// ========== 摇一摇配置 ==========
// 获得肥料的概率 (0.5 = 50%)
var treeDropRate = 0.5;
// 冷却时间（毫秒）：5分钟 = 300000毫秒
var treeCooldown = 300000;
// ==================================

function getShakeCooldownRemaining() {
    var lastTime = GameData.getLastShakeTime();
    if (lastTime === 0) return 0;
    var now = Date.now();
    var elapsed = now - lastTime;
    if (elapsed >= treeCooldown) return 0;
    return treeCooldown - elapsed;
}

function formatCooldownTime(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = Math.ceil((ms % 60000) / 1000);
    if (minutes > 0) {
        return minutes + '分' + seconds + '秒';
    }
    return seconds + '秒';
}

function updateShakeButton() {
    var shakeBtn = document.getElementById('tree-shake');
    if (!shakeBtn) return;

    var remaining = getShakeCooldownRemaining();
    if (remaining > 0) {
        shakeBtn.disabled = true;
        shakeBtn.textContent = '冷却中(' + formatCooldownTime(remaining) + ')';
    } else {
        shakeBtn.disabled = false;
        shakeBtn.textContent = '摇一摇';
    }
}

function showTreeToast(message) {
    var toast = document.getElementById('tree-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 1500);
}

function openTreeModal() {
    var remaining = getShakeCooldownRemaining();
    if (remaining > 0) {
        showTreeToast('摇一摇冷却中，还需等待' + formatCooldownTime(remaining));
        return;
    }

    var modal = document.getElementById('tree-modal');
    if (modal) {
        updateShakeButton();
        modal.classList.add('show');
        var canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'none';
        }
    }
}

function closeTreeModal() {
    var modal = document.getElementById('tree-modal');
    if (modal) {
        modal.classList.remove('show');
        var canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.pointerEvents = 'auto';
        }
    }
}

function doShake() {
    var remaining = getShakeCooldownRemaining();
    if (remaining > 0) {
        showTreeToast('摇一摇冷却中，还需等待' + formatCooldownTime(remaining));
        return;
    }

    GameData.setLastShakeTime(Date.now());

    var random = Math.random();

    if (random < treeDropRate) {
        loadFertilizerCounter();
        fertilizerCounter++;
        saveFertilizerCounter();
        updateFertilizerDisplay();
        showTreeToast('太幸运了！掉下来一包肥料');
    } else {
        showTreeToast('什么都没掉下来，再试试吧');
    }

    updateShakeButton();
}

function blockEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}

function initTreeSystem() {
    var modal = document.getElementById('tree-modal');
    var closeBtn = document.getElementById('tree-close');
    var shakeBtn = document.getElementById('tree-shake');

    if (closeBtn) {
        closeBtn.addEventListener('pointerdown', function(e) {
            blockEvent(e);
            closeTreeModal();
        });
        closeBtn.addEventListener('click', blockEvent);
    }

    if (modal) {
        modal.addEventListener('pointerdown', function(e) {
            if (e.target === modal) {
                closeTreeModal();
            }
            blockEvent(e);
        });
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTreeModal();
            }
            blockEvent(e);
        });

        var content = modal.querySelector('.tree-content');
        if (content) {
            content.addEventListener('pointerdown', blockEvent);
            content.addEventListener('click', blockEvent);
        }
    }

    if (shakeBtn) {
        shakeBtn.addEventListener('pointerdown', function(e) {
            blockEvent(e);
            doShake();
        });
        shakeBtn.addEventListener('click', function(e) {
            blockEvent(e);
            doShake();
        });
    }
}

function createTree(scene) {
    var tree = scene.add.image(treeX, treeY, 'tree');
    tree.setScale(treeScale);
    tree.setInteractive();

    var isAnimating = false;
    tree.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: tree,
            scaleX: treeScale * treeClickScale,
            scaleY: treeScale * treeClickScale,
            duration: treeAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                openTreeModal();
            }
        });
    });
}

window.addEventListener('load', function() {
    initTreeSystem();
});
