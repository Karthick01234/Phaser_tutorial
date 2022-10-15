var x=window.innerWidth;
var y=window.innerHeight
const config = {
  type: Phaser.AUTO,
  width: x,
  height: y,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload: preload,
    create: create,
	update: update
  }
};
let game = new Phaser.Game(config);
let img = null;
let bird = null;
let upipe = null;
let lpipe = null;
let pipe = null;
let flapVelocity = 100;
let tpipe = 4;
const yrange =  [y/2, y/10];
let xrange = []
if (navigator.userAgent.indexOf("Win") != -1) xrange = [x/3, x/4];
if (navigator.userAgent.indexOf("Android") != -1) xrange = [x, (x/10)*9]
console.log(xrange)
function preload () {
  this.load.image('sky', 'img/sky.png');
  this.load.image('bird', 'img/bird.png');
  this.load.image('pipe', 'img/pipe.png');
}

function create () {
	img = this.add.image(x/2, y/2, 'sky');
	bird = this.physics.add.sprite(x/20, y/2, 'bird');
	bird.body.gravity.y = 150;
	this.input.on("pointerdown", jump);
	this.input.keyboard.on("keydown_SPACE", jump);
	pipe = this.physics.add.group();
	for(var i=0;i<tpipe;i++) {
		upipe = pipe.create(0, 0, 'pipe').setOrigin(0,1);
		lpipe = pipe.create(0, 0, 'pipe').setOrigin(0,0);
		pipeAnime(upipe, lpipe);
	}
	pipe.setVelocityX(-150)
}	  
function update(time, delta) {
	if(bird.y >= y) {
		stop();
	}
	else if(bird.y <= 0) {
		stop();
	}
	recyclePipe();
}
function jump() {
	bird.body.velocity.y = -flapVelocity
}
function pipeAnime(upipe, lpipe) {
	let preposition = getPos();
	let pipex = Phaser.Math.Between(...xrange);
    let pipey = Phaser.Math.Between(...yrange);
	upipe.x = pipex + preposition;
	upipe.y = pipey;
	lpipe.x = upipe.x;
	lpipe.y = upipe.y + 100;
}
function recyclePipe() {
	let arr=[]
	pipe.getChildren().forEach(pipe => {
		if(pipe.getBounds().right <= 0) {
			arr.push(pipe);
			if(arr.length == 2) {
				pipeAnime(...arr);
			}
		}
	})
}
function getPos() {
	let preposition = 0
	pipe.getChildren().forEach(pipe => {
		preposition = Math.max(pipe.x, preposition)
	})
	return preposition;
}
function stop() {
	bird.x = x/20;
	bird.y = y/2;
	bird.body.moves=false;
}
	 