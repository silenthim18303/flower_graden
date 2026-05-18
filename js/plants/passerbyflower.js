// ========== 过路黄配置区域 ==========
// 最大数量上限：场景中同时存在的最大过路黄数量
var passerbyFlowerMaxCount = 5;
// 种子发芽概率 (0.15 = 15%)
var passerbyFlowerSpawnRate = 1;
// 最小缩放比例
var passerbyFlowerMinScale = 0.06;
// 最大缩放比例
var passerbyFlowerMaxScale = 0.13;
// 区域范围：过路黄生成的区域（相对于背景）
var passerbyFlowerMinY = 0.5;
var passerbyFlowerMaxY = 0.8;
var passerbyFlowerMinX = 0.05;
var passerbyFlowerMaxX = 0.95;
// 出现动画配置
var passerbyFlowerPopOffset = 30;
var passerbyFlowerPopDuration = 500;
// 重新生长配置
var passerbyFlowerRegrowInterval = 12000;
// ==================================

var passerbyFlowerCurrentCount = 0;
var passerbyFlowerScene = null;
var passerbyFlowerRegrowTimer = null;

function spawnSinglePasserbyFlower(scene) {
    if (passerbyFlowerCurrentCount >= passerbyFlowerMaxCount) return false;

    var randomX = Phaser.Math.Between(
        scene.scale.width * passerbyFlowerMinX,
        scene.scale.width * passerbyFlowerMaxX
    );
    var randomY = Phaser.Math.Between(
        scene.scale.height * passerbyFlowerMinY,
        scene.scale.height * passerbyFlowerMaxY
    );
    var randomScale = Phaser.Math.FloatBetween(passerbyFlowerMinScale, passerbyFlowerMaxScale);

    var flower = scene.add.image(randomX, randomY + passerbyFlowerPopOffset, 'passerbyflower');
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
        duration: passerbyFlowerPopDuration,
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
                        passerbyFlowerCurrentCount--;
                        GameData.collectFlower('passerbyflower', '过路黄');
                        startPasserbyFlowerRegrowTimer();
                    }
                });
            }
        });
    });

    passerbyFlowerCurrentCount++;
    return true;
}

function startPasserbyFlowerRegrowTimer() {
    if (passerbyFlowerRegrowTimer) {
        passerbyFlowerRegrowTimer.remove();
    }

    if (passerbyFlowerCurrentCount >= passerbyFlowerMaxCount) {
        return;
    }

    passerbyFlowerRegrowTimer = passerbyFlowerScene.time.addEvent({
        delay: passerbyFlowerRegrowInterval,
        callback: function() {
            if (passerbyFlowerCurrentCount < passerbyFlowerMaxCount && passerbyFlowerScene) {
                spawnSinglePasserbyFlower(passerbyFlowerScene);
                if (passerbyFlowerCurrentCount < passerbyFlowerMaxCount) {
                    startPasserbyFlowerRegrowTimer();
                }
            }
        },
        loop: false
    });
}

function plantPasserbyFlower() {
    if (!passerbyFlowerScene) {
        return 'no_scene';
    }

    if (passerbyFlowerCurrentCount >= passerbyFlowerMaxCount) {
        return 'max_count';
    }

    var random = Math.random();
    if (random < passerbyFlowerSpawnRate) {
        spawnSinglePasserbyFlower(passerbyFlowerScene);
        return 'success';
    }

    return 'no_luck';
}

function initPasserbyFlower(scene) {
    passerbyFlowerScene = scene;
}
