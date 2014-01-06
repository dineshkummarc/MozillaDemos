var initAll = (function (){
    "use strict";
	var divMichael,
		divMichaelEnter,
		divEnteringMichaelWrapper,
		enteringIterations = 0,
		enteringCycles = 0,
		slidingIterations = 0,
		endWalk,
		startWalk,
		movementSprite = 0,
		enteringImages = [12, 47, 82, 117, 152, 187, 222],
		slidingImages = [0, 35, 70, 105, 140, 175, 210, 245],
		turnMove = 0,
		leanMove = 0,
		kickMove = 0,
		turningImages = [0, 42, 74, 106, 144, 174],
		leaningImages = [0, 42, 82, 120, 160, 160, 120, 82, 42],
		kickingImages = [132, 166, 200, 244, 304, 354, 414, 470, 528, 470, 414, 354, 304, 244, 200, 166, 132],
		kickingImagesWidths = [34, 34, 44, 60, 50, 60, 56, 58, 52, 58, 56, 60, 50, 60, 44, 34, 34];

	// Performs the sliding until the start position
	function slideToStart(){
		var currWidth = document.width;
		var correctWidth = Math.abs(parseInt(currWidth, 10)) > 0;
		if(!correctWidth) {
			currWidth = window.innerWidth;
		}
		// Only move if the position is higher than current position
		if ( (currWidth-320) > parseInt(divEnteringMichaelWrapper.style.marginLeft, 10)) {
			divMichaelEnter.style.background = 'url(./images/sprites.png) -' + slidingImages[movementSprite % 8 ||0] + 'px -1076px no-repeat';
			movementSprite++;
			divEnteringMichaelWrapper.style.marginLeft = (enteringIterations + slidingIterations) * 5 + "px";
			slidingIterations++;
			setTimeout(slideToStart, 120);
		} else {
			movementSprite = 0;
			divMichaelEnter.style.display = 'none';
			divMichael.style.display = 'block';		
			doStopAudio(); // Stops the audio
			warnUser();
		}
	}
	
	// Warns the user to let him know that he can play with Michael now.
	function warnUser() {
		document.getElementById('intro_text').innerHTML = '<span style="text-align:center"><h1>Now, your turn!</h1> <h2>Perform the moonwalk by <br/> <span style="color:black;"> enlarging or shrinking the window.</span></h2></span>';
		document.getElementById('x_button').style.display = "block";
	}
	
	// performs the actual movement
	function doMoveToMoon() {
		divMichaelEnter.style.background = 'url(./images/sprites.png) -' + enteringImages[movementSprite % 7 || 0] + 'px -150px no-repeat';
		movementSprite++;
		startWalk = startWalk + 3;
		divEnteringMichaelWrapper.style.marginLeft = startWalk + "px";
		if (startWalk < endWalk) {
			setTimeout(doMoveToMoon, 150);
		} else {
			movementSprite = 0;
			turnMove = 0;
			turnFinale();		
		}
	}
		
	// Animation function (calls many times "render" function)
	function walk() {	
		// Chech if it's time to end the animation		
		if (enteringIterations > 25) {
			endWalk = enteringIterations * 5;
			startWalk = enteringIterations * 3;
			doMoveToMoon();
			movementSprite = 0;
			return false; // To end the iterations
		}
		// In case I'm on the half of the iterations perform the turn & extra movements
		if (enteringIterations === 12) {
			// turn();
			lean();
			movementSprite = 0;
			return false; // To end the iterations
		}		
		
		enteringIterations++;
		
		divMichaelEnter.style.background = 'url(./images/sprites.png) -' + enteringImages[movementSprite % 7 || 0] + 'px -150px no-repeat';
		movementSprite++;
		divEnteringMichaelWrapper.style.marginLeft = enteringIterations * 3 + "px";
		setTimeout(walk, 150);
	}
/*
	// Performs the turn
	function turn() {	
		if (turnMove < (turningImages.length * 2)) {
			divMichaelEnter.style.background = 'url(./images/sprites.png) -' + turningImages[ turnMove % 5 ] + 'px -468px no-repeat';
			divEnteringMichaelWrapper.style.marginLeft = enteringIterations * 3 + "px";
			turnMove++;
			setTimeout(turn, 80);	
		} else {
			enteringIterations++;
			lean();
		}
	}
*/	
	// Performs the lean
	function lean() {	
		if (leanMove < (leaningImages.length)) {
			divMichaelEnter.style.background = 'url(./images/sprites.png) -' + leaningImages[ leanMove ] + 'px -550px no-repeat';
			divEnteringMichaelWrapper.style.marginLeft = enteringIterations * 3 + "px";
			leanMove++;
			setTimeout(lean, 230);	
		} else {
			enteringIterations++;
			kick();
		}
	}

	// Performs the kick
	function kick() {	
		if (kickMove < (kickingImages.length - 1)) {
			divMichaelEnter.style.width = kickingImagesWidths [kickMove] + "px";			
			divMichaelEnter.style.background = 'url(./images/sprites.png) -' + kickingImages[ kickMove ] + 'px -315px no-repeat';
			divEnteringMichaelWrapper.style.marginLeft = enteringIterations * 3 + "px";
			kickMove++;
			setTimeout(kick, 100);	
		} else {
			divMichaelEnter.style.width = ""; // Reset the width			
			enteringIterations++;
			walk();
		}
	}	
	
	// Performs the final turn
	function turnFinale() {	
		if (turnMove < (turningImages.length * 1.5)) {
			divMichaelEnter.style.background = 'url(./images/sprites.png) -' + turningImages[ turnMove % 5 ] + 'px -468px no-repeat';
//			divEnteringMichaelWrapper.style.marginLeft = enteringIterations * 3 + "px";
			turnMove++;
			setTimeout(turnFinale, 80);	
		} else {
			enteringIterations++;
			// Start the moonwalk
			slideToStart();			
		}
	}	
	// Starts moving the entering  MJ in the window
	function startMove() {
		divMichaelEnter.style.display = 'block';
		walk();
	}

	// Start everything at the end
	return function() {
		// If javascript is enabled we hide the div
		divMichael = document.getElementById('dancingMichael');
		divMichaelEnter = document.getElementById('dancingMichaelEnter');
		divEnteringMichaelWrapper = document.getElementById('enteringMichaelWrapper');	
		divMichael.style.display = 'none';
		// Starts the audio
		audio0.play();
		// Starts all the choreography
		startMove();
	};
})();

/* This is the audio part */
var audio0 = document.getElementById('audio_0'),
	audio1 = document.getElementById('audio_1'),
	audio2 = document.getElementById('audio_2'),
	audio_stop = document.getElementById('audio_stop'),
	audio_start = document.getElementById('audio_start'),
	loopTime = 1.607040;
// Basic setup	
audio0.addEventListener('play', function(){
	// Prepate the other audios starting points
	audio0.volume=0.6;
	audio1.currentTime = loopTime;
	audio2.currentTime = loopTime;
}, false);
// Bind the events to play the audio correctly and then pass the control to the "loop"
audio0.addEventListener('ended', function(){
	audio0.style.display = "none"; // Hide it after playing
	this.currentTime = 0;
	this.pause();
	audio1.volume=0.6;	
	audio1.play();
}, false);
// I use 2 more audio elements that are almost the same to create the "loop" effect (when one starts the other starts)
// This trick was found at: http://forestmist.org/2010/04/html5-audio-loops/
audio1.addEventListener('ended', function(){
	this.currentTime = loopTime; // I don't want to start from the begining
	this.pause();
	audio2.volume=0.6;
	audio2.play();
}, false);
audio2.addEventListener('ended', function(){
	this.currentTime = loopTime; // I don't want to start from the begining
	this.pause();
	audio1.play();
}, false);
// To stop playing the audio
audio_stop.addEventListener('click', doStopAudio, false);
// Actually stops the audio (it's invoked from more than one place)
function doStopAudio() {
	audio_stop.style.display = "none";
	audio_start.style.display = "block";
	audio0.pause();
	audio0.currentTime = 0;
	audio1.pause();
	audio1.currentTime = loopTime;	
	audio2.pause();
	audio2.currentTime = loopTime;
}
// To start playing the audio
audio_start.addEventListener('click', function(){
	audio_start.style.display = "none";
	audio_stop.style.display = "block";	
	audio0.currentTime = 0;
	audio1.currentTime = loopTime;
	audio2.currentTime = loopTime;		
	audio0.play();
}, false);


/* End of the audio part */

// To start everything
window.onload = initAll;