PImage strip;
int RM,GM,BM,ST,RM1,GM1,BM1,px,py;
void setup(){
  size(450,100);
  //setSize();
  px = px1 = width/2-135;
  px1 += 20;
  RM = GM = BM = ST = height;
  RM1 = GM1 = BM1 = height/2;
  strip = loadImage("strip.jpg");
  noStroke();
  background(0 );
}
void draw(){
//if(rez) setSize();
  image(strip,width/2-strip.width/2,height/2-strip.height/2);
	fill(#000000,150);
	rect(0,0,width,height);

  //Red Colorize
  fill(#935555);
  rect(px+10,10,30,height-10);
  fill(#520103);
  rect(px+10,RM,30,height-10);
  //Green Colorize
  fill(#799654);
  rect(px+45,10,30,height-10);
  fill(#325201);
  rect(px+45,GM,30,height-10);
  //Blue Colorize
  fill(#498590);
  rect(px+80,10,30,height-10);
  fill(#014052);
  rect(px+80,BM,30,height-10);
   //Strength Colorize
  fill(#cab55f);
  rect(px+120,10,10,height-10);
  fill(#967906);
  rect(px+120,ST,10,height-10);
  
  //Red Channel
  fill(#935555);
  rect(px1+150,10,30,height-10);
  fill(#520103);
  rect(px1+150,RM1,30,height-10);
  //Green Channel
  fill(#799654);
  rect(px1+185,10,30,height-10);
  fill(#325201);
  rect(px1+185,GM1,30,height-10);
  //Blue Channel
  fill(#498590);
  rect(px1+220,10,30,height-10);
  fill(#014052);
  rect(px1+220,BM1,30,height-10);
  
  fill(#ffffff);
  text("Colorize",px+55,height-3);
  text("Channels",px1+150+25,height-3);
  }
void mouseDragged(){
  //println(RMV,GMV,BMV,STV,RM1V,GM1V,BM1V);
  if(mouseX>px+10 && mouseX< px+40 && mouseY > 9){
    RM = mouseY;
    if(RM > height){
      RM = height;   
    }
  }
  if(mouseX>px+45 && mouseX< px+75 && mouseY > 9){
    GM = mouseY;
    if(GM > height){
      GM = height;   
    }
  }
  if(mouseX>px+80 && mouseX< px+110 && mouseY > 9){
    BM = mouseY;
    if(BM > height){
      BM = height;   
    }
  }
  if(mouseX>px+120 && mouseX< px+130 && mouseY > 9){
    ST = mouseY;
    if(ST > height){
      ST = height;   
    }
  }
  
  if(mouseX>px1+150 && mouseX< px1+180 && mouseY > 9){
    RM1 = mouseY;
    if(RM1 > height){
      RM1 = height;   
    }
  }
  if(mouseX>px1+185 && mouseX< px1+215 && mouseY > 9){
    GM1 = mouseY;
    if(GM1 > height){
      GM1 = height;   
    }
  }
  if(mouseX>px1+220 && mouseX< px1+250 && mouseY > 9){
    BM1 = mouseY;
    if(BM1 > height){
      BM1 = height;   
    }
  }
}
void mouseReleased(){
	RMV = RM;GMV = GM;BMV = BM;STV = ST;
	RM1V = RM1;GM1V = GM1;BM1V = BM1;
	
	RMV = (int)(((height - RMV)/height)*255);
	GMV = (int)(((height - GMV)/height)*255);
	BMV = (int)(((height - BMV)/height)*255);
	STV = (int)(((height - STV)/height)*255);
	//println(RMV);
	
	RM1V = (int)(((height - RM1V)/height)*100 - 50);
	GM1V = (int)(((height - GM1V)/height)*100 - 50);
	BM1V = (int)(((height - BM1V)/height)*100 - 50);
	
	renderStep2();
}
void setSize(){
	rez = 0;
	var height = $("#canWrapper").height();
	var width = $("#canWrapper").width();
	size(width,height);
}
