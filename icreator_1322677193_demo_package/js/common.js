// JavaScript Document
 var canvas = document.getElementById("mycanvas");
 var context = canvas.getContext("2d");
 
 var canvaswidth;
 var canvasheight;
 var imgratio;
 
 var x = 0;
 var y = 0;
 
 var rows = 0;
 var cols = 0;
 
 var img = new Image();
   
 canvas.addEventListener('drop', onDrop, false);
 canvas.addEventListener('dragenter', onDragEnter, false);
 canvas.addEventListener('dragover', onDragOver, false);
 canvas.addEventListener('dragleave', onDragLeave, false); 
 
 /*Checks for class name*/
 Element.prototype.hasClassName = function(name) {
	return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
 };

 Element.prototype.addClassName = function(name) {
	if (!this.hasClassName(name)) {
	  var c = this.className;
	  this.className = c ? [c, name].join(' ') : name;
	}
 };

 Element.prototype.removeClassName = function(name) {
	if (this.hasClassName(name)) {
	  var c = this.className;
	  this.className = c.replace(
		  new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
	}
 }; 
 
 /*Clear The Canvas*/
 clearCanvas = function() {
    // Clear existing drawing
    context.clearRect(0, 0, canvas.width, canvas.height);
 };
  
 /*Image*/
 function DrawIcon(imag) {
	  //clearCanvas();	
	  var img = new Image();
	  img.src = imag;
	  context.drawImage(img, x, y);	
	  var oldx = x;
	  x = x + img.width;	
	  console.log("Drawed image @ x = " + oldx + " @y = " + y +" new x val = " + x);	  
	  if(x >= canvaswidth){
		  x = 0;
		  var oldy = y;
		  y = y + img.height;	
		  console.log("Drawed image @ y = " + oldy + " new y val = " + y);	  
	  }
 };
 
 img.onload = function() {
	  //clearCanvas();   
	  context.drawImage(img, x, y);
	  x = x + img.width;
	  if(x >= canvaswidth){
		  x = 0;
		  y = y + img.height;	
	  }  
 }; 
 
 /*Draws Image*/
 function DrawIcon(imag) {
	  //clearCanvas();	
	  var img = new Image();
	  img.src = imag;
	  context.drawImage(img, x, y);	
	  var oldx = x;
	  x = x + img.width;	
	  console.log("Drawed image @ x = " + oldx + " @y = " + y +" new x val = " + x);	  
	  if(x >= canvaswidth){
		  x = 0;
		  var oldy = y;
		  y = y + img.height;	
		  console.log("Drawed image @ y = " + oldy + " new y val = " + y);	  
	  }
 }; 
 
 /*Drag Events*/
 function onDragEnter(e) {
	e.stopPropagation();
	e.preventDefault();	
 }
 
 function onDragOver(e) {
	e.stopPropagation();
	e.preventDefault();
	canvas.addClassName('rounded');
 }
  
 function onDragLeave(e) {
	e.stopPropagation();
	e.preventDefault();
	canvas.removeClassName('rounded');
 }
 
 function onDrop(e) {
    e.stopPropagation();
    e.preventDefault();

	canvas.removeClassName('rounded');
	
	var files = e.dataTransfer.files;
	if (files.length > 0) {	
		for(i=0;i<files.length;i++){
			var file = files[i];
			if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
				var reader = new FileReader();
				reader.onload = function (evt) {
					DrawIcon(evt.target.result);
				};
				reader.readAsDataURL(file);
			}
		}/*End of for*/
	}/*End of if*/
	
	var data = e.dataTransfer.getData("URL");
	img.src = data;
 } 
 
 $(function() {
		$(".Create").click(function(){
			var imgnums = rows * cols;
			var left = 0;
			var top = 0;
			var imgcss = "";
			var nwidth = canvaswidth * -1;
			for(i=1;i<=imgnums;i++){
				 if(imgcss != ""){	
						imgcss = imgcss + "<br>" + ".icon" + i + " {background-image: url(../images/canvas.png); background-repeat:no-repeat; background-position:" + left + "px "+ top + "px; width:" + imgratio + "px; height:" + imgratio + "px;}";
				 }else{
						imgcss = ".icon" + i + " {background-image: url(../images/canvas.png); background-repeat:no-repeat; background-position:" + left + "px "+ top + "px; width:" + imgratio + "px; height:" + imgratio + "px;}";
				 }
				left = left - imgratio;
				if(left <= nwidth){
					left = 0;
					top = top - imgratio;
				}
			}/*End of for*/
			$(".SpritesCss").html(imgcss);
			$(".SpritesCss").fadeIn();
		});
		
		$(".next").click(function(){
			$(".Welcome").addClass("hidden");
			$(".FilterBox").removeClass("hidden");
		});
		
		$(".next_2").click(function(){
			$(".FilterBox").addClass("hidden");	
			rows = $( "#Rows" ).slider( "value" );
			cols = $( "#Cols" ).slider( "value" );
			imgratio = $('select#Width').val();
			
			canvaswidth = imgratio * cols;
			canvasheight = imgratio * rows;
						
			var can = document.getElementById("mycanvas");
			can.width = canvaswidth;
			can.height = canvasheight;
			
			$(".SpritesMgr").removeClass("hidden");	
		});
		
		$(".continue").click(function(){
			clearCanvas();
			x = y = 0;
			$(".FilterBox").removeClass("hidden");
			$(".SpritesMgr").addClass("hidden");
			$(".SpritesCss").hide();
		});
		
		$( "#Rows" ).slider({
			value: 2,
			orientation: "horizontal",
			range: "min",
			min:0,
			max:10,
			animate: true,
			slide: function( event, ui ) {
				$( "input[name=Rows]" ).val(ui.value );
			}			
		});	
		$( "input[name=Rows]" ).val($( "#Rows" ).slider( "value" ));

		$( "#Cols" ).slider({
			value: 2,
			orientation: "horizontal",
			range: "min",
			min:0,
			max:10,
			animate: true,
			slide: function( event, ui ) {
				$( "input[name=Cols]" ).val(ui.value );
			}			
		});	
		$( "input[name=Cols]" ).val($( "#Cols" ).slider( "value" ));
		
		$('select#Width').selectToUISlider().hide();		

  }); 