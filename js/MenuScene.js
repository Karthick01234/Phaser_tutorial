class MenuScene extends Phaser.Scene { 
	constructor() {
		super('MenuScene');   
		this.x = window.innerWidth;
		this.y = window.innerHeight;
		this.playM = null;
	}
	create () {
		this.add.image(this.x/2, this.y/2, 'sky');
		this.playM = this.add.text(this.x/2, this.y/2, 'Play', {fontSize : '34px', fill : '#000' }).setInteractive().setOrigin(0.5,0.5);
		this.playM.on('pointerdown', () => {
			this.scene.start('MainScene');
		})
	}
}
export default MenuScene;
