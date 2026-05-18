// ========== 鸟笼配置区域 ==========
// 位置X：调整数值可以左右移动鸟笼 (0=最左边, 540=居中, 1080=最右边)
var birdCageX = 200;
// 位置Y：调整数值可以上下移动鸟笼 (0=最顶部, 960=居中, 1920=最底部)
var birdCageY = 820;
// 缩放比例：调整数值可以改变鸟笼大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var birdCageScale = 0.6;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var birdCageClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var birdCageAnimDuration = 100;
// ==================================

function createBirdCage(scene) {
    if (!GameData.isBirdCageUnlocked()) return;

    var birdCage = scene.add.image(birdCageX, birdCageY, 'birdCage');
    birdCage.setScale(birdCageScale);
    birdCage.setInteractive();

    var isAnimating = false;
    birdCage.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: birdCage,
            scaleX: birdCageScale * birdCageClickScale,
            scaleY: birdCageScale * birdCageClickScale,
            duration: birdCageAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
            }
        });
    });
}
