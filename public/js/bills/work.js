// ========== 告示牌配置区域 ==========
// 位置X：调整数值可以左右移动告示牌 (0=最左边, 540=居中, 1080=最右边)
var workX = 150;
// 位置Y：调整数值可以上下移动告示牌 (0=最顶部, 960=居中, 1920=最底部)
var workY = 700;
// 缩放比例：调整数值可以改变告示牌大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var workScale = 0.13;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var workClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var workAnimDuration = 100;
// ==================================

function createWork(scene) {
    var work = scene.add.image(workX, workY, 'work');
    work.setScale(workScale);
    work.setInteractive();

    var isAnimating = false;
    work.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: work,
            scaleX: workScale * workClickScale,
            scaleY: workScale * workClickScale,
            duration: workAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                window.location.href = 'work.html';
            }
        });
    });
}
