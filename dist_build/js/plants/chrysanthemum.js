// ========== 菊花配置区域 ==========
// 最大数量上限：场景中同时存在的最大菊花数量
var chrysanthemumMaxCount = 3;
// 生成概率 (0.1 = 10%)
var chrysanthemumSpawnRate = 1;
// 最小缩放比例
var chrysanthemumMinScale = 0.06;
// 最大缩放比例
var chrysanthemumMaxScale = 0.12;
// 区域范围：菊花生成的区域（相对于背景）
// Y轴范围：背景高度的50%到80%
var chrysanthemumMinY = 0.5;
var chrysanthemumMaxY = 0.8;
// X轴范围：背景宽度的5%到95%
var chrysanthemumMinX = 0.05;
var chrysanthemumMaxX = 0.95;
// 出现动画配置
// 弹出偏移量：菊花从下方弹出的距离（像素）
var chrysanthemumPopOffset = 30;
// 弹出动画时长（毫秒）
var chrysanthemumPopDuration = 500;
// ==================================

var chrysanthemumCurrentCount = 0;
var chrysanthemumScene = null;

function spawnChrysanthemum(scene) {
    if (chrysanthemumCurrentCount >= chrysanthemumMaxCount) {
        return false;
    }

    var random = Math.random();
    if (random > chrysanthemumSpawnRate) {
        return false;
    }

    var randomX = Phaser.Math.Between(
        scene.scale.width * chrysanthemumMinX,
        scene.scale.width * chrysanthemumMaxX
    ); 
    
    var randomY = Phaser.Math.Between(
        scene.scale.height * chrysanthemumMinY,
        scene.scale.height * chrysanthemumMaxY
    );
    var randomScale = Phaser.Math.FloatBetween(chrysanthemumMinScale, chrysanthemumMaxScale);

    var flower = scene.add.image(randomX, randomY + chrysanthemumPopOffset, 'chrysanthemum');
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
        duration: chrysanthemumPopDuration,
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
                        chrysanthemumCurrentCount--;
                    }
                });
            }
        });
    });

    chrysanthemumCurrentCount++;
    GameData.collectFlower('chrysanthemum', '菊花');
    GameData.addChrysanthemumCount(1);

    return true;
}

function fertilizeGrass() {
    if (!chrysanthemumScene) {
        return 'no_scene';
    }

    if (chrysanthemumCurrentCount >= chrysanthemumMaxCount) {
        return 'max_count';
    }

    var success = spawnChrysanthemum(chrysanthemumScene);

    if (success) {
        return 'success';
    } else {
        return 'no_luck';
    }
}

function initChrysanthemum(scene) {
    chrysanthemumScene = scene;
}
