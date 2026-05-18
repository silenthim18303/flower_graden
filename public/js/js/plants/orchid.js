// ========== 蝴蝶兰配置区域 ==========
// 最大数量上限：场景中同时存在的最大蝴蝶兰数量
var orchidMaxCount = 5;
// 生成概率 (0.1 = 10%)
var orchidSpawnRate = 0.3;
// 最小缩放比例
var orchidMinScale = 0.06;
// 最大缩放比例
var orchidMaxScale = 0.13;
// 区域范围：蝴蝶兰生成的区域（相对于背景）
// Y轴范围：背景高度的30%到70%
var orchidMinY = 0.5;
var orchidMaxY = 0.8;
// X轴范围：背景宽度的10%到90%
var orchidMinX = 0.05;
var orchidMaxX = 0.95;
// 出现动画配置
// 弹出偏移量：蝴蝶兰从下方弹出的距离（像素）
var orchidPopOffset = 30;
// 弹出动画时长（毫秒）
var orchidPopDuration = 500;
// 最大延迟时间：蝴蝶兰依次出现的最大延迟（毫秒）
var orchidMaxDelay = 600;
// 重新生长配置
// 生长间隔：蝴蝶兰被清除后重新生长的间隔时间（毫秒）
var orchidRegrowInterval = 8000;
// ==================================

var orchidCurrentCount = 0;
var orchidScene = null;
var orchidRegrowTimer = null;

function spawnSingleOrchid(scene) {
    if (orchidCurrentCount >= orchidMaxCount) return;

    var random = Math.random();
    if (random > orchidSpawnRate) return;

    var randomX = Phaser.Math.Between(
        scene.scale.width * orchidMinX,
        scene.scale.width * orchidMaxX
    );
    var randomY = Phaser.Math.Between(
        scene.scale.height * orchidMinY,
        scene.scale.height * orchidMaxY
    );
    var randomScale = Phaser.Math.FloatBetween(orchidMinScale, orchidMaxScale);

    var orchid = scene.add.image(randomX, randomY + orchidPopOffset, 'orchid');
    orchid.setScale(0);
    orchid.setAlpha(0);
    orchid.setInteractive();
    orchid.setData('originalScale', randomScale);
    orchid.setData('isAnimating', false);

    scene.tweens.add({
        targets: orchid,
        y: randomY,
        scaleX: randomScale,
        scaleY: randomScale,
        alpha: 1,
        duration: orchidPopDuration,
        ease: 'Back.easeOut'
    });

    orchid.on('pointerdown', function(pointer) {
        var currentOrchid = this;
        if (currentOrchid.getData('isAnimating')) return;
        currentOrchid.setData('isAnimating', true);

        var originalScale = currentOrchid.getData('originalScale');

        currentOrchid.scene.tweens.add({
            targets: currentOrchid,
            scaleX: originalScale * 1.2,
            scaleY: originalScale * 1.2,
            duration: 150,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                currentOrchid.scene.tweens.add({
                    targets: currentOrchid,
                    alpha: 0,
                    duration: 300,
                    ease: 'Quad.easeOut',
                    onComplete: function() {
                        currentOrchid.destroy();
                        orchidCurrentCount--;
                        GameData.collectFlower('orchid', '蝴蝶兰');
                        GameData.addOrchidCount(1);
                        startOrchidRegrowTimer();
                    }
                });
            }
        });
    });

    orchidCurrentCount++;
}

function startOrchidRegrowTimer() {
    if (orchidRegrowTimer) {
        orchidRegrowTimer.remove();
    }

    if (orchidCurrentCount >= orchidMaxCount) {
        return;
    }

    orchidRegrowTimer = orchidScene.time.addEvent({
        delay: orchidRegrowInterval,
        callback: function() {
            if (orchidCurrentCount < orchidMaxCount && orchidScene) {
                spawnSingleOrchid(orchidScene);
                if (orchidCurrentCount < orchidMaxCount) {
                    startOrchidRegrowTimer();
                }
            }
        },
        loop: false
    });
}

function createOrchid(scene) {
    orchidScene = scene;

    for (var i = 0; i < orchidMaxCount; i++) {
        var randomDelay = Phaser.Math.Between(0, orchidMaxDelay);

        scene.time.delayedCall(randomDelay, function() {
            spawnSingleOrchid(orchidScene);
        });
    }
}
