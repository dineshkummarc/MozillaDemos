// JavaScript Document
var carGame = {
}
var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
$(function() {
carGame.world = createWorld();
console.log("The world is created. ",carGame.world);
// get the reference of the context
canvas = document.getElementById('game');
ctx = canvas.getContext('2d');
canvasWidth = parseInt(canvas.width);
canvasHeight = parseInt(canvas.height);
});
function createWorld() {
// set the size of the world
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-4000, -4000);
worldAABB.maxVertex.Set(4000, 4000);
// Define the gravity
var gravity = new b2Vec2(0, 300);
// set to ignore sleeping object
var doSleep = false;
// finally create the world with the size, gravityand sleep object parameter.
var world = new b2World(worldAABB, gravity, doSleep);
return world;
}