// ========== 灌木丛配置区域 ==========
// 位置X：调整数值可以左右移动灌木丛 (0=最左边, 540=居中, 1080=最右边)
var bushX = 350;
// 位置Y：调整数值可以上下移动灌木丛 (0=最顶部, 960=居中, 1920=最底部)
var bushY = 1400;
// 缩放比例：调整数值可以改变灌木丛大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var bushScale = 0.3;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var bushClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var bushAnimDuration = 150;
// ==================================

function createBush(scene) {
    var bush = scene.add.image(bushX, bushY, 'bush');
    bush.setScale(bushScale);
    bush.setInteractive();

    var isAnimating = false;
    bush.on('pointerdown', function() {
        if (isAnimating) return;
        
        isAnimating = true;
        scene.tweens.add({
            targets: bush,
            scaleX: bushScale * bushClickScale,
            scaleY: bushScale * bushClickScale,
            duration: bushAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
            }
        });
    });
}
