// ========== 杂草配置区域 ==========
// 杂草数量：控制生成的杂草数量（最大15个）
var grassCount = 30;
// 最小缩放比例：杂草的最小大小
var grassMinScale = 0.2;
// 最大缩放比例：杂草的最大大小
var grassMaxScale = 0.4;
// 区域范围：杂草生成的区域（相对于背景）
// Y轴范围：背景高度的50%到80%
var grassMinY = 0.5;
var grassMaxY = 0.8;
// X轴范围：背景宽度的5%到95%
var grassMinX = 0.05;
var grassMaxX = 0.95;
// 出现动画配置
// 弹出偏移量：杂草从下方弹出的距离（像素）
var grassPopOffset = 50;
// 弹出动画时长（毫秒）
var grassPopDuration = 400;
// 最大延迟时间：杂草依次出现的最大延迟（毫秒）
var grassMaxDelay = 800;
// 重新生长配置
// 生长间隔：杂草被清除后重新生长的间隔时间（毫秒）
var grassRegrowInterval = 5000;
// 最大数量上限：场景中同时存在的最大杂草数量
var grassMaxCount = 30;
// ==================================

var grassCounter = 0;
var counterText = null;
var currentGrassCount = 0;
var grassScene = null;
var regrowTimer = null;

function loadGrassCounter() {
    var saved = localStorage.getItem('grassCounter');
    if (saved !== null) {
        grassCounter = parseInt(saved, 10);
    }
    return grassCounter;
}

function saveGrassCounter() {
    localStorage.setItem('grassCounter', grassCounter.toString());
}

function updateCounterDisplay() {
    if (counterText) {
        counterText.textContent = '杂草: ' + grassCounter;
    }
}

function initGrassCounter() {
    counterText = document.getElementById('counter-text');
    loadGrassCounter();
    updateCounterDisplay();
}

function spawnSingleGrass(scene) {
    var randomX = Phaser.Math.Between(
        scene.scale.width * grassMinX,
        scene.scale.width * grassMaxX
    );
    var randomY = Phaser.Math.Between(
        scene.scale.height * grassMinY,
        scene.scale.height * grassMaxY
    );
    var randomScale = Phaser.Math.FloatBetween(grassMinScale, grassMaxScale);

    var grass = scene.add.image(randomX, randomY + grassPopOffset, 'grass');
    grass.setScale(0);
    grass.setAlpha(0);
    grass.setInteractive();
    grass.setData('originalScale', randomScale);
    grass.setData('isAnimating', false);

    scene.tweens.add({
        targets: grass,
        y: randomY,
        scaleX: randomScale,
        scaleY: randomScale,
        alpha: 1,
        duration: grassPopDuration,
        ease: 'Back.easeOut'
    });

    grass.on('pointerdown', function(pointer) {
        var currentGrass = this;
        if (currentGrass.getData('isAnimating')) return;
        currentGrass.setData('isAnimating', true);

        var originalScale = currentGrass.getData('originalScale');

        currentGrass.scene.tweens.add({
            targets: currentGrass,
            scaleX: originalScale * 0.8,
            scaleY: originalScale * 0.8,
            duration: 100,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                currentGrass.scene.tweens.add({
                    targets: currentGrass,
                    alpha: 0,
                    duration: 300,
                    ease: 'Quad.easeOut',
                    onComplete: function() {
                        currentGrass.destroy();
                        currentGrassCount--;
                        grassCounter++;
                        saveGrassCounter();
                        updateCounterDisplay();
                        startRegrowTimer();
                    }
                });
            }
        });
    });

    currentGrassCount++;
}

function startRegrowTimer() {
    if (regrowTimer) {
        regrowTimer.remove();
    }

    if (currentGrassCount >= grassMaxCount) {
        return;
    }

    regrowTimer = grassScene.time.addEvent({
        delay: grassRegrowInterval,
        callback: function() {
            if (currentGrassCount < grassMaxCount && grassScene) {
                spawnSingleGrass(grassScene);
                if (currentGrassCount < grassMaxCount) {
                    startRegrowTimer();
                }
            }
        },
        loop: false
    });
}

function initGrassDisplay() {
    if (!counterText) {
        initGrassCounter();
    }
}

function createGrass(scene) {
    if (!counterText) {
        initGrassCounter();
    }

    grassScene = scene;

    for (var i = 0; i < grassCount; i++) {
        var randomDelay = Phaser.Math.Between(0, grassMaxDelay);

        scene.time.delayedCall(randomDelay, function() {
            spawnSingleGrass(scene);
        });
    }
}
