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

// ========== 冷却时间配置 ==========
// 冷却时间：5分钟（毫秒）
var treeCooldown = 5 * 60 * 1000;
// ==================================

function createTree(scene) {
    var tree = scene.add.image(treeX, treeY, 'tree');
    tree.setScale(treeScale);
    tree.setInteractive();

    // 冷却时间相关
    var lastClickTime = localStorage.getItem('treeLastClickTime') || 0;
    var isOnCooldown = function() {
        var now = Date.now();
        return (now - lastClickTime) < treeCooldown;
    };
    var getRemainingTime = function() {
        var now = Date.now();
        var remaining = treeCooldown - (now - lastClickTime);
        if (remaining <= 0) return 0;
        return remaining;
    };

    var isAnimating = false;
    tree.on('pointerdown', function() {
        if (isAnimating) return;
        if (isOnCooldown()) {
            var remaining = getRemainingTime();
            var minutes = Math.floor(remaining / (1000 * 60));
            var seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            showTreeToast(scene, '请等待' + minutes + '分' + seconds + '秒后再试！');
            return;
        }
        
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
                
                // 记录点击时间
                lastClickTime = Date.now();
                localStorage.setItem('treeLastClickTime', lastClickTime);
                
                // 抽奖逻辑
                var random = Math.random();
                if (random < 0.25) {
                    // 25%概率获得肥料
                    GameData.addFertilizerCount(1);
                    showTreeToast(scene, '获得1包肥料！');
                    if (typeof updateFertilizerDisplay === 'function') {
                        updateFertilizerDisplay();
                    }
                } else if (random < 0.5) {
                    // 25%概率获得种子
                    GameData.addSeedCount(1);
                    showTreeToast(scene, '获得1包种子！');
                    if (typeof updateSeedDisplay === 'function') {
                        updateSeedDisplay();
                    }
                } else {
                    // 50%概率什么都没有
                    showTreeToast(scene, '什么都没掉下来...');
                }
            }
        });
    });
}

function showTreeToast(scene, message) {
    var toast = scene.add.text(
        scene.cameras.main.centerX,
        scene.cameras.main.centerY - 100,
        message,
        { 
            fontSize: '32px', 
            fill: '#4CAF50',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: {x: 30, y: 20},
            borderRadius: 15
        }
    );
    toast.setOrigin(0.5);
    scene.tweens.add({
        targets: toast,
        alpha: 0,
        y: '-=50',
        duration: 1500,
        ease: 'Quad.easeOut',
        onComplete: function() {
            toast.destroy();
        }
    });
}
