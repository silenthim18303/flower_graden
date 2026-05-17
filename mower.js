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
                window.location.href = 'mower.html';
            }
        });
    });
}
