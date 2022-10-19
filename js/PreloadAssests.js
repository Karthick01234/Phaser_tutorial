 class PreloadAssests extends Phaser.Scene { 
	constructor() {
		super('PreloadAssests');   
	}
	preload() {
		this.load.image('sky', 'img/sky.png');
		this.load.spritesheet('bird', 'img/birdSprite.png', { frameWidth: 16, frameHeight: 16 });
		this.load.image('pipe', 'img/pipe.png');
		this.load.image('pause', 'img/pause.png');
	}
	create() {
		this.scene.start('MenuScene');
	}
 }
export default PreloadAssests;