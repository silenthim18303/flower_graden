// ========== 秋千配置区域 ==========
var swingX = 650;          // 秋千X坐标
var swingY = 1100;          // 秋千Y坐标
var swingScale = 0.22;      // 秋千缩放比例
var swingClickScale = 1.1; // 点击时的缩放比例
var swingAnimDuration = 150; // 动画持续时间（毫秒）

// ========== 秋千创建函数 ==========
function createSwing(scene) {
    // 检查是否已解锁
    if (!GameData.isSwingUnlocked()) return;
    
    // 创建秋千精灵
    var swing = scene.add.sprite(swingX, swingY, 'swing');
    swing.setScale(swingScale);
    swing.setInteractive();
    
    // 点击动画
    var isAnimating = false;
    swing.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: swing,
            scaleX: swingScale * swingClickScale,
            scaleY: swingScale * swingClickScale,
            duration: swingAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
            }
        });
    });
}