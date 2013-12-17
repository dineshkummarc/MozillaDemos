$(function(){
    $('#control').knobKnob({
        snap : 0,
        value: 180,
        turn : function(ratio){
     //       renderImage(ratio);
        }
    });
	
	//need to add this to first loading function later
	$("#imInInWrap").draggable();
	$("#imLoad").resizable(); // A copy placed in fx.js
	$("body").fileReaderJS(opts);
	$("body").fileClipboard(opts);
	
	
	//$("#imInInWrap").draggable();
	//$("#imInInWrap").resizable();
	//$("#imInWrapper").draggable();
	//$("#imInWrapper").resizable();
	startOptionListener();
	$(".overlay").width(0).height(0);
	Caman.Event.listen("processStart", function (job) {
  	showOverlayLoadingImage();
	});
	Caman.Event.listen("renderFinished", function (job) {
  	hideOverlayLoadingImage();
	});

});