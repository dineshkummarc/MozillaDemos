importScripts("process.js");


self.addEventListener('message', function(e) {

	var canvasData = e.data.canvasData;

	var blocksize = Math.round(e.data.canvasHeight/e.data.totalWorkers);
	var startAt = Math.round(blocksize*e.data.workerId); 
	var endAt = startAt+blocksize;
	processImage ( e.data.canvasWidth, e.data.canvasHeight, canvasData.data, startAt, endAt);

	self.postMessage({
		workerId: e.data.workerId,
		canvasData: canvasData,
		blocksize: blocksize,
		startAt: startAt,
		endAt:endAt
	});
}, false);