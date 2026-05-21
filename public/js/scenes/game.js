var config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1080,
    height: 1920,
    scale: {
        mode: Phaser.Scale.ENVELOPE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    audio: {
        disableWebAudio: false
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'img/background/back1.png');
    this.load.image('work', 'img/tools/work.png');
    this.load.image('game', 'img/tools/game.png'); // 加载新的game.png图片
    this.load.image('garden_bill', 'img/tools/garden_bill.png');
    this.load.image('tree', 'img/plants/tree.png');
    this.load.image('grass', 'img/plants/glass.png');
    this.load.image('orchid', 'img/plants/蝴蝶兰.png');
    this.load.image('chrysanthemum', 'img/plants/菊花.png');
    this.load.image('starflower', 'img/plants/星月相随.png');
    this.load.image('passerbyflower', 'img/plants/过路黄.png');
    this.load.audio('growup', 'sound/growup.wav');
    this.load.audio('planting', 'sound/planting.wav');
}

function create() {
    var bg = this.add.image(0, 0, 'background');
    bg.setOrigin(0, 0);

    var scaleX = this.scale.width / bg.width;
    var scaleY = this.scale.height / bg.height;
    var scale = Math.max(scaleX, scaleY);

    bg.setScale(scale);
    bg.setPosition(
        (this.scale.width - bg.displayWidth) / 2,
        (this.scale.height - bg.displayHeight) / 2
    );

    // 尝试恢复音频上下文
    if (this.sound && this.sound.context && this.sound.context.state === 'suspended') {
        this.sound.context.resume();
    }

    // 添加点击事件来确保音频上下文启动
    this.input.on('pointerdown', function() {
        if (this.sound && this.sound.context && this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }
    }, this);

    createTree(this);
    createWork(this);
    createMarkBill(this);
    createGardenBill(this);
    createGrass(this);
    createOrchid(this);
    initChrysanthemum(this);
    initStarFlower(this);
    initPasserbyFlower(this);
}

function update() {
}
