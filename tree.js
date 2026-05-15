// ========== 树木配置区域 ==========
// 位置X：调整数值可以左右移动树木 (0=最左边, 540=居中, 1080=最右边)
var treeX = 750;
// 位置Y：调整数值可以上下移动树木 (0=最顶部, 960=居中, 1920=最底部)
var treeY = 550;
// 缩放比例：调整数值可以改变树木大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var treeScale = 0.25;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var treeClickScale = 0.98;
// 动画时长：单次动画持续时间（毫秒）
var treeAnimDuration = 100;
// ==================================

function createTree(scene) {
    var tree = scene.add.image(treeX, treeY, 'tree');
    tree.setScale(treeScale);
    tree.setInteractive();

    var isAnimating = false;
    tree.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: tree,
            scaleX: treeScale * treeClickScale,
            scaleY: treeScale * treeClickScale,
            duration: treeAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
            }
        });
    });
}
