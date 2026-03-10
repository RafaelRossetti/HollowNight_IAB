import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1280,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200 },
      debug: false
    }
  },
  pixelArt: true,
  antialias: false,
  scene: [PreloadScene, GameScene]
};

document.addEventListener('DOMContentLoaded', () => {
  new Phaser.Game(config);
});
