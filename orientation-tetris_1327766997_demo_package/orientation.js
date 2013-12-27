/*
 * PROJECT:  JsTetris Oriented
 * VERSION:  0.1
 * LICENSE:  MIT
 * AUTHOR:  (c) 2012 Nestor Alvaro
 * LINK:  http://www.nestoralvaro.com
 *
 */

// Define some base variables
var baseLR,
	baseFB;

// This are the strings that the mozilla browsers would provide when asking for
var mozBrowsers = ["Firefox", "Fennec"];
// To see if a browser belongs to Moz developments
var isMozFamily = false;
var ua = navigator.userAgent;
for (var i = 0; i < mozBrowsers.length; i++) {
	if (ua.indexOf(mozBrowsers[i]) > 0) {
		isMozFamily = true;
		break;
	}
}

function mozOrientationHandler(eventData) {
	var acceleration = eventData.accelerationIncludingGravity;
    // x is the left-to-right tilt from -1 to +1, so we need to convert to degrees
    var tiltLR = acceleration.x * 90;

    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
    // We also need to invert the value so tilting the device towards us (forward) 
    // results in a positive value. 
    var tiltFB = acceleration.y * -90;

    // MozOrientation does not provide this data
    var dir = null;

    // z is the vertical acceleration of the device
    var motUD = acceleration.z;
    
    // call our orientation event handler
	deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
}
  
// This code is based on the one exposed on http://www.html5rocks.com/en/tutorials/device/orientation/
if (window.DeviceOrientationEvent) {
//	console.log("DeviceOrientation is supported");
	// Listen for the deviceorientation event and handle DeviceOrientationEvent object
	window.addEventListener('deviceorientation', function(eventData) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = eventData.gamma;

    // beta is the front-to-back tilt in degrees, where front is positive
    var tiltFB = eventData.beta;

    // alpha is the compass direction the device is facing in degrees
    var dir = eventData.alpha

    // deviceorientation does not provide this data
    var motUD = null;

    // call our orientation event handler
	deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
  }, false);	
} else if (window.OrientationEvent) {
//	console.log("MozOrientation is supported");
	// Listen for the MozOrientation event and handle OrientationData object
	window.addEventListener('MozOrientation', mozOrientationHandler, false);
} else {
	var message = "<b>You don't have Orientation recognition available on your device</b>.";
	message += "<br/>";
	message += "But you can enjoy the normal tetris game :-)";
	document.getElementById("firstMessage").innerHTML = message;
}

// One more check for modern mozilla browsers supporting "devicemotion" event
if (isMozFamily) {
	window.addEventListener('devicemotion', mozOrientationHandler, false);
}

// Global function to reset anything to start the game from scratch
function gblInit() {
	baseSet = false;
}

gblInit();

// This is the function to handle the previously detected orientation change
function deviceOrientationHandler(tiltLR, tiltFB, dir, motionUD) {
// console.log(tiltLR, tiltFB, dir, motionUD);
	var orientationLR = Math.round(tiltLR);
	var orientationFB = Math.round(tiltFB);
	var orientationDir = Math.round(dir);
	var orientationUD = motionUD;
	var minimumVariationLR = 10;
	var minimumVariationFB = 10;	
	var detectedLRChange = false;
	var detectedFBChange = false;
	// The first time we just set the base parameter
	if (!baseSet) {
		baseLR = orientationLR;
		baseFB = orientationFB;
		baseSet = true;
		return;
	}
	
	// Handle Pieces rotation only if there's a ">minimumVariation" difference (absolute value)
	if (Math.abs(orientationLR - baseLR) > minimumVariationLR) {
		// Update the value
		previousLR = orientationLR;
		detectedLRChange = true;
		// Handle LR Movement
		if (orientationLR > 0) {
			// I wish they could agree on what's left and right to avoid this hacks!!!
			if (isMozFamily) {
				tetris.left();
			} else {
				tetris.right();
			}			
		} else if (orientationLR < 0) {
			// I wish they could agree on what's left and right to avoid this hacks!!!		
			if (isMozFamily) {
				tetris.right();
			} else {
				tetris.left();
			}
		}
	}
	
	// Handle Pieces rotation only if there's a ">minimumVariation" difference (absolute value)
	if (Math.abs(orientationFB - baseFB) > minimumVariationFB) {
		// Update the value
		previousFB = orientationFB;
		detectedFBChange = true;
		if (orientationFB > 0) {
			tetris.down();
		} else if (orientationFB < 0) {
			tetris.up()
		}
	}
	
//	console.log(orientationLR, orientationFB, orientationDir, orientationUD);
//	console.log(detectedLRChange, detectedFBChange);
	if (detectedLRChange || detectedFBChange){
		// Apply the transform to the image
		document.getElementById("imgLogo").style.webkitTransform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
		document.getElementById("imgLogo").style.MozTransform = "rotate("+ tiltLR +"deg)";
		document.getElementById("imgLogo").style.transform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
	}
}

var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	
// All this code is to look for special devices ("iDevices")
function isIDevice() {
	var isiPhone = ua.match(/iPhone/i) != null;
	var isiPod = ua.match(/iPod/i) != null;
	var isiPad = ua.match(/iPad/i) != null;			
	return isiPod || isiPhone || isiPad		;
}
function doShowWarn() {
	var result = false;
	// Just do if it's not closed forever
	if (localStorage.closeForever !== "true") {
		if(isIDevice()) {
			result = true;
		}
	}
	return result;
}

// Opens the iDevice warning
function openIDeviceHelp(){
	document.getElementById('iDeviceWarn').style.display = "block";
}


// Closes the iDevice warning
function closeIDeviceHelp(){
	document.getElementById('iDeviceWarn').style.display = "none";
}

// Closes iDevices Warning message
function closeIDevicesWarn() {
	document.getElementById('iDeviceWarnText').style.display='none'
}

// Closes iDevices Warning message forever
function closeIDevicesWarnForever() {
	localStorage.closeForever = "true";
	closeIDevicesWarn();
}

// This is the ready function holding what needs to be executed at the begining
function whenReady() {
	if(doShowWarn()) {
		document.getElementById('iDeviceWarnText').style.display = "block";
	}
}

// This function shows the main "how-to" tutorial
function showHowTo() {
	document.getElementById('how_to').style.display = "block";
}

// This function closes the main "how-to" tutorial
function closeHowTo() {
	document.getElementById('how_to').style.display = "none";
}

// This is invoked once the document is ready
document.addEventListener('DOMContentLoaded', whenReady, false);
