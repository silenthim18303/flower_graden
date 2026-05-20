// ========== 星月相随配置区域 ==========
// 最大数量上限：场景中同时存在的最大星月相随数量
var starFlowerMaxCount = 5;
// 种子发芽概率 (0.5 = 50%)
var starFlowerSpawnRate = 0.5;
// 最小缩放比例
var starFlowerMinScale = 0.06;
// 最大缩放比例
var starFlowerMaxScale = 0.13;
// 区域范围：星月相随生成的区域（相对于背景）
var starFlowerMinY = 0.5;
var starFlowerMaxY = 0.8;
var starFlowerMinX = 0.05;
var starFlowerMaxX = 0.95;
// 出现动画配置
var starFlowerPopOffset = 30;
var starFlowerPopDuration = 500;
// 重新生长配置
var starFlowerRegrowInterval = 10000;
// ==================================

var starFlowerCurrentCount = 0;
var starFlowerScene = null;
var starFlowerRegrowTimer = null;

function spawnSingleStarFlower(scene) {
    if (starFlowerCurrentCount >= starFlowerMaxCount) return false;

    var randomX = Phaser.Math.Between(
        scene.scale.width * starFlowerMinX,
        scene.scale.width * starFlowerMaxX
    );
    var randomY = Phaser.Math.Between(
        scene.scale.height * starFlowerMinY,
        scene.scale.height * starFlowerMaxY
    );
    var randomScale = Phaser.Math.FloatBetween(starFlowerMinScale, starFlowerMaxScale);

    var flower = scene.add.image(randomX, randomY + starFlowerPopOffset, 'starflower');
    flower.setScale(0);
    flower.setAlpha(0);
    flower.setInteractive();
    flower.setData('originalScale', randomScale);
    flower.setData('isAnimating', false);

    scene.tweens.add({
        targets: flower,
        y: randomY,
        scaleX: randomScale,
        scaleY: randomScale,
        alpha: 1,
        duration: starFlowerPopDuration,
        ease: 'Back.easeOut'
    });

    flower.on('pointerdown', function(pointer) {
        var current = this;
        if (current.getData('isAnimating')) return;
        current.setData('isAnimating', true);

        var originalScale = current.getData('originalScale');

        current.scene.tweens.add({
            targets: current,
            scaleX: originalScale * 1.2,
            scaleY: originalScale * 1.2,
            duration: 150,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                current.scene.tweens.add({
                    targets: current,
                    alpha: 0,
                    duration: 300,
                    ease: 'Quad.easeOut',
                    onComplete: function() {
                        current.destroy();
                        starFlowerCurrentCount--;
                        GameData.collectFlower('starflower', '星月相随');
                        startStarFlowerRegrowTimer();
                    }
                });
            }
        });
    });

    starFlowerCurrentCount++;
    return true;
}

function startStarFlowerRegrowTimer() {
    if (starFlowerRegrowTimer) {
        starFlowerRegrowTimer.remove();
    }

    if (starFlowerCurrentCount >= starFlowerMaxCount) {
        return;
    }

    starFlowerRegrowTimer = starFlowerScene.time.addEvent({
        delay: starFlowerRegrowInterval,
        callback: function() {
            if (starFlowerCurrentCount < starFlowerMaxCount && starFlowerScene) {
                spawnSingleStarFlower(starFlowerScene);
                if (starFlowerCurrentCount < starFlowerMaxCount) {
                    startStarFlowerRegrowTimer();
                }
            }
        },
        loop: false
    });
}

function plantStarFlower() {
    if (!starFlowerScene) {
        return 'no_scene';
    }

    if (starFlowerCurrentCount >= starFlowerMaxCount) {
        return 'max_count';
    }

    var random = Math.random();
    if (random < starFlowerSpawnRate) {
        spawnSingleStarFlower(starFlowerScene);
        return 'success';
    }

    return 'no_luck';
}

function initStarFlower(scene) {
    starFlowerScene = scene;
}
