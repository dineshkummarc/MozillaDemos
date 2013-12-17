PImage pics,frame,roll,roll1;
int px = 0,click = 0;
void setup(){
  size(450,99);
  pics = loadImage("selectorStrip.jpg");
  frame = loadImage("frame.png");
  roll = loadImage("roll.png");
  roll1 = loadImage("roll1.png");
}
void draw(){
  background(0);
  fill(#ffffff);
  text("No Effects !",width/2-30,height/2+5);
  image(pics,px+300,0);
  if(click == 2 && px < 0){
  px+=2;
  }
  if(click == 1 && px > (pics.width)*-1){
  px-=2;
  }
  
  if(px%150 == 0){
    click = 0;
  }
  //println((px*-1)/150);
  noStroke();
  //rect(width/2-74,0,150,height);
  fill(#282828,180);
  rect(0,0,150,height);
  rect(width/2+75,0,150,height);
  image(roll,300,0);
  image(roll1,-10,0);
  image(frame,147,0);
}
void mouseReleased(){
  if(dist(mouseX,mouseY,35,50) < 35){
    click = 2;
  }
  if(dist(mouseX,mouseY,416,50) < 35){
    click = 1;
  }
  if(mouseX > 147 && mouseX < 300){
  startEffect(((px*-1)/150));
  }
}
