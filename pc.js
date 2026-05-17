// ========== 电脑配置区域 ==========
// 位置X：调整数值可以左右移动电脑 (0=最左边, 540=居中, 1080=最右边)
var pcX = 350;
// 位置Y：调整数值可以上下移动电脑 (0=最顶部, 960=居中, 1920=最底部)
var pcY = 1150;
// 缩放比例：调整数值可以改变电脑大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var pcScale = 0.22;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var pcClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var pcAnimDuration = 100;
// ==================================

function createPc(scene) {
    var pc = scene.add.image(pcX, pcY, 'pc');
    pc.setScale(pcScale);
    pc.setInteractive();

    var isAnimating = false;
    pc.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: pc,
            scaleX: pcScale * pcClickScale,
            scaleY: pcScale * pcClickScale,
            duration: pcAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                window.location.href = 'ecommerce.html';
            }
        });
    });
}
