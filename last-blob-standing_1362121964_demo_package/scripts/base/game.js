var c = document.getElementById('gameCanvas');
var ctx = c.getContext('2d');

  var rules = new Rules();
  var env = new Environment(6); 
  
  var glados;	

  function Setup(){ 
    env = new Environment(6);   
    glados = new Glados(4); 	 
    
    env.Setup();
    StartNewGame();		
    BeginLoop();
  }
  
  function BeginLoop(){
  
    update();
  }

  function StartNewGame(){		
    // this.rules = new Rules();
    env = new Environment(6);
    env.Setup();
    
    glados = new Glados(4); 	
  }

  function RestartGame () {
    StartNewGame();
  }
    
  function UpdateGame(){
    rules.Update();
  }

  function DrawGame(){
    ctx.font = 30 * (c.width/540) + 'px Arial';
    ctx.fillStyle = "#fff";
    
    env.Draw();
    glados.Draw(env);    
  }

  function draw(){	
    c.width = c.width;
    
    if(rules.hasGameStarted){
      DrawGame();
      rules.ScoresText("SWIPE");
    } else {
      if (rules.inScores){
        rules.DrawScores();
      } else {
        rules.DrawMenu();
      }
    }
  }

  function update(){
    UpdateGame();	
    draw();
    requestAnimationFrame(update);				
  }


