var config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1080,
    height: 1920,
    scale: {
        mode: Phaser.Scale.ENVELOPE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = null;

function initGame() {
    if (game) {
        return;
    }
    game = new Phaser.Game(config);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

function preload() {
    this.load.image('background', 'img/background/back1.png');
    this.load.image('work', 'img/tools/work.png');
    this.load.image('mark_bill', 'img/tools/mark_bill.png');
    this.load.image('garden_bill', 'img/tools/garden_bill.png');
    this.load.image('tree', 'img/plants/tree.png');
    this.load.image('grass', 'img/plants/glass.png');
    this.load.image('orchid', 'img/plants/蝴蝶兰.png');
    this.load.image('chrysanthemum', 'img/plants/菊花.png');
    this.load.image('starflower', 'img/plants/星月相随.png');
    this.load.image('passerbyflower', 'img/plants/过路黄.png');
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
