// ========== 水池配置区域 ==========
// 位置X：调整数值可以左右移动水池 (0=最左边, 540=居中, 1080=最右边)
var poolX = 700;
// 位置Y：调整数值可以上下移动水池 (0=最顶部, 960=居中, 1920=最底部)
var poolY = 1600;
// 缩放比例：调整数值可以改变水池大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var poolScale = 0.5;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var poolClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var poolAnimDuration = 100;
// ==================================

function createPool(scene) {
    if (!GameData.isPoolUnlocked()) return;

    var pool = scene.add.image(poolX, poolY, 'pool');
    pool.setScale(poolScale);
    pool.setInteractive();

    var isAnimating = false;
    pool.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: pool,
            scaleX: poolScale * poolClickScale,
            scaleY: poolScale * poolClickScale,
            duration: poolAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
            }
        });
    });
}
