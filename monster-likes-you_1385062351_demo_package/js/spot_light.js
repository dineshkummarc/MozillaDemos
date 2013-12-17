//light 2 
function SPOT_LIGHT_SIMPLY(){
var spotlight = new THREE.SpotLight(0xffff00);
spotlight.position.set(0 , 520 , 0);
spotlight.shadowCameraVisible = false;
spotlight.shadowDarkness = 0.95;
spotlight.intensity = 2;
// must enable shadow casting ability for the light
spotlight.castShadow = false;
scene.add(spotlight);
}

function SPOT_LIGHT(x,y,z,shadowCameraVisible,color){
var spotlight = new THREE.SpotLight(color);
spotlight.position.set(x , y , z);
spotlight.shadowCameraVisible = shadowCameraVisible;
spotlight.shadowDarkness = 0.95;
spotlight.intensity = 2;
// must enable shadow casting ability for the light
spotlight.castShadow = false;
scene.add(spotlight);
}
function SPOT_LIGHT_MAP(x,y,z,color){
var spotlight = new THREE.SpotLight(color);
spotlight.position.set(x , y , z);
spotlight.shadowCameraVisible = false;
spotlight.shadowDarkness = 0.15;
spotlight.intensity = 1;
spotlight.castShadow = true;
scene.add(spotlight);
}