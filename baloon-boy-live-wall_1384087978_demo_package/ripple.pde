PImage kid,baloon,part;
float i = 20,inc = 0.03,theta = 0;
ParticleSystem ps;
void setup(){
  //frameRate(10);
  colorMode(RGB,255,255,255,100);
  ps = new ParticleSystem(1,new Vector3D(width/2,height/2,0));
  smooth();
  
  kid = loadImage("kid.jpg");
  baloon = loadImage("baloon.png");
  part = loadImage("part.png");
  kid.resize(kid.width/3,kid.height/3);
  baloon.resize(baloon.width/3,baloon.height/3);
  //size(kid.width,kid.height);
  size(1920,1920);
  background(0);
  text("Loading..!",600,200);
}
void draw(){
  if(action == 1){
  image(kid,0,0);
  translate(width/1.462,height/3+height/13);
  rotate(radians(i));
  image(baloon,-baloon.width,0);
  i = 27+sin(theta)*5;
  theta += .015;
  if(theta > 360) thete = 0;
  
  resetMatrix();
  translate(width+30,height);
  ps.run();
  ps.addParticle();
  }
}

class Particle {

  Vector3D loc;

  Vector3D vel;

  Vector3D acc;

  float r;

  float timer;



  // One constructor

  Particle(Vector3D a, Vector3D v, Vector3D l, float r_) {

    acc = a.copy();

    vel = v.copy();

    loc = l.copy();

    r = r_;

    timer = 1000;

  }

  

  // Another constructor (the one we are using here)

  Particle(Vector3D l) {

    acc = new Vector3D(random(-0.009,0),0,0);

    vel = new Vector3D(random(-.001,0),random(-1,0),0);

    loc = l.copy();

    r = 20.0;

    timer = 1000.0;

  }





  void run() {

    update();

    render();

  }



  // Method to update location

  void update() {

    vel.add(acc);

    loc.add(vel);

    timer -= 1.0;

  }



  // Method to display

  void render() {

    ellipseMode(CENTER);

    noStroke();

    fill(#f8af00,100);
	image(part,loc.x,loc.y);
   // ellipse(loc.x,loc.y,r,r);

  }

  

  // Is the particle still useful?

  boolean dead() {

    if (timer <= 0.0) {

      return true;

    } else {

      return false;

    }

  }

}





// A class to describe a group of Particles

// An ArrayList is used to manage the list of Particles 



class ParticleSystem {



  ArrayList particles;    // An arraylist for all the particles

  Vector3D origin;        // An origin point for where particles are birthed



  ParticleSystem(int num, Vector3D v) {

    particles = new ArrayList();              // Initialize the arraylist

    origin = v.copy();                        // Store the origin point

    for (int i = 0; i < num; i++) {

      particles.add(new Particle(origin));    // Add "num" amount of particles to the arraylist

    }

  }



  void run() {

    // Cycle through the ArrayList backwards b/c we are deleting

    for (int i = particles.size()-1; i >= 0; i--) {

      Particle p = (Particle) particles.get(i);

      p.run();

      if (p.dead()) {

        particles.remove(i);

      }

    }

  }



  void addParticle() {

    particles.add(new Particle(origin));

  }



  void addParticle(Particle p) {

    particles.add(p);

  }



  // A method to test if the particle system still has particles

  boolean dead() {

    if (particles.isEmpty()) {

      return true;

    } else {

      return false;

    }

  }



}







// Simple Vector3D Class 



public class Vector3D {

  public float x;

  public float y;

  public float z;



  Vector3D(float x_, float y_, float z_) {

    x = x_; y = y_; z = z_;

  }



  Vector3D(float x_, float y_) {

    x = x_; y = y_; z = 0f;

  }

  

  Vector3D() {

    x = 0f; y = 0f; z = 0f;

  }



  void setX(float x_) {

    x = x_;

  }



  void setY(float y_) {

    y = y_;

  }



  void setZ(float z_) {

    z = z_;

  }

  

  void setXY(float x_, float y_) {

    x = x_;

    y = y_;

  }

  

  void setXYZ(float x_, float y_, float z_) {

    x = x_;

    y = y_;

    z = z_;

  }



  void setXYZ(Vector3D v) {

    x = v.x;

    y = v.y;

    z = v.z;

  }

  public float magnitude() {

    return (float) Math.sqrt(x*x + y*y + z*z);

  }



  public Vector3D copy() {

    return new Vector3D(x,y,z);

  }



  public Vector3D copy(Vector3D v) {

    return new Vector3D(v.x, v.y,v.z);

  }

  

  public void add(Vector3D v) {

    x += v.x;

    y += v.y;

    z += v.z;

  }



  public void sub(Vector3D v) {

    x -= v.x;

    y -= v.y;

    z -= v.z;

  }



  public void mult(float n) {

    x *= n;

    y *= n;

    z *= n;

  }



  public void div(float n) {

    x /= n;

    y /= n;

    z /= n;

  }



  public void normalize() {

    float m = magnitude();

    if (m > 0) {

       div(m);

    }

  }



  public void limit(float max) {

    if (magnitude() > max) {

      normalize();

      mult(max);

    }

  }



  public float heading2D() {

    float angle = (float) Math.atan2(-y, x);

    return -1*angle;

  }



  public Vector3D add(Vector3D v1, Vector3D v2) {

    Vector3D v = new Vector3D(v1.x + v2.x,v1.y + v2.y, v1.z + v2.z);

    return v;

  }



  public Vector3D sub(Vector3D v1, Vector3D v2) {

    Vector3D v = new Vector3D(v1.x - v2.x,v1.y - v2.y,v1.z - v2.z);

    return v;

  }



  public Vector3D div(Vector3D v1, float n) {

    Vector3D v = new Vector3D(v1.x/n,v1.y/n,v1.z/n);

    return v;

  }



  public Vector3D mult(Vector3D v1, float n) {

    Vector3D v = new Vector3D(v1.x*n,v1.y*n,v1.z*n);

    return v;

  }



  public float distance (Vector3D v1, Vector3D v2) {

    float dx = v1.x - v2.x;

    float dy = v1.y - v2.y;

    float dz = v1.z - v2.z;

    return (float) Math.sqrt(dx*dx + dy*dy + dz*dz);

  }



}
