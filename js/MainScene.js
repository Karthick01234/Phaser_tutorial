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
	   this.yrange =  [(this.y/2)-100, this.y/2];
	   this.xrange = []
	   if (navigator.userAgent.indexOf("Win") != -1) this.xrange = [this.x/3, this.x/4];
	   if (navigator.userAgent.indexOf("Android") != -1) this.xrange = [this.x, (this.x/10)*9]
	   this.scoreP = 0;
	   this.scoreT = '';
   }
   create () {
	   this.img = this.add.image(this.x/2, this.y/2, 'sky');
	   this.bird = this.physics.add.sprite(this.x/20, this.y/2, 'bird').setOrigin(0.5, 0.5);
	   console.log(this.bird.width);
	   console.log(this.bird.height);
	   this.bird.setBodySize(this.bird.width-10, this.bird.height-40);
	   this.bird.body.gravity.y = 150;
	   this.bird.setCollideWorldBounds(true);
	   this.input.on("pointerdown", this.jump, this);
	   this.input.keyboard.on("keydown-SPACE", this.jump, this);
	   this.pipe = this.physics.add.group();
	   for(var i=0;i<this.tpipe;i++) {
		   const upipe = this.pipe.create(0, 0, 'pipe').setOrigin(0,1);
		   const lpipe = this.pipe.create(0, 0, 'pipe').setOrigin(0,0);
		   this.pipeAnime(upipe, lpipe);
	   }
	   this.pipe.setVelocityX(-150)
	   this.physics.add.collider(this.bird, this.pipe, this.stop, null, this);
	   this.scoreP = 0;
	   this.scoreT = this.add.text(20, 20, `Score : ${this.scoreP}`, {fontSize : '32px', fill : '#000' })
	   this.add.text(20, 55, `Best Score : ${localStorage.getItem("scoreH")}`, {fontSize : '18px', fill : '#000' })
	   const pause = this.add.image(this.x-20, this.y-20, 'pause').setScale(3).setInteractive().setOrigin(1);
	   pause.on("pointerdown", () => {
		   this.physics.pause();
		   this.scene.pause();
	   })
	   this.anims.create({
		   key: 'fly',
		   frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 8}),
		   frameRate: 9, // since we have 9 frames we set 8 framerate it plays 9 frame per second if we set 4 it take 2 seconds to complete animation
		   repeat: -1 // repeat infinitely
    })
    this.bird.play('fly');
   }	  
   update(time, delta) {
	   if(this.bird.getBounds().bottom >= this.y || this.bird.getBounds().top <= 0) {
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
				   this.scoreUpdate();
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
	   this.physics.pause();
	   this.bird.setTint(0xAF2204);
	   this.bird.stop();
	   if(this.scoreP > localStorage.getItem("scoreH")) {
		   localStorage.setItem("scoreH", this.scoreP);
	   }
	   /*this.time.addEvent({
		   delay: 1000,
		   callback: () => {
			   if(confirm(" You Lost \n Restart Game ") == true) {
				   this.scene.restart();
			   }
		   },
		   loop: false
	   }); */
   }
   scoreUpdate() {
	   this.scoreP++;
	   this.scoreT.setText(`Score : ${this.scoreP}`)
   }
}
export default MainScene;
