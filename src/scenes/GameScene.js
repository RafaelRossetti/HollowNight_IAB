import Phaser from 'phaser';
import Player from '../entities/Player';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        // Parallax background
        this.add.image(640, 360, 'background').setOrigin(0.5).setAlpha(0.7);

        // Some simple grounds
        this.platforms = this.physics.add.staticGroup();

        // Creating some simple platforms
        // Ground floor
        for (let x = 0; x < 1300; x += 400) {
            this.platforms.create(x, 700, 'platform').setScale(2).refreshBody();
        }

        // Some elevated platforms
        this.platforms.create(600, 500, 'platform');
        this.platforms.create(200, 400, 'platform');
        this.platforms.create(1000, 300, 'platform');

        // Add Player
        this.player = new Player(this, 100, 450);
        this.physics.add.collider(this.player, this.platforms);

        // Inputs
        this.cursors = this.input.keyboard.createCursorKeys();

        // Camera settings
        this.cameras.main.setBounds(0, 0, 1280, 720);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        // Initial message
        this.add.text(640, 50, 'Arrows: Move | Up: Jump | Z: Dash', {
            fontSize: '24px',
            color: '#c9d1d9',
            fontFamily: 'Outfit'
        }).setOrigin(0.5);
    }

    update() {
        if (this.player) {
            this.player.update(this.cursors);
        }
    }
}
