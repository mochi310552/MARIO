/*class Block {
  constructor(bl, x, y, ty, vx, vy) {
    if(ty == undefined) ty = 0;
    this.ty = ty;
    if(vx == undefined) vx = 0;
    this.vx = vx;
    if(vy == undefined) vy = 0;
    this.vy = vy;
    this.bl = bl;
    this.ox = x;
    this.oy = y;
    this.x = x<<8;
    this.y = y<<8;

    this.kill = false;
    this.count = 0;

    fieldData[y*FIELD_SIZE_W+x] = 367;
  }
  update(){
    if(this.kill)return ;
    if (++this.count == 11 && this.ty == 0) {
      this.kill = true;
      fieldData[this.oy*FIELD_SIZE_W+this.ox] = this.bl;
      console.log("a");
      return ;
    }
    if(this.vy<64) this.vy += GRAVITY;

    this.x += this.vx;
    this.y += this.vy;

    if((this.y>>4) > FIELD_SIZE_H*16) this.kill = true;
    //これがあるとブロックが消えちゃう
    //this.count++;*/
  /*}
  draw(){
    //this.count++;
    let an;
    if(this.ty == 0) an = this.bl;
    else an = 388 + ((frameCount>>4)&1);
    let sx = (an&15)<<4;
    let sy = (an>>4)<<4;
    let px = (this.x>>4) - (field.scx);
    let py = (this.y>>4) - (field.scy);
    /*なんで緩やかにブロックが上に上がるのかと思ったけど、
    16倍したthis.yに、加速度を足してるから
    -100,-96-,92みたいな大きな加速度が加算されても、緩やかになる*/

    /*if(this.ty == 0){
      const anim = [0,2,4,5,6,5,4,2,0,-2];
      py -= anim[this.count];
    }
    vcon.drawImage(chImg,  sx, sy, 16, 16,  px, py, 16, 16);
  }
}*/
class Block {
  constructor(bl, x, y, ty, vx, vy) {
    if(ty == undefined) ty = 0;
    this.ty = ty;
    if(vx == undefined) vx = 0;
    this.vx = vx;
    if(vy == undefined) vy = 0;
    this.vy = vy;

    this.bl = bl;
    this.ox = x;
    this.oy = y;
    this.x = x<<8;
    this.y = y<<8;
    console.log(this.x);
    //<<4から<<8にしたら上手くいった

    this.kill = false;
    this.count = 0;

    this.ty = 1;
    this.vx = 30;
    this.vy = -60;

    fieldData[y*FIELD_SIZE_W+x] = 367;
  }
  update(){
    if(this.kill) return ;
    if (++this.count == 10 && this.ty == 0) {
      this.kill = true;
      fieldData[this.oy*FIELD_SIZE_W+this.ox] = this.bl;
      return ;
    }

    if(this.vy < 64) this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;
    //console.log(this.y);
  }
  draw(){
    if(this.kill) return ;

    let sx = (this.bl&15)<<4;
    let sy = (this.bl>>4)<<4;

    let px = (this.x>>4) - (field.scx);
    let py = (this.y>>4) - (field.scy);

    //この条件分岐追加したら上手くいった
    if (this.ty == 0) {
      const anim = [0,2,4,5,6,5,4,2,0,-2];
      py -= anim[this.count];
    }


    vcon.drawImage(chImg, sx, sy, 16, 16,  px, py, 16, 16);
  }
}
/*class Block {
  constructor(bl, x, y, ty, vx, vy) {
    if(ty == undefined) ty = 0;
    this.ty = ty;
    if(vx == undefined) vx = 0;
    this.vx = vx;
    if(vy == undefined) vy = 0;
    this.vy = vy;

    this.bl = bl;
    this.ox = x;
    this.oy = y;
    this.x = x<<8;
    this.y = y<<8;

    this.kill = false;
    this.count = 0;

    fieldData[y*FIELD_SIZE_W+x] = 367;

    this.ty = 1;
    this.vx = 10;
    this.vy = -100;
  }

  update(){
    if(this.kill) return ;
    if (++this.count == 11 && this.ty == 0) {
      this.kill = true;
      //ブロックを復活させる
      fieldData[this.oy*FIELD_SIZE_W+this.ox] = this.bl;
      return ;
    }
    /*if(this.ty == 0) return ;
    if(this.vy<64) this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;

    if((this.y>>4) > FIELD_SIZE_H*16) this.kill = true;
    //これがあるとブロックが消えちゃう
    //this.count++;
  }
  draw(){
    if(this.kill) return ;

    let sx = (this.bl&15)<<4;
    let sy = (this.bl>>4)<<4;

    let px = (this.x>>4) - (field.scx);
    let py = (this.y>>4) - (field.scy);

    if(this.ty == 0){
      const anim = [0,2,4,5,6,5,4,2,0,-2];
      py -= anim[this.count];
    }

    vcon.drawImage(chImg, sx, sy, 16, 16,  px, py, 16, 16);
  }
}
*/
