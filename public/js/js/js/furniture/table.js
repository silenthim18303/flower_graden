// ========== 桌椅配置区域 ==========
// 位置X：调整数值可以左右移动桌椅 (0=最左边, 540=居中, 1080=最右边)
var tableX = 200;
// 位置Y：调整数值可以上下移动桌椅 (0=最顶部, 960=居中, 1920=最底部)
var tableY = 1200;
// 缩放比例：调整数值可以改变桌椅大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var tableScale = 0.2;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var tableClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var tableAnimDuration = 100;
// ==================================

function createTable(scene) {
    if (!GameData.isTableUnlocked()) return;

    var table = scene.add.image(tableX, tableY, 'table');
    table.setScale(tableScale);
    table.setInteractive();

    var isAnimating = false;
    table.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: table,
            scaleX: tableScale * tableClickScale,
            scaleY: tableScale * tableClickScale,
            duration: tableAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
            }
        });
    });
}
