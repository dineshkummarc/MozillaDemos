function Tile(index, x, y, s){
  this.x = x * s;
  this.y = y * s;
  this.s = s;
  this.index = index;
  
  this.type = 1; // 1 normal 0 hole
  this.timer = -1;  
}

Tile.prototype.setType = function(type){
  this.type = type;
  if (this.type == 1){
    this.timer = 70;
  }
}

Tile.prototype.countdownTimer = function(){
  if (this.timer >= 0){
    this.timer--;
  }
}



