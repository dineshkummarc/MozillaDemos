function checkTime(var i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

float oldSec, newSec, sec;
PImage minn, hrrs, ssec, x1, x2, x3, x4, dial;

void setup() {
  size(700, 700);
  noStroke();
  background(#f1f1f1);


  minn = loadImage("min.png");
  hrrs = loadImage("hrs.png");
  ssec = loadImage("sec.png");
  x1 = loadImage("xtra1.png");
  x2 = loadImage("xtra2.png");
  x3 = loadImage("xtra3.png");
  x4 = loadImage("xtra4.png");
  dial = loadImage("dial.png");
  dial.resize(width, height);
}
void draw() {
  /*  resetMatrix();
   fill(#ffffff,20);
   rect(0,0,width,height);
   fill(#515151);
   smooth(); */

  background(#292929);

  // background(#ffffff);
  fill(#515151);

  resetMatrix();
  image(dial, 0, 0);
  textSize(32);
  text("JUBIN C JOSE", width/2-90, 3*height/4+50); 
  translate(width/2-70, height/2-150);
  image(x1, 0, 0);

 var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    String tym = h + ":" + m + ":" + s;
  //tym = "00:00:00";
  String[] splits = tym.split(":");
 // println(tym);

  //Hours dial
  resetMatrix();
  float hrs = radians(((splits[0])*30)-67);
  translate(width/2, height/2);
  rotate(hrs);
  translate(0, -100);
  image(hrrs, 0, 0);
  rect(0, 0, 230, 5);

  resetMatrix();
  translate(width/2-200, height/2-100);
  image(x4, 0, 0);

  resetMatrix();
  translate(width/2-70, height/2-150);
  image(x2, 0, 0);

  //minutes dial
  resetMatrix();
  float min = radians(((splits[1])*6)-79);
  translate(width/2, height/2);
  rotate(min);
  translate(-20, -50);
  image(minn, 0, 0);
  rect(0, 0, 250, 5);


  //Seconds Dial
  resetMatrix();
  newSec = radians(((splits[2])*6)-79);
   sec += .00175;
  if (newSec != oldSec) {
    oldSec = newSec;
    sec = oldSec;
   // println("ifff");
  }
  translate(width/2, height/2);
  rotate(sec);
  translate(-60, -50);
  image(ssec, 0, 0);
  rect(13, 0, 300, 5);


  resetMatrix();
  translate(width/2-100, height/2-100);
  image(x3, 0, 0);
  
}


