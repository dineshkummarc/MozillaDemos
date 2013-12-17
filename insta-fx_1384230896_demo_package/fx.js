var rez = 0;
var currentKnobValue = 180;
function resized(){
  rez = 1;
}
function loaded(){
  var wid = $("#imLoad").width();
  var hei = $("#imLoad").height();
  $("#imInWrap").width(wid);
  $("#imInWrap").height(hei);
}
function startOptionListener(){
	$(document).on('click','input', function(){

      $('input').not(this).attr('checked', false);
     // $(this).attr('checked', true);

	});
	
	$("input").click(function(){
		gotId = this.id;
		//alert(gotId);
		switch(parseInt(gotId)){
			case 1: currentKnobValue = 180+brightVal*18;
					$('#currentValue').html(currentKnobValue);
					break;
			case 2: currentKnobValue = 180+contVal*18;
					$('#currentValue').html(currentKnobValue);
					break;
			case 3: currentKnobValue = 180+vibVal*18;
					$('#currentValue').html(currentKnobValue);
					break;
			case 4: currentKnobValue = 180+exVal*18;
					$('#currentValue').html(currentKnobValue);
					break;
			case 5: currentKnobValue = 3.6*hueVal;
					$('#currentValue').html(currentKnobValue);
					break;
			case 6: currentKnobValue = 180+satVal*18;
					$('#currentValue').html(currentKnobValue);
					break;
			case 7: currentKnobValue = 3.6*sepVal;
					$('#currentValue').html(currentKnobValue);
					break;
			case 8: currentKnobValue = 3.6*gammaVal;
					$('#currentValue').html(currentKnobValue);
					break;
			case 9: currentKnobValue = 3.6*noiseVal;
					$('#currentValue').html(currentKnobValue);
					break;
			case 10: currentKnobValue = 3.6*clipVal;
					$('#currentValue').html(currentKnobValue);
					break;
			case 11: currentKnobValue = 3.6*sharpVal;
					$('#currentValue').html(currentKnobValue);
					break;
			case 12: currentKnobValue = 3.6*blurVal;
					$('#currentValue').html(currentKnobValue);
					break;
		}
		$('#control').children().remove();
		$('#control').knobKnob({
        snap : 0,
        value: currentKnobValue,
        turn : function(ratio){
            renderImage(ratio);
        }
    });
	});	
}
function renderImage(knobValue){
	$('#currentValue').html(parseInt(knobValue*100));
	switch(parseInt(gotId)){
			case 1: brightVal = parseInt(knobValue*20-10);break;
			case 2: contVal = parseInt(knobValue*20-10);break;
			case 3: vibVal = parseInt(knobValue*2000-1000);break;
			case 4: exVal = parseInt(knobValue*20-10);break;
			case 5: hueVal = parseInt(knobValue*100);break;
			case 6: satVal = parseInt(knobValue*20-10);break;
			case 7: sepVal = parseInt(knobValue*100);break;
			case 8: gammaVal = (knobValue*8)+1;break;
			case 9: noiseVal = parseInt(knobValue*100);break;
			case 10: clipVal = parseInt(knobValue*100);break;
			case 11: sharpVal = parseInt(knobValue*100);break;
			case 12: blurVal = parseInt(knobValue*20);break;
		}
	setValues();
}

function setDraggedImage(e,file){
	//photo.remove();
	$("#imLoad").remove();
	var img = $('<img id="imLoad">');
	img.attr('src',  e.target.result);
	//$("#imLoad").attr("src").replace(file.name, file.type);
	//alert( e.target.result);
	img.appendTo('#imInInWrap');
	//alert(file.type+"  "+file.name);
	resetAllEdits();
	
}

function resetAllEdits(){
	brightVal = contVal = satVal = vibVal = exVal = hueVal = sepVal = noiseVal = clipVal = sharpVal = oldexVal = oldhueVal = oldsharpVal = 0;
	gammaVal = 1;
	$('input').attr('checked', false);
	setTimeout(function(){
						//alert("time !");
	$("#imLoad").resizable();
	},1000);
}
