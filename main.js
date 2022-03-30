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


//�t���[�����[�g�ێ�
let frameCount = 0;
let statTime;

let chImg = new Image();
chImg.src = "sprite.png";
//chImg.onload = draw;

//�L�[�{�[�h
let keyb={};

//������������
// let ojisan = new Ojisan(100,100);
// let ojisan2 = new Ojisan(100,10);

// //�t�B�[���h�����
// let field = new Field();
// //�O�����ď������鐔��������Ȃ�����z��
// let block = [];

//�X�V����
function update()
{
	// field.update();
	// for(let i = block.length-1; i >= 0 ; i--){
	// 	block[i].update();
	// 	if(block[i].kill)block.splice(i, 1);
	// }
	// ojisan.update();
	// ojisan2.update();
}

//�X�v���C�g�̕`��
// function drawSprite(snum,x,y)
function drawSprite()
{
	// let sx = (snum&15)<<4;
	// //(snum%16) * 16
	// let sy = (snum>>4)<<4;
	// //(snum/16) * 16

	// vcon.drawImage(chImg,0,0,16,32, 0,0,16,32);
}

//�`�揈��
let a = 0;
function draw()
{
	//��ʂ𐅐F�ŃN���A
	vcon.fillStyle="#66AAFF";
	// vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);
	if(keyb.Right){
		a++;
		vcon.drawImage(chImg,0,0,16,32, a,a,16,32);
	}
	vcon.drawImage(chImg,0,0,16,32, 0,0,16,32);
	//�}�b�v��\��
	// field.draw();

	// for(let i = 0; i < block.length; i++){
	// 	block[i].draw();
	// }
	// //���������\��
	// ojisan.draw();
	// ojisan2.draw();



	//�f�o�b�O����\��
	vcon.font="24px 'Impact'";
	vcon.fillStyle="white";
	// vcon.fillText("FRAME:"+frameCount,10,128);


	//���z��ʂ������ʂ֊g��]��
	con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
		0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3);
}


//setInterval(mainLoop,1000/60);

//���[�v�J�n
window.onload = function()
{
	startTime = performance.now();
	mainLoop();
}

//���C�����[�v
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
			//�X�V����
			update();
			if( ++c>=4 )break;
		}
		//�`�揈��
		draw();
	}
	requestAnimationFrame(mainLoop);
}



//�L�[�{�[�h�������ꂽ���ɌĂ΂��
document.onkeydown = function(e)
{
	if(e.keyCode == 37)keyb.Left  = true;
	if(e.keyCode == 39)keyb.Right = true;
	if(e.keyCode == 90)keyb.BBUTTON = true;
	if(e.keyCode == 88)keyb.ABUTTON = true;
	if (e.keyCode == 65) {
		block.push(new Block(368, 5, 5));
	}
	/*if(e.keyCode == 65 )field.scx--;
	if(e.keyCode == 83 )field.scx++;*/
}

//�L�[�{�[�h�������ꂽ���ɌĂ΂��
document.onkeyup = function(e)
{
	if(e.keyCode == 37)keyb.Left  = false;
	if(e.keyCode == 39)keyb.Right = false;
	if(e.keyCode == 90)keyb.BBUTTON = false;
	if(e.keyCode == 88)keyb.ABUTTON = false;
}
