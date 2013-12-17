function Environment(rows){
  this.rows = rows;
  this.tileCount = this.rows * this.rows;
  
  this.tiles = new Array();
  
  this.bg = new Image();
  this.bg.src = "./assets/tiles/bg.png";
  this.img_normal = new Image();
  // this.img_normal.src = "./assets/tiles/normal.png";
  this.img_hole = new Image();
  // this.img_hole.src = "./assets/tiles/hole.png";
  
  this.zone = new Image();
  this.zone.src = "./assets/tiles/zone.png";
  this.zoneTargetPos = new v2(c.width * 0.38,-1000);
  this.zonePos = new v2(c.width * 0.38,-1000);
  this.zoneSize = 200 / (720 / c.height);
  
  this.starbug = new Image();
  this.starbug.src = "./assets/player/ptsbug.png";
  this.starbugTargetPos = new v2(c.width * 0.38, -c.height * 10);
  this.starbugPos = new v2(c.width * 0.38,-c.height * 10);
  this.starbugSize = 70 / (720 / c.height);
  this.starbugpts = new Image();
  this.starbugpts.src = "./assets/player/pts.png";
  this.starbugptsSize = 30 / (720 / c.height);
  this.starbugShow = false;
  
  this.tileSize = 100 / (720 / c.height);
  this.offsetX = (c.width - (this.tileSize * this.rows)) / 2;
  this.offsetY = (c.height - (this.tileSize * this.rows)) / 2;
}

Environment.prototype.Setup = function(){
  for (var x = 0; x < this.tileCount; x++){
    this.tiles[x] = new Tile(x,
    x % this.rows,
		parseInt(x / this.rows),
    this.tileSize);
    // if (x > this.tileCount/2 - 3 && x < this.tileCount/2 + 2){
      // this.tiles[x].setType(0);
    // }
  }
  this.SetDefaultZone();
  this.SpawnStarbug();
}

Environment.prototype.SetDefaultZone = function(){
  this.zoneTargetPos = new v2(this.tiles[this.tileCount/2 - this.rows/2].x, this.tiles[this.tileCount/2].y); 
}
Environment.prototype.SetNewZone = function(){
  this.zoneTargetPos = new v2(this.zoneSize + Math.random() * this.rows/2 * this.tileSize, this.zoneSize + Math.random() * this.rows/2 * this.tileSize); 
}
Environment.prototype.SpawnStarbug = function(){
  this.starbugTargetPos = new v2(this.tileSize + Math.random() * (this.rows-1) * this.tileSize, this.tileSize + Math.random() * (this.rows-1) * this.tileSize); 
  this.starbugShow = true;
}

Environment.prototype.HideStarbug = function(){
  this.starbugTargetPos = new v2(c.width * 0.38, -c.height * 5);
  this.starbugShow = false;
}


Environment.prototype.Draw = function(){  
  ctx.drawImage(this.bg,0,0,c.width,c.height);
  // ctx.fillRect(this.offsetX, this.offsetY, this.tileSize * this.rows, this.tileSize * this.rows);
  
  for (var x = 0; x < this.tileCount; x++){
    if (this.tiles[x].type == 1){
      // ctx.drawImage(this.img_normal, this.offsetX + this.tiles[x].x, this.offsetY + this.tiles[x].y, this.tiles[x].s, this.tiles[x].s);
    }else{
       // ctx.drawImage(this.img_hole, this.offsetX + this.tiles[x].x, this.offsetY + this.tiles[x].y, this.tiles[x].s, this.tiles[x].s);
    }
  }
  
  // set zone position
  this.zonePos.x += (this.zoneTargetPos.x - this.zonePos.x) * 0.3;
  this.zonePos.y += (this.zoneTargetPos.y - this.zonePos.y) * 0.2;
  ctx.drawImage(this.zone, this.offsetX + this.zonePos.x - this.zoneSize/2, this.offsetY + this.zonePos.y - this.zoneSize/2, this.zoneSize, this.zoneSize);
  
  // draw game timer
  ctx.fillStyle = "#fff";
  ctx.font = 15 * (c.width/540) + 'px Arial';
  ctx.fillText(parseInt(rules.Time/60), this.offsetX + this.zonePos.x - this.zoneSize/10, this.offsetY + this.zonePos.y + this.zoneSize/13);
  
  // draw zone game timer arc
  ctx.beginPath();
  ctx.strokeStyle = "#00adde";
  ctx.lineWidth = c.width/window.innerWidth * 8;
  ctx.arc(this.offsetX + this.zonePos.x, this.offsetY + this.zonePos.y, this.zoneSize * 0.475, -90 / 180 * Math.PI, (-90 + 1 - (rules.Time / rules.MaxTime) * 360) / 180 * Math.PI, true);
  ctx.stroke();
  ctx.closePath();
  
  // move star
  this.starbugPos.x += (this.starbugTargetPos.x - this.starbugPos.x) * 0.03;
  this.starbugPos.y += (this.starbugTargetPos.y - this.starbugPos.y) * 0.03;
  
  // draw star
  // if (this.starbugPos.y > -c.height * 3.1 && this.starbugPos.y < c.height * 3.1){
    ctx.drawImage(this.starbug, this.offsetX + this.starbugPos.x - this.starbugSize/2, this.offsetY + this.starbugPos.y - this.starbugSize/2, this.starbugSize, this.starbugSize);
    ctx.drawImage(this.starbugpts, this.offsetX + this.starbugPos.x + this.starbugSize/4, this.offsetY + this.starbugPos.y - this.starbugSize/1.2, this.starbugptsSize, this.starbugptsSize);
  
  // my dev alpha has issues with the ctx.arc function, dunno why but adding user agent sniffing to skip this (tut tut, i know)
  if (navigator.userAgent.indexOf("BB10") < 0) {
    ctx.beginPath();
    ctx.strokeStyle = "#ddff13";
    ctx.lineWidth = c.width/window.innerWidth * 6;
    ctx.arc(this.offsetX + this.starbugPos.x, this.offsetY + this.starbugPos.y, this.starbugSize * 0.55, (-90 + rules.Time * 10) / 180 * Math.PI, (rules.Time * 10) / 180 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();
  }
  // }  
}