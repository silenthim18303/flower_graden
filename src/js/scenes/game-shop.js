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

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'img/background/shop.png');
    this.load.image('sickle', 'img/tools/sickle.png');
    this.load.image('seed', 'img/tools/随机种子.png');
    this.load.image('mower', 'img/tools/割草机.png');
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

    createSickle(this);
    createSeed(this);
    createMower(this);
}

function update() {
}
