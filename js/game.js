import MainScene from './MainScene.js';
var x=window.innerWidth;
var y=window.innerHeight;
const config = {
  type: Phaser.AUTO,
  width: x,
  height: y,
  physics: {
    default: 'arcade'
  },
  scene: [new MainScene()]
};
new Phaser.Game(config);