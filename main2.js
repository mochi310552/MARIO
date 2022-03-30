const GAME_FPS = 1000 / 60;
const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;

let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");

vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width  = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

con.mozimageSmoothingEnabled    = false;
con.msimageSmoothingEnabled     = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled       = false;



let frameCount = 0;
let statTime;

let chImg = new Image();
chImg.src = "sprite.png";
//chImg.onload = draw;


let keyb = {};
let ojisan = new Ojisan(100, 100);

const ANIME_JUMP = 4;
const GRAVITY = 4;

function update()
{
  ojisan.update();
  /*if (keyb.ABUTTON) {
    if (oji_jump == 0) {
      oji_anime = ANIME_JUMP;
      oji_jump = 1;
    }
    if(oji_jump < 15) oji_vy = -(64 - oji_jump);
  }
  if(oji_jump) oji_jump++;

  if(oji_vy < 64) oji_vy+=GRAVITY;

  if (oji_y > 150<<4) {
    if(oji_anime == ANIME_JUMP)oji_anime = 1;
    oji_jump = 0;
    oji_vy = 0;
    oji_y = 150<<4;
  }

  if(keyb.Left){
    if(oji_anime === 0) oji_acount = 0;
    if(!oji_jump)oji_anime = 1;
    if(!oji_jump) oji_dir = 1;
    if(oji_vx > -32)oji_vx--;
    if(oji_vx > 0) oji_vx--;
    if(!oji_jump && oji_vx > 8) oji_anime = 2;
  }
  else if (keyb.Right) {
    if(oji_anime === 0) oji_acount = 0;
    if(!oji_jump)oji_anime = 1;
    if(!oji_jump) oji_dir = 0;
    if(oji_vx < 32)oji_vx++;
    if(oji_vx < 0) oji_vx++;
    if(!oji_jump && oji_vx < -8) oji_anime = 2;
  } else {
    if (!oji_jump) {
      if(oji_vx === 0)oji_anime = 0;
      if(oji_vx > 0) oji_vx--;
      if(oji_vx < 0) oji_vx++;
    }
  }
  oji_acount++;
  if(Math.abs(oji_vx) === 32) oji_acount++;

  if(oji_anime === 0) oji_sprite = 0;
  else if(oji_anime === 1) oji_sprite = ((oji_acount/8)%3) + 2;
  else if(oji_anime === 2) oji_sprite = 5;
  else if(oji_anime === ANIME_JUMP) oji_sprite = 6;

  if(oji_dir)oji_sprite += 48;
  oji_x += oji_vx;
  oji_y += oji_vy;
}


function drawSprite(snum,x,y)
{
  let sx = (snum&15) * 16;

  let sy = (snum>>4) * 16;

  vcon.drawImage(chImg,  sx, sy, 16, 32,  x, y, 16, 32);
}


function draw()
{

	vcon.fillStyle="#66AAFF";
	vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);
  //vcon.drawImage(chImg, 16, 0, 16, 32,  oji_x>>4, oji_y>>4, 16, 32);
  drawSprite(oji_sprite, oji_x>>4, oji_y>>4);


	vcon.font="24px 'Impact'";
	vcon.fillStyle="white";
	//vcon.fillText("FRAME:"+frameCount,10,20);

	con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
		0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3);
}


//setInterval(mainLoop,1000/60);


window.onload = function()
{
	startTime = performance.now();
	mainLoop();
}


function mainLoop()
{
	let nowTime  = performance.now();
	let nowFrame = (nowTime-startTime) / GAME_FPS;

	if( nowFrame > frameCount )
	{
		let c=0;
		while( nowFrame > frameCount )
		{
			frameCount++;

			update();
			if( ++c>=4 )break;
		}

		draw();
	}
	requestAnimationFrame(mainLoop);
}



//
document.onkeydown = function(e)
{
	if(e.keyCode == 37)keyb.Left  = true;
	if(e.keyCode == 39)keyb.Right = true;
	if(e.keyCode == 90)keyb.BBUTTON = true;
	if(e.keyCode == 88)keyb.ABUTTON = true;

	if(e.keyCode == 65 )field.scx--;
	if(e.keyCode == 83 )field.scx++;
}

//
document.onkeyup = function(e)
{
	if(e.keyCode == 37)keyb.Left  = false;
	if(e.keyCode == 39)keyb.Right = false;
	if(e.keyCode == 90)keyb.BBUTTON = false;
	if(e.keyCode == 88)keyb.ABUTTON = false;
}

/*const GAME_FPS = 1000 / 60;
const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;

let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");

vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width  = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

con.mozimageSmoothingEnabled    = false;
con.msimageSmoothingEnabled     = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled       = false;



let frameCount = 0;
let statTime;

let chImg = new Image();
chImg.src = "sprite.png";
//chImg.onload = draw;


let keyb = {};
let oji_x = 100<<4;

let oji_y = 100<<4;
let oji_vx = 0;
let oji_vy = 0;
let oji_sprite = 0;
let oji_acount = 0;
let oji_anime = 0;
let oji_dir = 0;
let oji_jump = 0;

const ANIME_JUMP = 4;
const GRAVITY = 4;


function update()
{
  if (keyb.ABUTTON) {
    if (oji_jump == 0) {
      oji_anime = ANIME_JUMP;
      oji_jump = 1;
    }
    if(oji_jump < 15) oji_vy = -(64 - oji_jump);
  }
  if(oji_jump) oji_jump++;

  if(oji_vy < 64) oji_vy+=GRAVITY;

  if (oji_y > 150<<4) {
    if(oji_anime == ANIME_JUMP)oji_anime = 1;
    oji_jump = 0;
    oji_vy = 0;
    oji_y = 150<<4;
  }

  if(keyb.Left){
    if(oji_anime === 0) oji_acount = 0;
    if(!oji_jump)oji_anime = 1;
    if(!oji_jump) oji_dir = 1;
    if(oji_vx > -32)oji_vx--;
    if(oji_vx > 0) oji_vx--;
    if(!oji_jump && oji_vx > 8) oji_anime = 2;
  }
  else if (keyb.Right) {
    if(oji_anime === 0) oji_acount = 0;
    if(!oji_jump)oji_anime = 1;
    if(!oji_jump) oji_dir = 0;
    if(oji_vx < 32)oji_vx++;
    if(oji_vx < 0) oji_vx++;
    if(!oji_jump && oji_vx < -8) oji_anime = 2;
  } else {
    if (!oji_jump) {
      if(oji_vx === 0)oji_anime = 0;
      if(oji_vx > 0) oji_vx--;
      if(oji_vx < 0) oji_vx++;
    }
  }
  oji_acount++;
  if(Math.abs(oji_vx) === 32) oji_acount++;

  if(oji_anime === 0) oji_sprite = 0;
  else if(oji_anime === 1) oji_sprite = ((oji_acount/8)%3) + 2;
  else if(oji_anime === 2) oji_sprite = 5;
  else if(oji_anime === ANIME_JUMP) oji_sprite = 6;

  if(oji_dir)oji_sprite += 48;
  oji_x += oji_vx;
  oji_y += oji_vy;


  /*if (keyb.ABUTTON) {
    if (oji_jump == 0) {
      oji_anime = ANIME_JUMP;
      oji_jump = 1;
    }
    if(oji_jump < 15) oji_vy = -(64 - oji_jump);
  }
  if(oji_jump) oji_jump++;

  if(oji_vy < 64) oji_vy+=GRAVITY;

  if (oji_y > 150<<4) {
    if(oji_anime == ANIME_JUMP)oji_anime = 1;
    oji_jump = 0;
    oji_vy = 0;
    oji_y = 150<<4;
  }

  if(keyb.Left){
    if(oji_anime === 0) oji_acount = 0;
    if(!oji_jump)oji_anime = 1;
    if(!oji_jump) oji_dir = 1;
    if(oji_vx > -32)oji_vx--;
    if(oji_vx > 0) oji_vx--;
    if(!oji_jump && oji_vx > 8) oji_anime = 2;
  }
  else if (keyb.Right) {
    if(oji_anime === 0) oji_acount = 0;
    if(!oji_jump)oji_anime = 1;
    if(!oji_jump) oji_dir = 0;
    if(oji_vx < 32)oji_vx++;
    if(oji_vx < 0) oji_vx++;
    if(!oji_jump && oji_vx < -8) oji_anime = 2;
  } else {
    if (!oji_jump) {
      if(oji_vx === 0)oji_anime = 0;
      if(oji_vx > 0) oji_vx--;
      if(oji_vx < 0) oji_vx++;
    }
  }
  oji_acount++;
  if(Math.abs(oji_vx) === 32) oji_acount++;

  if(oji_anime === 0) oji_sprite = 0;
  else if(oji_anime === 1) oji_sprite = ((oji_acount/8)%3) + 2;
  else if(oji_anime === 2) oji_sprite = 5;
  else if(oji_anime === ANIME_JUMP) oji_sprite = 6;

  if(oji_dir)oji_sprite += 48;
  oji_x += oji_vx;
  oji_y += oji_vy;
}


function drawSprite(snum,x,y)
{
  let sx = (snum&15) * 16;

  let sy = (snum>>4) * 16;

  vcon.drawImage(chImg,  sx, sy, 16, 32,  x, y, 16, 32);
}


function draw()
{

	vcon.fillStyle="#66AAFF";
	vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);
  //vcon.drawImage(chImg, 16, 0, 16, 32,  oji_x>>4, oji_y>>4, 16, 32);
  drawSprite(oji_sprite, oji_x>>4, oji_y>>4);


	vcon.font="24px 'Impact'";
	vcon.fillStyle="white";
	//vcon.fillText("FRAME:"+frameCount,10,20);

	con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
		0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3);
}


//setInterval(mainLoop,1000/60);


window.onload = function()
{
	startTime = performance.now();
	mainLoop();
}


function mainLoop()
{
	let nowTime  = performance.now();
	let nowFrame = (nowTime-startTime) / GAME_FPS;

	if( nowFrame > frameCount )
	{
		let c=0;
		while( nowFrame > frameCount )
		{
			frameCount++;

			update();
			if( ++c>=4 )break;
		}

		draw();
	}
	requestAnimationFrame(mainLoop);
}



//
document.onkeydown = function(e)
{
	if(e.keyCode == 37)keyb.Left  = true;
	if(e.keyCode == 39)keyb.Right = true;
	if(e.keyCode == 90)keyb.BBUTTON = true;
	if(e.keyCode == 88)keyb.ABUTTON = true;

	if(e.keyCode == 65 )field.scx--;
	if(e.keyCode == 83 )field.scx++;
}

//
document.onkeyup = function(e)
{
	if(e.keyCode == 37)keyb.Left  = false;
	if(e.keyCode == 39)keyb.Right = false;
	if(e.keyCode == 90)keyb.BBUTTON = false;
	if(e.keyCode == 88)keyb.ABUTTON = false;
}
*/
