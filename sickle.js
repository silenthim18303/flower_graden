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
            }
        });
    });
}
