// ========== 返回按钮配置区域 ==========
// 位置X：调整数值可以左右移动返回按钮 (0=最左边, 540=居中, 1080=最右边)
var grassBillX = 800;
// 位置Y：调整数值可以上下移动返回按钮 (0=最顶部, 960=居中, 1920=最底部)
var grassBillY = 450;
// 缩放比例：调整数值可以改变返回按钮大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var grassBillScale = 0.15;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var grassBillClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var grassBillAnimDuration = 100;
// ==================================

function createGrassBill(scene) {
    var grassBill = scene.add.image(grassBillX, grassBillY, 'grass_bill');
    grassBill.setScale(grassBillScale);
    grassBill.setInteractive();

    var isAnimating = false;
    grassBill.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: grassBill,
            scaleX: grassBillScale * grassBillClickScale,
            scaleY: grassBillScale * grassBillClickScale,
            duration: grassBillAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                window.location.href = 'index.html';
            }
        });
    });
}
