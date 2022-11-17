 class PreloadAssests extends Phaser.Scene { 
	constructor() {
		super('PreloadAssests');   
	}
	preload() {
		this.load.image('sky', 'img/img/c.jpg');
		this.load.spritesheet('bird', 'img/parrot.png', { frameWidth: 64, frameHeight: 64 });
		this.load.image('pipe', 'img/pipe.png');
		this.load.image('pause', 'img/pause.png');
	}
	create() {
		this.scene.start('MenuScene');
	}
 }
export default PreloadAssests;