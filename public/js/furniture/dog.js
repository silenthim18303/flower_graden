// ========== 小狗配置区域 ==========
var dogX = 200;            // 小狗X坐标
var dogY = 1600;            // 小狗Y坐标
var dogScale = 0.15;        // 小狗缩放比例
var dogClickScale = 0.9;   // 点击时的缩放比例
var dogAnimDuration = 200; // 动画持续时间（毫秒）

// ========== 小狗创建函数 ==========
function createDog(scene) {
    // 检查是否已解锁
    if (!GameData.isDogUnlocked()) return;
    
    // 创建小狗精灵
    var dog = scene.add.sprite(dogX, dogY, 'dog');
    dog.setScale(dogScale);
    dog.setInteractive();
    
    // 点击事件 - 跳转到小狗互动页面
    var isAnimating = false;
    dog.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: dog,
            scaleX: dogScale * dogClickScale,
            scaleY: dogScale * dogClickScale,
            duration: dogAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                // 跳转到小狗互动页面
                window.location.href = './dog.html';
            }
        });
    });
}