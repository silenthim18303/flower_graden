// ========== 堆肥桶配置区域 ==========
// 位置X：调整数值可以左右移动堆肥桶 (0=最左边, 540=居中, 1080=最右边)
var compostbinX = 850;
// 位置Y：调整数值可以上下移动堆肥桶 (0=最顶部, 960=居中, 1920=最底部)
var compostbinY = 1200;
// 缩放比例：调整数值可以改变堆肥桶大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var compostbinScale = 0.15;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var compostbinClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var compostbinAnimDuration = 100;
// ==================================

function createCompostbin(scene) {
    var compostbin = scene.add.image(compostbinX, compostbinY, 'compostbin');
    compostbin.setScale(compostbinScale);
    compostbin.setInteractive();

    var isAnimating = false;
    compostbin.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: compostbin,
            scaleX: compostbinScale * compostbinClickScale,
            scaleY: compostbinScale * compostbinClickScale,
            duration: compostbinAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                window.location.href = 'compost.html';
            }
        });
    });
}
