// ========== 堆肥桶配置区域 ==========
// 位置X：调整数值可以左右移动堆肥桶 (0=最左边, 540=居中, 1080=最右边)
var compostbinX = 850;
// 位置Y：调整数值可以上下移动堆肥桶 (0=最顶部, 960=居中, 1920=最底部)
var compostbinY = 1200;
// 缩放比例：调整数值可以改变堆肥桶大小 (0.5=缩小一半, 1.0=原始大小, 2.0=放大一倍)
var compostbinScale = 0.15;
// ==================================

// ========== 点击动画配置 ==========
// 缩放倍数：点击后缩放到的比例
var compostbinClickScale = 0.95;
// 动画时长：单次动画持续时间（毫秒）
var compostbinAnimDuration = 100;
// ==================================

function createCompostbin(scene) {
    var compostbin = scene.add.image(compostbinX, compostbinY, 'compostbin');
    compostbin.setScale(compostbinScale);
    compostbin.setInteractive();

    var isAnimating = false;
    compostbin.on('pointerdown', function() {
        if (isAnimating) return;
        isAnimating = true;
        scene.tweens.add({
            targets: compostbin,
            scaleX: compostbinScale * compostbinClickScale,
            scaleY: compostbinScale * compostbinClickScale,
            duration: compostbinAnimDuration,
            yoyo: true,
            ease: 'Quad.easeInOut',
            onComplete: function() {
                isAnimating = false;
                // 自动兑换杂草为肥料
                var grassCount = GameData.getGrassCount();
                if (grassCount <= 0) {
                    // 显示提示：没有杂草可以堆肥
                    if (scene.add.text) {
                        var toast = scene.add.text(
                            scene.cameras.main.centerX,
                            scene.cameras.main.centerY - 100,
                            '杂草数量不足！',
                            { 
                                fontSize: '32px', 
                                fill: '#ff6b6b',
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                padding: {x: 30, y: 20},
                                borderRadius: 15
                            }
                        );
                        toast.setOrigin(0.5);
                        scene.tweens.add({
                            targets: toast,
                            alpha: 0,
                            y: '-=50',
                            duration: 1500,
                            ease: 'Quad.easeOut',
                            onComplete: function() {
                                toast.destroy();
                            }
                        });
                    }
                    return;
                }
                
                // 计算可兑换的肥料数量 (例如：15个杂草换1个肥料)
                var exchangeRate = 15;
                var fertilizerToAdd = Math.floor(grassCount / exchangeRate);
                var grassToRemove = fertilizerToAdd * exchangeRate;
                
                if (fertilizerToAdd <= 0) {
                    if (scene.add.text) {
                        var toast = scene.add.text(
                            scene.cameras.main.centerX,
                            scene.cameras.main.centerY - 100,
                            '需要15个杂草才能制作1个肥料！',
                            { 
                                fontSize: '32px', 
                                fill: '#ff6b6b',
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                padding: {x: 30, y: 20},
                                borderRadius: 15
                            }
                        );
                        toast.setOrigin(0.5);
                        scene.tweens.add({
                            targets: toast,
                            alpha: 0,
                            y: '-=50',
                            duration: 1500,
                            ease: 'Quad.easeOut',
                            onComplete: function() {
                                toast.destroy();
                            }
                        });
                    }
                    return;
                }
                
                // 执行兑换
                GameData.addGrassCount(-grassToRemove);
                GameData.addFertilizerCount(fertilizerToAdd);
                
                // 更新显示
                if (typeof updateGrassDisplay === 'function') {
                    updateGrassDisplay();
                }
                if (typeof updateFertilizerDisplay === 'function') {
                    updateFertilizerDisplay();
                }
                
                // 显示兑换成功提示
                if (scene.add.text) {
                    var toast = scene.add.text(
                            scene.cameras.main.centerX,
                            scene.cameras.main.centerY - 100,
                            `成功制作 ${fertilizerToAdd} 个肥料！`,
                            { 
                                fontSize: '32px', 
                                fill: '#4CAF50',
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                padding: {x: 30, y: 20},
                                borderRadius: 15
                            }
                        );
                    toast.setOrigin(0.5);
                    scene.tweens.add({
                        targets: toast,
                        alpha: 0,
                        y: '-=50',
                        duration: 1500,
                        ease: 'Quad.easeOut',
                        onComplete: function() {
                            toast.destroy();
                        }
                    });
                }
            }
        });
    });
}
