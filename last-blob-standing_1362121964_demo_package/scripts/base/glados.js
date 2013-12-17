function Glados(count){
  this.playerCount = count;
  this.players = new Array();
  
  this.discs = new Array();
  for (var i = 0; i < this.playerCount;i++){
    this.discs[i] = new Image();
    // this.discs[i].src = "./assets/tiles/disc"+i+".png";
  }
  this.discsGlow = new Array();
  for (var i = 0; i < this.playerCount;i++){
    this.discsGlow[i] = new Image();
    // this.discsGlow[i].src = "./assets/tiles/discGlow"+i+".png";
  }
  
  this.img = new Array();
  this.img[0] = new Image();
  this.img[0].src = "./assets/player/0.png";
  this.img[1] = new Image();
  this.img[1].src = "./assets/player/1.png";
  this.img[2] = new Image();
  this.img[2].src = "./assets/player/2.png";
  this.img[3] = new Image();
  this.img[3].src = "./assets/player/3.png";
  
  this.curse = new Image();
  this.curse.src = "./assets/player/curse.png";
  this.pt = new Image();
  this.pt.src = "./assets/player/pt.png";
  
  this.playerSize = 80 / (720 / c.height);
  
  for (var x = 0; x < this.playerCount; x++){
    this.players[x] = new Player(x, this.playerSize);    
  }
}

Glados.prototype.Draw = function(){
  ctx.beginPath();
  ctx.strokeStyle = "#c90032";
  ctx.fillStyle = "#f30067";
  ctx.lineWidth = c.width/window.innerWidth * 160;
  if (t[0] == -1){
    ctx.arc(c.width * 0, c.height * 0, 100 + (30 * Math.sin(rules.Time * 0.1)) + 50 * c.height/540, 0, 360/ 180 * Math.PI, true);
  } else {      
    ctx.arc(c.width * 0, c.height * 0, 50 * c.height/540, 0, 360/ 180 * Math.PI, true);
  }
  ctx.stroke();    
  ctx.fill();   
  ctx.closePath();
  
  ctx.beginPath();
  ctx.strokeStyle = "#f0b200";
  ctx.fillStyle = "#f3df00";
  if (t[1] == -1){
    ctx.arc(c.width * 1, c.height * 0, 100 + (30 * Math.sin(rules.Time * 0.1)) + 50 * c.height/540, 0, 360/ 180 * Math.PI, true);
  } else {
    ctx.lineWidth = c.width/window.innerWidth * 160;
    ctx.arc(c.width * 1, c.height * 0, 50 * c.height/540, 0, 360/ 180 * Math.PI, true);   
  }
  ctx.stroke();    
  ctx.fill();   
  ctx.closePath(); 
  
  ctx.beginPath();
  ctx.strokeStyle = "#4bc900";
  ctx.fillStyle = "#5bf300";
  if (t[2] == -1){ 
    ctx.arc(c.width * 0, c.height * 1, 100 + (30 * Math.sin(rules.Time * 0.1)) + 50 * c.height/540, 0, 360/ 180 * Math.PI, true);
  } else {  
    ctx.arc(c.width * 0, c.height * 1, 50 * c.height/540, 0, 360/ 180 * Math.PI, true);
  }
  ctx.stroke();    
  ctx.fill();   
  ctx.closePath();  
  
  ctx.beginPath();
  ctx.strokeStyle = "#0068f0";
  ctx.fillStyle = "#00b7f3";
  if (t[3] == -1){
    ctx.arc(c.width * 1, c.height * 1, 100 + (30 * Math.sin(rules.Time * 0.1)) + 50 * c.height/540, 0, 360/ 180 * Math.PI, true);
  } else {      
    ctx.arc(c.width * 1, c.height * 1, 50 * c.height/540, 0, 360/ 180 * Math.PI, true);
  }
  ctx.stroke();    
  ctx.fill();   
  ctx.closePath();
    
  for (var x = 0; x < this.playerCount; x++){
    this.players[x].Update();
    if (!this.players[x].isDead){
      this.players[x].Collide(this);
      this.players[x].CollectPoints();
      if (isTouching[x]){        
        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.moveTo (env.offsetX + this.players[x].displayX, env.offsetY + this.players[x].displayY);
        ctx.lineTo (env.offsetX + this.players[x].displayX - this.players[x].touchAcc.x * 0.5, env.offsetY + this.players[x].displayY - this.players[x].touchAcc.y * 0.5);
        ctx.stroke();
        ctx.closePath();
      }
      ctx.drawImage(this.img[x], env.offsetX + this.players[x].displayX - this.players[x].s/2, env.offsetY + this.players[x].displayY - this.players[x].s/2, this.players[x].s, this.players[x].s);    
    } else {
      ctx.drawImage(this.curse, env.offsetX + this.players[x].displayX, env.offsetY + this.players[x].displayY - this.players[x].s, this.players[x].s * 0.9, this.players[x].s * 0.9);
    }
    // this.players[x].Draw(env);
  }
}