const ANIME_STAND = 1;
const ANIME_WALK  = 2;
const ANIME_BRAKE = 4;
const ANIME_JUMP  = 8;
const GRAVITY     = 4;
const MAX_SPEED   = 32;

class Ojisan
{
	constructor(x,y)
	{
		this.x  =x<<4;
		this.y  =y<<4;
		this.vx =0;
		this.vy =0;
		this.anim =0;
		this.snum =0;
		this.acou =0;
		this.dirc =0;
		this.jump =0;
	}

	checkFloor(){
		if(this.vy <= 0) return ;
		let lx = (this.x>>4);
		let ly = ((this.y + this.vy)>>4);

		if (field.isBlock(lx + 1, ly + 31) || field.isBlock(lx + 14, ly + 31)) {
			if(this.anim == ANIME_JUMP) this.anim = ANIME_WALK;
			this.jump = 0;
			this.vy = 0;
			this.y = ((((ly + 31)>>4)<<4) - 32)<<4;
		}
	}

	checkCeil(){
		if(this.vy >= 0) return ;
		let lx = ((this.x + this.vx)>>4);
		let ly = ((this.y + this.vy)>>4);

		let bl;
		if (bl = field.isBlock(lx + 8, ly + 5)) {

			this.jump = 15;
			this.vy = 0;

			if(bl != 371){
				block.push(new Block(bl, (lx+8)>>4, (ly+5)>>4));
			}
			else{
				block.push(new Block(bl, (lx+8)>>4, (ly+5)>>4, 1, 20, -60));
				block.push(new Block(bl, (lx+8)>>4, (ly+5)>>4, 1, 20, -30));
				block.push(new Block(bl, (lx+8)>>4, (ly+5)>>4, 1, -20, -30));
				block.push(new Block(bl, (lx+8)>>4, (ly+5)>>4, 1, -20, -60));
			}
		}
	}

	checkWall(){
		//if(this.vy <= 0) return ;
		let lx = ((this.x + this.vx)>>4);
		let ly = ((this.y + this.vy)>>4);

		if (field.isBlock(lx + 15, ly + 9) ||
		 		field.isBlock(lx + 15, ly + 15) ||
				field.isBlock(lx + 15, ly + 24)) {
			/*if(this.anim == ANIME_JUMP) this.anim = ANIME_WALK;
			this.jump = 0;*/
			this.vx = 0;
			this.x -= 8;
		} else
		if (field.isBlock(lx, ly + 9) ||
		 		field.isBlock(lx, ly + 15) ||
				field.isBlock(lx, ly + 24)) {
			/*if(this.anim == ANIME_JUMP) this.anim = ANIME_WALK;
			this.jump = 0;*/
			this.vx = 0;
			this.x += 8;
		}
	}

	//�W�����v����
	updateJump()
	{
		//�W�����v
		if( keyb.ABUTTON )
		{
			if(this.jump==0)
			{
				this.anim = ANIME_JUMP;
				this.jump = 1;
			}
			if(this.jump<15)this.vy = -(64-this.jump);
		}
		if(this.jump)this.jump++;
	}

	//�������̈ړ�
	updateWalkSub(dir)
	{
		//�ō����܂ŉ���
		if( dir==0 && this.vx <  MAX_SPEED )this.vx++;
		if( dir==1 && this.vx > -MAX_SPEED )this.vx--;

		//�W�����v���ĂȂ���
		if(!this.jump)
		{
			//�����|�[�Y���������̓J�E���^���Z�b�g
			if(this.anim==ANIME_STAND)this.acou=0;
			//�A�j��������A�j��
			this.anim = ANIME_WALK;
			//������ݒ�
			this.dirc   = dir;
			//�t�����̎��̓u���[�L��������
			if( dir==0 && this.vx<0 )this.vx++;
			if( dir==1 && this.vx>0 )this.vx--;
			//�t�ɋ��������̎��̓u���[�L�A�j��
			if(dir==1 && this.vx>8 ||
				dir==0 && this.vx<-8)
				this.anim=ANIME_BRAKE;
			}
		}

		//��������
		updateWalk()
		{
			//���ړ�
			if( keyb.Left  ){
				this.updateWalkSub(1);
			}else if( keyb.Right ){
				this.updateWalkSub(0);
			}else {
				if(!this.jump)
				{
					if(this.vx>0)this.vx-=1;
					if(this.vx<0)this.vx+=1;
					if(!this.vx) this.anim=ANIME_STAND;
				}
			}
		}

		//�X�v���C�g��ς��鏈��
		updateAnim()
		{
			//�X�v���C�g�̌���
			switch(this.anim)
			{
				case ANIME_STAND:
				this.snum = 0;
				break;
				case ANIME_WALK:
				this.snum = 2+((this.acou/6)%3);
				break;
				case ANIME_JUMP:
				this.snum = 6;
				break;
				case ANIME_BRAKE:
				this.snum = 5;
				break;
			}
			//�������̎��́{�S�W���g��
			if( this.dirc )this.snum +=48;
		}

		//���t���[�����̍X�V����
		update()
		{
			//�A�j���p�̃J�E���^
			this.acou++;
			if(Math.abs(this.vx)==MAX_SPEED)this.acou++;

			this.updateJump();
			this.updateWalk();
			this.updateAnim();

			//�d��
			if(this.vy<64)this.vy+=GRAVITY;

			//���ɂԂ���
			this.checkFloor();
			this.checkWall();
			this.checkCeil();
			//���ۂɍ��W��ς��Ă�
			this.x += this.vx;
			this.y += this.vy;
		}

		//���t���[�����̕`�揈��
		draw()
		{
			let px = (this.x>>4)-field.scx;
			let py = (this.y>>4)-field.scy;
			drawSprite( this.snum, px , py );
			//(this.x>>4)-field.scx�͏��128,���S;f
			//console.log(this.x>>4);
		}
	}
/*
const ANIME_STAND = 1;
const ANIME_WALK  = 2;
const ANIME_BRAKE = 4;
const ANIME_JUMP  = 8;
const GRAVITY     = 4;
const MAX_SPEED   = 32;

class Ojisan
{
	constructor(x,y)
	{
		this.x  =x<<4;
		this.y  =y<<4;
		this.vx =0;
		this.vy =0;
		this.anim =0;
		this.snum =0;
		this.acou =0;
		this.dirc =0;
		this.jump =0;
	}

	//�W�����v����
	updateJump()
	{
		//�W�����v
		if( keyb.ABUTTON )
		{
			if(this.jump==0)
			{
				this.anim = ANIME_JUMP;
				this.jump = 1;
			}
			if(this.jump<15)this.vy = -(64-this.jump);
		}
		if(this.jump)this.jump++;
	}

	//�������̈ړ�
	updateWalkSub(dir)
	{
		//�ō����܂ŉ���
		if( dir==0 && this.vx <  MAX_SPEED )this.vx++;
		if( dir==1 && this.vx > -MAX_SPEED )this.vx--;

		//�W�����v���ĂȂ���
		if(!this.jump)
		{
			//�����|�[�Y���������̓J�E���^���Z�b�g
			if(this.anim==ANIME_STAND)this.acou=0;
			//�A�j��������A�j��
			this.anim = ANIME_WALK;
			//������ݒ�
			this.dirc   = dir;
			//�t�����̎��̓u���[�L��������
			if( dir==0 && this.vx<0 )this.vx++;
			if( dir==1 && this.vx>0 )this.vx--;
			//�t�ɋ��������̎��̓u���[�L�A�j��
			if(dir==1 && this.vx>8 ||
				   dir==0 && this.vx<-8)
				this.anim=ANIME_BRAKE;
		}
	}

	//��������
	updateWalk()
	{
		//���ړ�
		if( keyb.Left  ){
			this.updateWalkSub(1);
		}else if( keyb.Right ){
			this.updateWalkSub(0);
		}else {
			if(!this.jump)
			{
				if(this.vx>0)this.vx-=1;
				if(this.vx<0)this.vx+=1;
				if(!this.vx) this.anim=ANIME_STAND;
			}
		}
	}

	//�X�v���C�g��ς��鏈��
	updateAnim()
	{
		//�X�v���C�g�̌���
		switch(this.anim)
		{
			case ANIME_STAND:
				this.snum = 0;
				break;
			case ANIME_WALK:
				this.snum = 2+((this.acou/6)%3);
				break;
			case ANIME_JUMP:
				this.snum = 6;
				break;
			case ANIME_BRAKE:
				this.snum = 5;
				break;
		}
		//�������̎��́{�S�W���g��
		if( this.dirc )this.snum +=48;
	}

	//���t���[�����̍X�V����
	update()
	{
		//�A�j���p�̃J�E���^
		this.acou++;
		if(Math.abs(this.vx)==MAX_SPEED)this.acou++;

		this.updateJump();
		this.updateWalk();
		this.updateAnim();

		//�d��
		if(this.vy<64)this.vy+=GRAVITY;

		//���ۂɍ��W��ς��Ă�
		this.x += this.vx;
		this.y += this.vy;

		//���ɂԂ���
		if( this.y > 160<<4 )
		{
			if(this.anim==ANIME_JUMP)this.anim=ANIME_WALK;
			this.jump = 0;
			this.vy   = 0;
			this.y    = 160<<4;
		}

	}

	//���t���[�����̕`�揈��
	draw()
	{
		let px = (this.x>>4)-field.scx;
		let py = (this.y>>4)-field.scy;
		drawSprite( this.snum, px , py );
	}
}
*/
