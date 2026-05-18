// ========== 花箱配置区域 ==========
// 位置X：调整数值可以左右移动花箱 (0=最左边, 540=居中, 1080=最右边)
var flowerboxX = 850;
// 位置Y：调整数值可以上下移动花箱 (0=最顶部, 960=居中, 1920=最底部)
var flowerboxY = 1550;
// 缩放比例：调整数值可以改变花箱大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var flowerboxScale = 0.2;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var flowerboxClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var flowerboxAnimDuration = 100;
// ==================================

function createFlowerbox(scene) {
    var flowerbox = scene.add.image(flowerboxX, flowerboxY, 'flowerbox');
    flowerbox.setScale(flowerboxScale);
    flowerbox.setInteractive();

    var isAnimating = false;
    flowerbox.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: flowerbox,
            scaleX: flowerboxScale * flowerboxClickScale,
            scaleY: flowerboxScale * flowerboxClickScale,
            duration: flowerboxAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                window.location.href = 'flowerbox.html';
            }
        });
    });
}
