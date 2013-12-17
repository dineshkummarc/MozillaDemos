function Player(index, s){
  this.s = s;
  this.index = index;
  this.score = 0;
  this.x = env.tileSize /2;
  this.y = env.tileSize /2;
  this.prevPos = new v2(this.x, this.y);
  this.displayX = 0;
  this.displayY = 0;
  this.collisionsEnabled = new Array();
  this.ResetPos();
  this.isDead = false;
  this.spawnTimer = -1;
}

Player.prototype.Die = function(){
  // this.x = c.width * 0.5;
  // this.y = c.height * 1.2;
  this.isDead = true;
  this.spawnTimer = 30;
  // this.ResetPos();
}

Player.prototype.Respawn = function(){
  this.spawnTimer = -1;
  this.isDead = false;
  this.ResetPos();
}

Player.prototype.ResetPos = function(){
  this.ResetMovement();
  // set default positions and then provide a little push to get goin in the right direction
  switch(this.index){
    case 0:
      this.x = env.tileSize /2;
      this.y = env.tileSize /2;
      this.vel.x = 10;
      this.vel.y = 10;
    break;
    case 1:
      this.x = env.rows * env.tileSize - env.tileSize/2;
      this.y = env.tileSize /2;
      this.vel.x = -10;
      this.vel.y = 10;
    break;
    case 2:
      this.x = env.tileSize /2;
      this.y = env.rows * env.tileSize - env.tileSize/2;
      this.vel.x = 10;
      this.vel.y = -10;
    break;
    case 3:
      this.x = env.rows * env.tileSize - env.tileSize/2;
      this.y = env.rows * env.tileSize - env.tileSize/2;
      this.vel.x = -10;
      this.vel.y = -10;
    break;
    default:
      this.x = env.tileSize /2;
      this.y = env.tileSize /2;
      this.vel.x = 10;
      this.vel.y = 10;
    break;
  }
}

Player.prototype.ResetMovement = function(){
  this.acc = new v2(0,0);
  this.vel = new v2(0,0);
  this.ResetTouches();
  for (var i = 0; i < 4; i++){
    this.collisionsEnabled[i] = true;
  }
}

Player.prototype.Draw = function(env){
  ctx.fillText(this.score, env.offsetX + this.x + this.s - 40, env.offsetY + this.y + this.s - 90);
}

Player.prototype.Update = function(){
  // we use a prevPos just in case for collisions, having a prevpos helps separate the two colliding objects, but its not used here
  this.prevPos = new v2(this.x, this.y);
  if (this.isDead){
    this.spawnTimer--;
    if (this.spawnTimer <= 0){
      this.Respawn();
    }
  } else {
    // add the swipe force to player acceleration
    this.acc.x += 0.009 * this.touchAcc.x * (c.width / window.innerWidth);
    this.acc.y += 0.009 * this.touchAcc.y * (c.height / window.innerHeight);
    
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y; 

    this.x += this.vel.x;
    this.y += this.vel.y; 

    this.acc.x += (0 - this.acc.x) * 0.8;
    this.acc.y += (0 - this.acc.y) * 0.8;
    
    this.vel.x += (0 - this.vel.x) * 0.2;
    this.vel.y += (0 - this.vel.y) * 0.2;
    
    // check if already touching before we do all the calculations for player touch forces
    if (isTouching[this.index]){
      if (Math.sqrt(Math.pow(tmoves[this.index].x - tstart[this.index].x, 2) + Math.pow(tmoves[this.index].y - tstart[this.index].y, 2)) < 300) {
        this.touchAcc.x = (tmoves[this.index].x - tstart[this.index].x);
        this.touchAcc.y = (tmoves[this.index].y - tstart[this.index].y);    
      }
    }
  }  
  
  //smoothing the movement, just in case
  this.displayX += (this.x - this.displayX) * 0.9;
  this.displayY += (this.y - this.displayY) * 0.9;
}

Player.prototype.ResetTouches = function(){
  this.touchAcc = new v2(0,0);
  tmoves[this.index] = new v2(0,0);
  tstart[this.index] = new v2(0,0);
}

Player.prototype.Collide = function(g){
  if (this.x < env.tiles[0].x || this.x > env.tiles[env.tileCount-1].x + env.tiles[env.tileCount-1].s){
    // originally was going to have players slam off invisible walls
    
    // if (this.x < env.tiles[0].x) {this.x = env.tiles[0].x;} else {this.x = env.tiles[env.tileCount-1].x + env.tiles[e.tileCount-1].s;};
    // this.vel.x = -this.vel.x * 5;
    // this.acc.x = 0;
    // this.ResetPos();
    this.Die();
  }
  if (this.y < env.tiles[0].y || this.y > env.tiles[env.tileCount-1].y + env.tiles[env.tileCount-1].s){
    // originally was going to have players slam off invisible walls
    
    // if (this.y < env.tiles[0].y) {this.y = env.tiles[0].y;} else {this.y = env.tiles[env.tileCount-1].y + env.tiles[e.tileCount-1].s;};
    // this.vel.y = -this.vel.y * 5;  
    // this.acc.y = 0;
    // this.ResetTouches();
    // this.ResetPos();
    this.Die();
  }
  
  for (var i = 0; i < g.players.length; i++){
    if (i != this.index && !g.players[i].isDead) {
      if (Math.sqrt(Math.pow(g.players[i].x - this.x, 2) + Math.pow(g.players[i].y - this.y, 2)) < this.s * 0.9 && this.collisionsEnabled[i] && g.players[i].collisionsEnabled[this.index]){
        if (Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2)) > Math.sqrt(Math.pow(g.players[i].vel.x, 2) + Math.pow(g.players[i].vel.y, 2))){
          // plenty of failed physics code here, tweaked over and over again
          // left for your pleasure and mockery
          
          // g.players[i].vel.x += this.vel.x;
          // g.players[i].vel.y += this.vel.y;
          // g.players[i].acc.x *= 0.8;
          // g.players[i].acc.y *= 0.8;
          // this.vel.x = -this.vel.x;
          // this.vel.y = -this.vel.y; 
          // this.vel.x += g.players[i].vel.x;
          // this.vel.y += g.players[i].vel.y; 
          // g.players[i].x = g.players[i].prevPos.x;
          // g.players[i].y = g.players[i].prevPos.y;
          // this.x = this.prevPos.x;
          // this.y = this.prevPos.y;
          
          var tempV2 = this.vel;
          this.vel = new v2(g.players[i].vel.x * 2, g.players[i].vel.y * 2);
          g.players[i].vel = new v2(tempV2.x * 2, tempV2.y * 2);
          
          this.acc = new v2 (0,0);
          g.players[i].acc = new v2 (0,0);
          
          // this.ResetTouches();
          // g.players[i].ResetTouches();
          // this.
          // this.ResetMovement();
          this.collisionsEnabled[i] = false;
          g.players[i].collisionsEnabled[this.index] = false;
        }
      } else {
        this.collisionsEnabled[i] = true;
      }
    }
  }
}

Player.prototype.CollectPoints = function(){
  if (Math.sqrt(Math.pow(env.zonePos.x - this.x, 2) + Math.pow(env.zonePos.y - this.y, 2)) < env.zoneSize/2){
      this.score++;      
      // this extra draw call was so last minute, I had to shove it in here. Bad design, shouldve been in glados.js
      ctx.drawImage(glados.pt, env.offsetX + this.displayX + this.s * 0.3, env.offsetY + this.displayY - this.s, this.s * 0.5, this.s * 0.5);
      // my dev alpha has issues with the ctx.arc function, dunno why but adding user agent sniffing (tut tut, i know)
      if (navigator.userAgent.indexOf("BB10") < 0) {
        ctx.beginPath();
        ctx.strokeStyle = "#18ff0b";
        ctx.lineWidth = c.width/window.innerWidth * 6;
        ctx.arc(env.offsetX + this.x, env.offsetY + this.y, this.s * 0.55, (-90 + rules.Time * 10) / 180 * Math.PI, (rules.Time * 10) / 180 * Math.PI, true);
        ctx.stroke();
        ctx.closePath();
      }
  }
  if (env.starbugShow){
    if (Math.sqrt(Math.pow(env.starbugPos.x - this.x, 2) + Math.pow(env.starbugPos.y - this.y, 2)) < env.starbugSize/2){
      this.score+=50;
      env.HideStarbug(); 
      // this extra draw call was so last minute, I had to shove it in here. Bad design, shouldve been in glados.js
      ctx.drawImage(glados.pt, env.offsetX + this.displayX + this.s * 0.3, env.offsetY + this.displayY - this.s, this.s * 0.5, this.s * 0.5);      
    }
  }  
}



