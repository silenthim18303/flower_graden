// ========== 随机种子配置区域 ==========
// 位置X：调整数值可以左右移动随机种子 (0=最左边, 540=居中, 1080=最右边)
var seedX = 700;
// 位置Y：调整数值可以上下移动随机种子 (0=最顶部, 960=居中, 1920=最底部)
var seedY = 500;
// 缩放比例：调整数值可以改变随机种子大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var seedScale = 0.2;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var seedClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var seedAnimDuration = 100;
// ==================================

function createSeed(scene) {
    var seed = scene.add.image(seedX, seedY, 'seed');
    seed.setScale(seedScale);
    seed.setInteractive();

    var isAnimating = false;
    seed.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: seed,
            scaleX: seedScale * seedClickScale,
            scaleY: seedScale * seedClickScale,
            duration: seedAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                window.location.href = 'seed.html';
            }
        });
    });
}
