//definicija GLOBAL promenjivih
var materials = []; var materials_01 = []; 
 
var cube1;
var cubeGeo ;
var cube, plane;
var EVERYOBJ=[];
var EVENT_COLLIDE_OBJ=[];

//##################################################################################//##################################################################################
//##################################################################################//##################################################################################
//##################################################################################//##################################################################################
/*
cube.js   --> by Nikola Lukic Nidza 2012 zlatnaspirala@gmail.com
*/
//##################################################################################//##################################################################################
//##################################################################################//##################################################################################
//##################################################################################//##################################################################################


//GENERAL MATERIAL 

var GLOBAL_MATERIAL = [
					new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true, side: THREE.DoubleSide } ),
					new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.AdditiveBlending, side: THREE.DoubleSide } ),
					new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, side: THREE.DoubleSide, overdraw: true } ),
					new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.SmoothShading, overdraw: true } ),
					new THREE.MeshDepthMaterial( { overdraw: true } ),
					new THREE.MeshNormalMaterial( { overdraw: true } ),
					new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/ash_uvgrid01.jpg' ) } ),
					new THREE.MeshBasicMaterial( { envMap: THREE.ImageUtils.loadTexture( 'textures/ash_uvgrid01.jpg', new THREE.SphericalReflectionMapping() ) } ),
				//	new THREE.MeshLambertMaterial( { map: texture, transparent: true } ) ,
					new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.FlatShading } ) ,
					new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ) ,
					new THREE.MeshNormalMaterial( ) ,
					new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, blending: THREE.AdditiveBlending } ) ,
					new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.SubtractiveBlending } ) ,
					new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.SmoothShading } ) ,
				//	new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading, map: texture, transparent: true } ) ,
					new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading } ) ,
					new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true }  ),
					new THREE.MeshLambertMaterial( { color: 0x666666, emissive: 0xff0000, ambient: 0x000000, shading: THREE.SmoothShading } ) ,
					new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0xff0000, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true } ) 
				//	new THREE.MeshBasicMaterial( { map: texture, transparent: true } )  					
				];


 

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//   KLASIK CUBE
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


function CUBE (imageIndex,a,b,c,d,e,f,x,y,z)  {  // a - sirina // B - visina // C Dubina 

materials = [];
for (var i=1;i<8; i++){
var img = new Image();
img.src = 'textures/cube1/' + i + '.png';
var tex = new THREE.Texture(img);
img.tex = tex;
img.onload = function() {
this.tex.needsUpdate = true;
};
var mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex});
materials.push(mat); 
}

GLOBAL_OBJECT_INDEX++;

cubeGeo = new THREE.CubeGeometry( 200, 200, 200 );
window["objekat" + GLOBAL_OBJECT_INDEX] = new THREE.Mesh( cubeGeo, materials[imageIndex] );
window["objekat" + GLOBAL_OBJECT_INDEX].position.y = y;
window["objekat" + GLOBAL_OBJECT_INDEX].position.z = z;
window["objekat" + GLOBAL_OBJECT_INDEX].position.x = x;
window["objekat" + GLOBAL_OBJECT_INDEX].scale.x = d;
window["objekat" + GLOBAL_OBJECT_INDEX].scale.y = e;
window["objekat" + GLOBAL_OBJECT_INDEX].scale.z = f;

scene.add(window["objekat" + GLOBAL_OBJECT_INDEX]);
EVERYOBJ.push(window["objekat" + GLOBAL_OBJECT_INDEX]);

}


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//   KLASIK CUBE 1-6 img index
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

function CUBE_TEXTURE6(x,y,z) {

//

materials_01 = [];
for (var i=1;i<7; i++){
var img = new Image();
img.src = 'textures/cube1/' + i + '.png';
var tex = new THREE.Texture(img);
img.tex = tex;
img.onload = function() {
this.tex.needsUpdate = true;
};
var mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex});
materials_01.push(mat); 
}



//
 GLOBAL_OBJECT_INDEX++;

window["objekat" + GLOBAL_OBJECT_INDEX] = new THREE.Mesh( new THREE.CubeGeometry( 111, 111, 111, 1, 1, 1, materials_01 ), new THREE.MeshFaceMaterial() );
window["objekat" + GLOBAL_OBJECT_INDEX].position.y = y;
window["objekat" + GLOBAL_OBJECT_INDEX].position.z = z
window["objekat" + GLOBAL_OBJECT_INDEX].position.x = x;
scene.add(window["objekat" + GLOBAL_OBJECT_INDEX]);
EVERYOBJ.push(window["objekat" + GLOBAL_OBJECT_INDEX]);


}

 



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//   PLANE
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

 

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//   PLANE
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$







////////////////////////////////////////////
////////////////////////////////////////////
//View 3d obj
////////////////////////////////////////////
////////////////////////////////////////////  


////////////////////////////////////////////
//OBJ LOADER 1
////////////////////////////////////////////
function OBJPREVIEW(loadOBJ,textureLOC,Zloc,Yloc,Xloc,rotX,rotY,rotZ,SCALEOBJX,SCALEOBJY,SCALEOBJZ,CollideYesOrNo){		

var texture2 = new THREE.Texture();

var loader = new THREE.ImageLoader();
loader.addEventListener( 'load', function ( event ) {

texture2.image = event.content;
texture2.needsUpdate = true;

} );
loader.load( textureLOC );

// model

var loader = new THREE.OBJLoader();
loader.addEventListener( 'load', function ( event ) {

var object = event.content;

for ( var i = 0, l = object.children.length; i < l; i ++ ) {

object.children[ i ].material.map = texture2;

}
object.position.y =   Yloc;
object.position.z =   Zloc;
object.position.x =   Xloc;
object.rotation.y = rotY;
object.rotation.z = rotZ;
object.rotation.x = rotX;
object.name = "object";
//light.target = object;
//object.add(light);
object.scale.set( SCALEOBJX,SCALEOBJY,SCALEOBJZ );
GLOBAL_OBJECT_INDEX++;
window["objekat" + GLOBAL_OBJECT_INDEX] =object;
scene.add( window["objekat" + GLOBAL_OBJECT_INDEX ]);

if (typeof CollideYesOrNo === "undefined") {
EVERYOBJ.push(window["objekat" + GLOBAL_OBJECT_INDEX]);
}else{
if (CollideYesOrNo == "YES"){
EVERYOBJ.push(window["objekat" + GLOBAL_OBJECT_INDEX]);
}

}
//alert(GLOBAL_OBJECT_INDEX);

});
loader.load( loadOBJ );  

}

////////////////////////////////////////////
//OBJ LOADER 1
////////////////////////////////////////////

function LOADER1(JSPATH , TEXTURE , x,y,z,sx,sy,sz){
loader = new THREE.JSONLoader();
loader.load( JSPATH, function ( geometry ) {
var mat_mesh = new THREE.MeshPhongMaterial( {
map: THREE.ImageUtils.loadTexture( TEXTURE ),
color: 0xFFFFFF,
ambient: 0xCCCCCC,
specular: 0xFFFFFF,
shininess: 15
});
var mesh = new THREE.Mesh( geometry, mat_mesh );

mesh.scale.x = sx;
mesh.scale.y = sy;
mesh.scale.z = sz;

mesh.position.x = x;
mesh.position.y = y;
mesh.position.z = z;

scene.add(mesh);


});
}

////////////////////////////////////////////
//OBJ LOADER 1
////////////////////////////////////////////

function LOADER2(JSPATH){
var loader1 = new THREE.JSONLoader(),

callbackFemale = function( geometry ) { createScene( geometry, -80, FLOOR, 50, 0 ) };


loader1.load( JSPATH, callbackFemale );


function createScene( geometry, x, y, z, b ) {

GLOBAL_OBJECT_INDEX++;

window["objekat" + GLOBAL_OBJECT_INDEX] = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
window["objekat" + GLOBAL_OBJECT_INDEX].position.set( x, y, z );
window["objekat" + GLOBAL_OBJECT_INDEX].scale.set( 31,  31, 31 );
scene.add( window["objekat" + GLOBAL_OBJECT_INDEX] );

createMaterialsPalette( geometry.materials, 100, b );

}

}
////////////////////////////////////////////
////////////////////////////////////////////
function SPHERE_(x,y,z,material_,sx,sy,sz,texture_){
//
var texture = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.addEventListener( 'load', function ( event ) {
texture.image = event.content;
texture.needsUpdate = true;
} );
loader.load( texture_ );
//
	var geometry_lopta = new THREE.SphereGeometry( 100, 14, 7, false );
	
	geometry_lopta.materials = [
					new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true, side: THREE.DoubleSide } ),
					new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.AdditiveBlending, side: THREE.DoubleSide } ),
					new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, side: THREE.DoubleSide, overdraw: true } ),
					new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.SmoothShading, overdraw: true } ),
					new THREE.MeshDepthMaterial( { overdraw: true } ),
					new THREE.MeshNormalMaterial( { overdraw: true } ),
					new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/ash_uvgrid01.jpg' ) } ),
					new THREE.MeshBasicMaterial( { envMap: THREE.ImageUtils.loadTexture( 'textures/ash_uvgrid01.jpg', new THREE.SphericalReflectionMapping() ) } ),
					new THREE.MeshLambertMaterial( { map: texture, transparent: true } ) ,
					new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.FlatShading } ) ,
					new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ) ,
					new THREE.MeshNormalMaterial( ) ,
					new THREE.MeshBasicMaterial( {  map: texture, transparent: true, blending: THREE.AdditiveBlending } ) ,
					new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.SubtractiveBlending } ) ,
					new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.SmoothShading } ) ,
					new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading, map: texture, transparent: true } ) ,
					new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading } ) ,
					new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true }  ),
					new THREE.MeshLambertMaterial( { color: 0x666666, emissive: 0xff0000, ambient: 0x000000, shading: THREE.SmoothShading } ) ,
					new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0xff0000, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true } ) ,
					new THREE.MeshBasicMaterial( { map: texture, transparent: true } )  					
				];
		GLOBAL_OBJECT_INDEX++; 
		window["objekat" + GLOBAL_OBJECT_INDEX] = new THREE.Mesh( geometry_lopta, geometry_lopta.materials[ material_ ] );			
		
			window["objekat" + GLOBAL_OBJECT_INDEX].position.x =x;
			window["objekat" + GLOBAL_OBJECT_INDEX].position.z =z;
			window["objekat" + GLOBAL_OBJECT_INDEX].position.y =y;
		
		    window["objekat" + GLOBAL_OBJECT_INDEX].scale.x =sx;
			window["objekat" + GLOBAL_OBJECT_INDEX].scale.z =sz;
			window["objekat" + GLOBAL_OBJECT_INDEX].scale.y =sy;
		
		 EVERYOBJ.push(window["objekat" + GLOBAL_OBJECT_INDEX]);
		scene.add( window["objekat" + GLOBAL_OBJECT_INDEX] );
		console.log(GLOBAL_OBJECT_INDEX+":GLOBAL_OBJECT_INDEX");
		
		 		
}

//////////////////
//////////////////
////////////////////////////////////////////
////////////////////////////////////////////



////////////////////////////////////////////
////////////////////////////////////////////
function CUBE_NO_COLLIDE(x,y,z,material_,sx,sy,sz){
//
var texture = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.addEventListener( 'load', function ( event ) {
texture.image = event.content;
texture.needsUpdate = true;
} );
loader.load( 'textures/ash_uvgrid01.jpg' );
//
	var geometry_lopta = new THREE.CubeGeometry( 100, 14, 7, false );
	
	geometry_lopta.materials = [
	
					new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true, side: THREE.DoubleSide } ),
					new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.AdditiveBlending, side: THREE.DoubleSide } ),
					new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, side: THREE.DoubleSide, overdraw: true } ),
					new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.SmoothShading, overdraw: true } ),
					new THREE.MeshDepthMaterial( { overdraw: true } ),
					new THREE.MeshNormalMaterial( { overdraw: true } ),
					new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'textures/ash_uvgrid01.jpg' ) } ),
					new THREE.MeshBasicMaterial( { envMap: THREE.ImageUtils.loadTexture( 'textures/ash_uvgrid01.jpg', new THREE.SphericalReflectionMapping() ) } ),
					new THREE.MeshLambertMaterial( { map: texture, transparent: true } ) ,
					new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.FlatShading } ) ,
					new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ) ,
					new THREE.MeshNormalMaterial( ) ,
					new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, blending: THREE.AdditiveBlending } ) ,
					new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.SubtractiveBlending } ) ,
					new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.SmoothShading } ) ,
					new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading, map: texture, transparent: true } ) ,
					new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading } ) ,
					new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true }  ),
					new THREE.MeshLambertMaterial( { color: 0x666666, emissive: 0xff0000, ambient: 0x000000, shading: THREE.SmoothShading } ) ,
					new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0xff0000, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true } ) ,
					new THREE.MeshBasicMaterial( { map: texture, transparent: true } )  					
				];

		var sphere = new THREE.Mesh( geometry_lopta, geometry_lopta.materials[ material_ ] );			
		
			sphere.position.x =x;
			sphere.position.z =z;
			sphere.position.y =y;
		
		    sphere.scale.x =sx;
			sphere.scale.z =sz;
			sphere.scale.y =sy;
		
		
		scene.add( sphere );
		
	 
}



////////////////////////////////////////////
////////////////////////////////////////////
//grid
/* 		
var size = 500, step = 20;

var geometry = new THREE.Geometry();
var material = new THREE.LineBasicMaterial( { color: 0xcccccc, opacity: 0.8 } );

for ( var i = - size; i <= size; i += step ) {

geometry.vertices.push( new THREE.Vector3( - size, - 4, i ) );
geometry.vertices.push( new THREE.Vector3(   size, - 4, i ) );

geometry.vertices.push( new THREE.Vector3( i, - 4, - size ) );
geometry.vertices.push( new THREE.Vector3( i, - 4,   size ) );

}

var line = new THREE.Line( geometry, material, THREE.LinePieces );
scene.add( line );
line.position.y=200;
line.position.x=100; */
////////////////////////////////////////////
////////////////////////////////////////////


function PLANE(x,y,z,sx,sy,sz,IMG) 
{
GLOBAL_OBJECT_INDEX++; 
		

			    var gt = THREE.ImageUtils.loadTexture( IMG );
				var gg = new THREE.PlaneGeometry( 200, 200 );
				var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt, perPixel: true,transparent: true} );

				window["objekat" + GLOBAL_OBJECT_INDEX] = new THREE.Mesh( gg, gm );
				window["objekat" + GLOBAL_OBJECT_INDEX].rotation.x = - Math.PI / 2;
				window["objekat" + GLOBAL_OBJECT_INDEX].material.map.repeat.set( 1, 1 );
				window["objekat" + GLOBAL_OBJECT_INDEX].material.map.wrapS = window["objekat" + GLOBAL_OBJECT_INDEX].material.map.wrapT = THREE.RepeatWrapping;
				window["objekat" + GLOBAL_OBJECT_INDEX].receiveShadow = true;

			window["objekat" + GLOBAL_OBJECT_INDEX].position.x =x;
			window["objekat" + GLOBAL_OBJECT_INDEX].position.z =z;
			window["objekat" + GLOBAL_OBJECT_INDEX].position.y =y;
		
		    window["objekat" + GLOBAL_OBJECT_INDEX].scale.x =sx;
			window["objekat" + GLOBAL_OBJECT_INDEX].scale.z =sz;
			window["objekat" + GLOBAL_OBJECT_INDEX].scale.y =sy;
				 EVERYOBJ.push(window["objekat" + GLOBAL_OBJECT_INDEX]);
				
				scene.add( window["objekat" + GLOBAL_OBJECT_INDEX] );

} 
function PLANE_NOCOLIDE(x,y,z,sx,sy,sz,IMG) 
{
GLOBAL_OBJECT_INDEX++; 
		

			    var gt = THREE.ImageUtils.loadTexture( IMG );
				var gg = new THREE.PlaneGeometry( 200, 200 );
				var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt, perPixel: true  ,transparent: true} );

				window["objekat" + GLOBAL_OBJECT_INDEX] = new THREE.Mesh( gg, gm );
				window["objekat" + GLOBAL_OBJECT_INDEX].rotation.x = - Math.PI / 2;
				window["objekat" + GLOBAL_OBJECT_INDEX].material.map.repeat.set( 1, 1 );
				window["objekat" + GLOBAL_OBJECT_INDEX].material.map.wrapS = window["objekat" + GLOBAL_OBJECT_INDEX].material.map.wrapT = THREE.RepeatWrapping;
				window["objekat" + GLOBAL_OBJECT_INDEX].receiveShadow = true;

			window["objekat" + GLOBAL_OBJECT_INDEX].position.x =x;
			window["objekat" + GLOBAL_OBJECT_INDEX].position.z =z;
			window["objekat" + GLOBAL_OBJECT_INDEX].position.y =y;
		
		    window["objekat" + GLOBAL_OBJECT_INDEX].scale.x =sx;
			window["objekat" + GLOBAL_OBJECT_INDEX].scale.z =sz;
			window["objekat" + GLOBAL_OBJECT_INDEX].scale.y =sy;
				console.log(GLOBAL_OBJECT_INDEX+">>>>>");
				
				scene.add( window["objekat" + GLOBAL_OBJECT_INDEX] );

} 


function CILINDER(x,y,z,vrh,sirina,visina,material){
/* GLOBAL_OBJECT_INDEX++; 
var armMaterial;

armMaterial = new THREE.MeshLambertMaterial({
 color: 0x8B5A00
});

window["objekat" + GLOBAL_OBJECT_INDEX] = new THREE.Mesh(new THREE.Cylinder(20, 0.3, 0.3, 10),armMaterial);
 

/* window["objekat" + GLOBAL_OBJECT_INDEX].rotation.x = 30;
window["objekat" + GLOBAL_OBJECT_INDEX].rotation.y = 10;
window["objekat" + GLOBAL_OBJECT_INDEX].translateX(8);
window["objekat" + GLOBAL_OBJECT_INDEX].translateZ(1);
window["objekat" + GLOBAL_OBJECT_INDEX].translateY(15); 

 

scene.add(window["objekat" + GLOBAL_OBJECT_INDEX]); */
   var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(vrh, sirina, visina, 50, 50, false), material );
      cylinder.overdraw = true;
	  cylinder.position.x = x;
	  cylinder.position.y = y;
	  cylinder.position.z = z;
	  
	  cylinder.rotation.y = -90;
	  
      scene.add(cylinder);

}

