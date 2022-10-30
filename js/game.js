import PreloadAssests from './PreloadAssests.js'
import MenuScene from './MenuScene.js';
import MainScene from './MainScene.js';
var x=window.innerWidth;
var y=window.innerHeight;
if(!localStorage.getItem("scoreH")) {
	localStorage.setItem("scoreH", 0);
}
const config = {
	type: Phaser.AUTO,
	pixelArt: true,
	width: x,
	height: y,
	physics: {
		default: 'arcade',
	},
	scene: [new PreloadAssests(), new MenuScene(), new MainScene()]
};
new Phaser.Game(config);