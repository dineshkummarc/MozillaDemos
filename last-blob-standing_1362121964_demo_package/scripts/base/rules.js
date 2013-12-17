function Rules(){
  this.Time = -1;
  this.MaxTime = 1800;
  this.menuImg = new Image();
  this.menuImg.src = "./assets/tiles/menubg.png";
  this.scoresImg = new Image();
  this.scoresImg.src = "./assets/tiles/scoresbg.png";
  this.hasGameStarted = false;
  this.hasGameJUSTStarted = false;
  this.inScores = false;
  this.scoreY = -c.height;
  this.TimeToHold = 30;
}

Rules.prototype.RestartGame = function(){
  // if (!this.hasGameStarted && !this.hasGameJUSTStarted) {
    this.Time = this.MaxTime;
    this.hasGameStarted = true;
    this.hasGameJUSTStarted = true;
    RestartGame();
    this.scoreY = -c.height;
  // }
}

Rules.prototype.EndGame = function(){
  this.Time = -1;
  this.hasGameStarted = false;
  this.inScores = true;
  hasStartedTouching = false;
  startTouchTime = -1;
}

Rules.prototype.ExitToMenu = function(){
  this.inScores = false;
  this.hasGameStarted = false;
  hasStartedTouching = false;
  startTouchTime = -1;
  this.scoreY = c.height;
}

Rules.prototype.Update = function(){
  this.Time--;
  if (this.Time == 0){
    this.EndGame();
  }
  if (this.Time % (300 - parseInt(Math.random() * 50)) == 0 && this.Time < this.MaxTime - 100){
    env.SetNewZone();
  }
  
  if (this.Time % (700 - parseInt(Math.random() * 400)) == 0 && this.Time < this.MaxTime - 100 && !env.starbugShow){
    env.SpawnStarbug();
  }
}

Rules.prototype.DrawMenu = function(){
  ctx.drawImage(this.menuImg, 0, this.scoreY, c.width, c.height);
  this.scoreY += (0 - this.scoreY) * 0.2;
  
  this.ScoresText("HOLD");
  
  if (hasStartedTouching && startTouchTime >= 0 && startTouchTime < this.TimeToHold) {
    startTouchTime++;
    ctx.fillRect(0, 0, c.width, c.height * (startTouchTime / this.TimeToHold) /2);
    ctx.fillRect(0, c.height - c.height * (startTouchTime / this.TimeToHold)/2, c.width, c.height * (startTouchTime / this.TimeToHold));
  }
  if (startTouchTime >= this.TimeToHold) {
    this.RestartGame();
  }
}

Rules.prototype.DrawScores = function(){
  ctx.drawImage(this.scoresImg, 0, this.scoreY, c.width, c.height);
  this.scoreY += (0 - this.scoreY) * 0.1;
  
  this.ScoresText("  :-(");
  
  if (hasStartedTouching && startTouchTime >= 0 && startTouchTime < this.TimeToHold) {
    startTouchTime++;
    ctx.fillRect(0, 0, c.width * (startTouchTime / this.TimeToHold) /2, c.height);
    ctx.fillRect(c.width - c.width * (startTouchTime / this.TimeToHold) /2, 0, c.width * (startTouchTime / this.TimeToHold) /2, c.height);
  }
  if (startTouchTime >= this.TimeToHold) {
    this.ExitToMenu();
  }
}

Rules.prototype.ScoresText = function(text){
  ctx.fillStyle = "#fff";
  ctx.font = 30 * (c.width/540) + 'px Arial';
  if (glados.players[0].score > 0) {
    ctx.fillText(glados.players[0].score, c.width * 0.04, c.height * 0.21);
  } else {  
    ctx.fillText(text, c.width * 0.04, c.height * 0.21);
  }
  if (glados.players[1].score > 0) {
  ctx.fillText(glados.players[1].score, c.width * 0.84, c.height * 0.21); 
  } else {  
    ctx.fillText(text, c.width * 0.8, c.height * 0.21);
  }
  if (glados.players[2].score > 0) {
  ctx.fillText(glados.players[2].score, c.width * 0.04, c.height * 0.83);
  } else {  
    ctx.fillText(text, c.width * 0.04, c.height * 0.83);
  }
  if (glados.players[3].score > 0) {
  ctx.fillText(glados.players[3].score, c.width * 0.84, c.height * 0.83);
  } else {  
    ctx.fillText(text, c.width * 0.8, c.height * 0.83);
  }
}