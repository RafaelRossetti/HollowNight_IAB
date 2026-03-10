import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('platform', 'https://labs.phaser.io/assets/sprites/platform.png'); // Placeholder platform

        // Simple loading text
        const loadingText = this.add.text(640, 360, 'Loading...', {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'Outfit'
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            loadingText.setText(`Loading: ${Math.floor(value * 100)}%`);
        });

        this.load.on('complete', () => {
            this.scene.start('Game');
        });
    }
}
