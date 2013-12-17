if (typeof window.FileReader === 'undefined') {
  		console.log("File API not available");
	} else {
  		console.log("FILE API available");
	}

function handleImage(){
	var canvas = document.getElementById("canvas");
	canvas.width = this.width;
	canvas.height = this.height;
	var dropbox = document.getElementById("dropbox");
	dropbox.style.width = this.width;

	if (!canvas.getContext){
		console.log("Canvas not supported");
		return;
	}
	if (!window.Worker){
		console.log("No web workers");
		return;
	}

	var tempContext = canvas.getContext("2d");
	tempContext.drawImage(this, 0, 0, canvas.width, canvas.height);

	//begin processing
	var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
    var binaryData = canvasData.data;

    //workers
	var totalWorkers = Number(document.getElementById("workers").innerHTML);
    var finished = 0;
    var blocksize = Math.round(canvas.height/totalWorkers);
    var onWorkEnded = function (e) {
        var diff = new Date() - start;
        log.innerHTML = "Process time so far: " + Math.round(diff/1000) + " s";

        var imageData = tempContext.getImageData(0, e.data.workerId*blocksize,canvas.width, blocksize);
        for(var i = 0; i < blocksize*canvas.width*4; i++){
                imageData.data[i] = e.data.canvasData.data[i+blocksize*canvas.width*e.data.workerId*4];
            
        } 
        tempContext.putImageData(imageData, 0, blocksize*e.data.workerId);
        
        finished++;
        if (finished == totalWorkers){
          var diff = new Date() - start;
          log.innerHTML = "Total processing time: " + Math.round(diff/1000) + " s";
          var data = canvas.toDataURL("image/png");
          download.href = data;
          download.download = 'Artify.png';
          download.textContent = 'Save art!';
          download.style.height = "23px";
          download.style.background = "#c1c0c0";
          download.style.padding = "10px";

        }
    };
    var start = new Date();
    for (var i=0; i < totalWorkers; i++){
        var worker = new Worker("javascript/task.js");
        worker.onmessage = onWorkEnded;
        worker.postMessage({
            workerId: i, 
            totalWorkers: totalWorkers, 
            canvasData: canvasData,
            canvasWidth: canvas.width,
            canvasHeight: canvas.height
        }); 
    }
}



function handleFile(e){
  console.log(e);
  log.innerHTML = "Processing";
  document.getElementById("workers").style.display="none";
  document.getElementById("btnAdd").style.display="none";
  document.getElementById("btnSub").style.display="none";
  
  if(e.type == "drop") {
		this.className = '';
  		e.preventDefault();
  		var file = e.dataTransfer.files[0];
      console.log(file);
	} else {
		var file = e.target.files[0];
	}
  	var url = URL.createObjectURL(file);
  	var img = new Image();
  	img.onload = handleImage;
  	img.src = url;

}

function clickHandler(e) {
	if (input) { input.click(); }
	e.preventDefault();
}


//init
var canvas = document.getElementById("canvas");
canvas.addEventListener('click', clickHandler,false);
var dropbox = document.getElementById("dropbox");
var input = document.getElementById("input");
input.addEventListener('change', handleFile, false);
dropbox.ondragover = function () { this.className = 'hover'; return false; };
dropbox.ondragend = function () { this.className = ''; return false; };
dropbox.ondrop = handleFile;

//draw init image on canvas
var img = new Image();
img.onload = function (){
  var tempContext = canvas.getContext("2d");

  tempContext.drawImage(this, 0, 0, this.width, this.height);
}
img.src = "default.png";




  
