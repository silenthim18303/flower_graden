// ========== 小狗配置区域 ==========
// 位置X：调整数值可以左右移动小狗 (0=最左边, 540=居中, 1080=最右边)
var dogX = 600;
// 位置Y：调整数值可以上下移动小狗 (0=最顶部, 960=居中, 1920=最底部)
var dogY = 1600;
// 缩放比例：调整数值可以改变小狗大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var dogScale = 0.3;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var dogClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var dogAnimDuration = 100;
// ==================================

function createDog(scene) {
    if (!GameData || !GameData.isDogUnlocked || !GameData.isDogUnlocked()) {
        console.log('Dog is not unlocked');
        return;
    }
    
    // 直接创建视频元素，不使用Phaser的视频加载系统
    var videoElement = document.createElement('video');
    videoElement.src = 'img/furniture/dog.webm';
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.autoplay = true;
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'contain';
    
    // 创建Phaser DOM元素
    var dog = scene.add.dom(dogX, dogY, videoElement);
    dog.setScale(dogScale);
    dog.setInteractive();
    
    // 点击动画
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
            }
        });
    });
}