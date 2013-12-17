// JavaScript Document
var carGame = {
	currentLevel: 0,
	score:0
};
var car;
var canvas;
carGame.levels = new Array();
carGame.levels[0] = [{"type":"car","x":50,"y":210},
{"type":"box","x":220, "y":270, "width":200,
"height":25, "rotation":0},
{"type":"box","x":460,"y":260,"width":65,"height":15,
"rotation":-10},
{"type":"box","x":560,"y":240,"width":60,"height":15,
"rotation":-20},

{"type":"box","x":900,"y":250,"width":70,"height":15,"rotation":0},
{"type":"win","x":970,"y":210,"width":15,"height":25,
"rotation":0}];

carGame.levels[1] = [{"type":"car","x":50,"y":210},
{"type":"box","x":220, "y":270, "width":200,
"height":25, "rotation":0},
{"type":"box","x":460,"y":260,"width":65,"height":15,
"rotation":-10},
{"type":"box","x":560,"y":240,"width":60,"height":15,
"rotation":-20},
{"type":"box","x":710,"y":210,"width":70,"height":15,
"rotation":0},
{"type":"box","x":900,"y":240,"width":80,"height":15,
"rotation":20},
{"type":"box","x":1000,"y":250,"width":70,"height":15,"rotation":0},
{"type":"win","x":1080,"y":210,"width":15,"height":25,
"rotation":0}];
carGame.levels[2] = [{"type":"car","x":50,"y":210},
{"type":"box","x":220, "y":270, "width":200,
"height":25, "rotation":0},
{"type":"box","x":460,"y":260,"width":65,"height":15,
"rotation":-10},
{"type":"box","x":620,"y":220,"width":80,"height":15,
"rotation":-20},
{"type":"box","x":800,"y":220,"width":80,"height":15,
"rotation":20},
{"type":"box","x":960,"y":250,"width":120,"height":15,"rotation":0},
{"type":"win","x":1080,"y":210,"width":15,"height":25,
"rotation":0}];


var ctx;
var canvasWidth;
var canvasHeight;
$(function() {
	level=0;
restart(level);
	
});
function restart(level)
{
	carGame.currentLevel=level;
	$("#level").text(carGame.currentLevel);
if(carGame.currentLevel<3)
{
	carGame.world = createWorld();
// get the reference of the context
canvas = document.getElementById('game');
ctx = canvas.getContext('2d');

canvasWidth = parseInt(canvas.width);
canvasHeight = parseInt(canvas.height);

for(var i=0;i<carGame.levels[level].length;i++)
{
	var obj=carGame.levels[level][i];
	if(obj.type=='car')
	{carGame.car=createCarArt(obj.x,obj.y);
	continue;
}
var groundBody = createGround(obj.x, obj.y,
obj.width, obj.height, obj.rotation);
if (obj.type == "win") {
carGame.gamewinWall = groundBody;
}
	
	
}
drawWorld(carGame.world, ctx);
step();
}
else
{carGame.world=createWorld();
alert("Your Cleared all the stage");

}
}



function createCarArt(x,y)
{
	var boxSd = new b2BoxDef();
boxSd.density = 1.0;
boxSd.friction = 1.5;
boxSd.restitution = .4;
boxSd.extents.Set(40, 20);
// the car body definition
var boxBd = new b2BodyDef();
boxBd.AddShape(boxSd);
boxBd.position.Set(x,y);
var carBody = carGame.world.CreateBody(boxBd);

var wheel1=createWheel(carGame.world,x-25,y+20);
var wheel2=createWheel(carGame.world,x+25,y+20);
var jointDef = new b2RevoluteJointDef();
jointDef.anchorPoint.Set(x-25, y+20);
jointDef.body1 = carBody;
jointDef.body2 = wheel1;
carGame.world.CreateJoint(jointDef);
var jointDef = new b2RevoluteJointDef();
jointDef.anchorPoint.Set(x+25, y+20);
jointDef.body1 = carBody;
jointDef.body2 = wheel2;
carGame.world.CreateJoint(jointDef);
return carBody;	 
}
function createWheel(world, x, y) {
// wheel circle definition
var ballSd = new b2CircleDef();
ballSd.density = 1.0;
ballSd.radius = 10;
ballSd.restitution = 0.1;
ballSd.friction = 4.3;var ballBd = new b2BodyDef();
ballBd.AddShape(ballSd);
ballBd.position.Set(x,y);
return carGame.world.CreateBody(ballBd);
}


function createWorld() {

var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-2000, -2000);
worldAABB.maxVertex.Set(2000, 2000);

var gravity = new b2Vec2(0, 300);
var doSleep = false;
var world = new b2World(worldAABB, gravity, doSleep);
return world;
}
function createGround(x,y,width,height,rotation) {
var groundSd = new b2BoxDef();
groundSd.extents.Set(width,height);
groundSd.restitution = 0.4;
var groundBd = new b2BodyDef();
groundBd.AddShape(groundSd);
groundBd.position.Set(x, y);
groundBd.rotation=rotation*Math.PI/180;
var body = carGame.world.CreateBody(groundBd);
return body;
}
function drawWorld(world, context) {
for (var b = world.m_bodyList; b != null; b = b.m_next) {
for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
drawShape(s, context);
}
}
}
function drawShape(shape, context) {
context.strokeStyle = '#003300';
context.beginPath();
switch (shape.m_type) {
case b2Shape.e_circleShape:
var circle = shape;
var pos = circle.m_position;
var r = circle.m_radius;
var segments = 16.0;
var theta = 0.0;
var dtheta = 2.0 * Math.PI / segments;
// draw circle
context.moveTo(pos.x + r, pos.y);
for (var i = 0; i < segments; i++) {
var d = new b2Vec2(r * Math.cos(theta),
r * Math.sin(theta));
var v = b2Math.AddVV(pos, d);
context.lineTo(v.x, v.y);
theta += dtheta;
}
context.lineTo(pos.x + r, pos.y);
// draw radius
context.moveTo(pos.x, pos.y);
var ax = circle.m_R.col1;
var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
context.lineTo(pos2.x, pos2.y);
break;
case b2Shape.e_polyShape:
var poly = shape;
var tV = b2Math.AddVV(poly.m_position,
b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
context.moveTo(tV.x, tV.y);
for (var i = 0; i < poly.m_vertexCount; i++) {
var v = b2Math.AddVV(poly.m_position,
b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
context.lineTo(v.x, v.y);
}
context.lineTo(tV.x, tV.y);
break;
}
context.stroke();
}


function step() {
carGame.world.Step(1.0/60, 1);
ctx.clearRect(0, 0, canvasWidth, canvasHeight);
drawWorld(carGame.world, ctx);
setTimeout(step, 10);
for(var cn=carGame.world.GetContactList();cn !=null;cn=cn.GetNext())
{
	var body1=cn.GetShape1().GetBody();
	var body2=cn.GetShape2().GetBody();
if((body1 == carGame.car && body2 == carGame.gamewinWall)||(body2 == carGame.car && body1 == carGame.gamewinWall))
{
carGame.score+=30;
$("#message").text(carGame.score);
	restart(carGame.currentLevel+1);
}

}

}
$(document).keydown(function(e) {
	
switch(e.keyCode) {
case 88:
var force = new b2Vec2(10000000, 0);
carGame.car.ApplyForce(force, carGame.car.GetCenterPosition());
break;
case 90: 
var force = new b2Vec2(-10000000, 0);
carGame.car.ApplyForce(force, carGame.car.GetCenterPosition());
break;
case 13:	
restart(carGame.currentLevel);
break;

	}
});