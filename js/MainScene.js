class MainScene extends Phaser.Scene {
	constructor() {
	   super('MainScene');   
	   this.x=window.innerWidth;
	   this.y=window.innerHeight;
	   this.img = null;
	   this.bird = null;
	   this.pipe = null;
	   this.flapVelocity = 100;
	   this.tpipe = 4;
	   this.yrange =  [this.y/2, this.y/10];
	   this.xrange = []
	   if (navigator.userAgent.indexOf("Win") != -1) this.xrange = [this.x/3, this.x/4];
	   if (navigator.userAgent.indexOf("Android") != -1) this.xrange = [this.x, (this.x/10)*9]
   }
   preload () {
	   this.load.image('sky', 'img/sky.png');
	   this.load.image('bird', 'img/bird.png');
   	   this.load.image('pipe', 'img/pipe.png');
   }
   create () {
	   this.img = this.add.image(this.x/2, this.y/2, 'sky');
	   this.bird = this.physics.add.sprite(this.x/20, this.y/2, 'bird');
	   this.bird.body.gravity.y = 150;
	   this.input.on("pointerdown", this.jump, this);
	   this.input.keyboard.on("keydown_SPACE", this.jump, this);
	   this.pipe = this.physics.add.group();
	   for(var i=0;i<this.tpipe;i++) {
		   const upipe = this.pipe.create(0, 0, 'pipe').setOrigin(0,1);
		   const lpipe = this.pipe.create(0, 0, 'pipe').setOrigin(0,0);
		   this.pipeAnime(upipe, lpipe);
	   }
	   this.pipe.setVelocityX(-150)
   }	  
   update(time, delta) {
	   if(this.bird.y >= this.y) {
		   this.stop();
	   }
	   else if(this.bird.y <= 0) {
		   this.stop();
	   }
	   this.recyclePipe();
   }
   jump() {
	   this.bird.body.velocity.y = -this.flapVelocity
   }
   pipeAnime(upipe, lpipe) {
	   let preposition = this.getPos();
	   let pipex = Phaser.Math.Between(...this.xrange);
	   let pipey = Phaser.Math.Between(...this.yrange);
	   upipe.x = pipex + preposition;
	   upipe.y = pipey;
	   lpipe.x = upipe.x;
	   lpipe.y = upipe.y + 100;
   }
   recyclePipe() {
	   let arr=[]
	   this.pipe.getChildren().forEach(pipe => {
		   if(pipe.getBounds().right <= 0) {
			   arr.push(pipe);
			   if(arr.length == 2) {
				   this.pipeAnime(...arr);
			   }
		   }
	   })
   }
   getPos() {
	   let preposition = 0;
	   this.pipe.getChildren().forEach(pipe => {
		   preposition = Math.max(pipe.x, preposition)
	   })
	   return preposition;
   }
   stop() {
	   this.bird.x = this.x/20;
	   this.bird.y = this.y/2;
	   this.bird.body.moves=false;
   }
}
export default MainScene;
