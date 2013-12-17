function v2(x,y){
  this.x = x;
  this.y = y;
}

var hasStartedTouching = false;
var startTouchTime = -1;

var t = new Array(); // tracker ID
for(i = 0; i < 4; i++){
  t[i] = -1;
}

var isTouching = new Array(); // tracker ID
for(i = 0; i < 4; i++){
  isTouching[i] = false;
}

var tmoves = new Array();
for(i = 0; i < 4; i++){
  tmoves[i] = new v2(0,0);
}

var tstart = new Array();
for(i = 0; i < 4; i++){
  tstart[i] = new v2(0,0);
}

function mouseDown(e) {
  // debugging the menus on desktop
  
  // hasStartedTouching = true;
  // startTouchTime = 0;
}

function onTouchStart(e) {
  e.preventDefault();
  hasStartedTouching = true;
  startTouchTime = 0;
  if (rules.hasGameStarted) {
    if (e.changedTouches[0].clientX < window.innerWidth * 0.45){    
      if (e.changedTouches[0].clientY < window.innerHeight * 0.45){
        // top left, player 0
        t[0] = e.changedTouches[0].identifier;
        tstart[0] = new v2(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        tmoves[0] = tstart[0];
        isTouching[0] = true;
      } else if (e.changedTouches[0].clientY > window.innerHeight * 0.55){
        // top left, player 2
        t[2] = e.changedTouches[0].identifier;
        tstart[2] = new v2(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        tmoves[2] = tstart[2];
        isTouching[2] = true;
      }    
    } else if (e.changedTouches[0].clientX > window.innerWidth * 0.55){
      if (e.changedTouches[0].clientY < window.innerHeight * 0.45){
        // top left, player 1
        t[1] = e.changedTouches[0].identifier;
        tstart[1] = new v2(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        tmoves[1] = tstart[1];
        isTouching[1] = true;
      } else if (e.changedTouches[0].clientY > window.innerHeight * 0.55){
        // top left, player 3
        t[3] = e.changedTouches[0].identifier;
        tstart[3] = new v2(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        tmoves[3] = tstart[3];
        isTouching[3] = true;
      }    
    }   
  }  
}

function onTouchMove(e) {
  // Prevent the browser from doing its default thing (scroll, zoom)
  e.preventDefault();
  if (rules.hasGameStarted) {
    var i = 0;
    while (t[i] != e.changedTouches[0].identifier && i < 5){
      i++;
    }    
    if (i < 4){
      tmoves[i] = new v2(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      isTouching[i] = true;
    }
  }
}

function onTouchEnd(e) {
  e.preventDefault(); 
  hasStartedTouching = false;
  startTouchTime = -1;
  if (rules.hasGameStarted) {
    var i = 0;
    while (t[i] != e.changedTouches[0].identifier && i < 5){
      i++;
    }    
    if (i < 4){
      t[i] = -1;
      isTouching[i] = false;
    }
  }
}

//var touchable = 'createTouch' in document;
//if (touchable) {
 // window.addEventListener('MSPointerMove', onTouchMove, false);
 // window.addEventListener('MSPointerDown', onTouchStart, false);
 // window.addEventListener('MSPointerUp', onTouchEnd, false);
 
    var evt_start = window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart";
    var evt_move = window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove";
    var evt_end = window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend";
    
    window.addEventListener(evt_start, onTouchStart, false);
    window.addEventListener(evt_move, onTouchMove, false);
    window.addEventListener(evt_end, onTouchEnd, false);
    window.addEventListener('mousedown', mouseDown, false);
//}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function () {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
}