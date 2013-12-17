Caman.DEBUG = ('console' in window);
  var wid = $("#imLoad").width();
  var hei = $("#imLoad").height();
  var gotId = 100;
  
 // function initt(){
 // Caman("#imLoad", function () {
	//this.resize({
   // width: wid,
   // height: hei
 // });
  
    //this.sunrise();
 //   this.render();
 // }); 
 // } 
  
  //brightness Adjustment
  var brightVal = contVal = satVal = exVal =  vibVal = hueVal = sepVal = noiseVal = clipVal = sharpVal = oldexVal = oldhueVal = oldsharpVal = 0;
  var gammaVal = 1;
  var RMV,GMV,BMV,STV,RM1V,GM1V,BM1V;
  var fun1 = fun2 = fun3 = 0;
  
  function setValues(){
  //alert(brightVal+"  "+contVal);
  	Caman("#imLoad", function () {
	//this.resize({
   // width: wid,
    //height: hei
  //});
  	this.revert();
	this.brightness(brightVal).contrast(contVal).saturation(satVal).vibrance(vibVal).sepia(sepVal).gamma(gammaVal).noise(noiseVal).clip(clipVal);
	if(exVal != oldexVal){
		this.exposure(exVal);
		oldexVal = exVal;
	}
	if(hueVal != oldhueVal){
		this.hue(hueVal);
		oldhueVal = hueVal;
	}
	if(sharpVal != oldsharpVal){
		this.sharpen(sharpVal);
		oldsharpVal = sharpVal;
	}
	this.render(function () {
    //this.save('png'); // shows a download file prompt
    // or...
   // this.toBase64(); //  base64 data URL representation of the image. useful if you want to upload the modified image.
  });
	});
	//$("#imLoad").css({"border-color": "#990000", 
    //         			"border-weight":".5px", 
    //         			"border-style":"solid"});
  }
  
  //fUNCTION FOR STEP 2 RENDER
  function renderStep2(){
  
	Caman("#imLoad", function () {
  // Explicitly give the R, G, and B values of the
  // color to shift towards.
  //
  // Arguments: (R, G, B, strength)
	this.revert();
  this.colorize(RMV, GMV, BMV, STV);
  //this.render();
	});
	Caman("#imLoad", function () {
	  this.channels({
		red: RM1V,
		green: GM1V,
		blue: BM1V
	  }).render();
	});
  	console.log(RMV+" "+GMV+" "+BMV+" "+STV+" "+RM1V+" "+GM1V+" "+BM1V);
  }
  
  var lastCount = 0;
  var fxAmount = "10%";
  var effectz = new Array("vintage","lomo","clarity","sinCity","sunrise","crossProcess","orangePeel","love","grungy","jarques","pinhole","oldBoot","glowingSun","hazyDays","herMajesty","nostalgia","hemingway","concentrate");
  function startEffect(count){
  	lastCount = count;
	
  	Caman("#imLoad", function () {
		this.revert();
		count = parseInt(count);
		switch(count){
			case 0: break;
			case 1: this.vintage(fxAmount);break;
			case 2: this.lomo(fxAmount);break;
			case 3: this.clarity(fxAmount);break;
			case 4: this.sinCity(fxAmount);break;
			case 5: this.sunrise(fxAmount);break;
			case 6: this.crossProcess(fxAmount);break;
			case 7: this.orangePeel(fxAmount);break;
			case 8: this.love(fxAmount);break;
			case 9: this.grungy(fxAmount);break;
			case 10: this.jarques(fxAmount);break;
			case 11: this.pinhole(fxAmount);break;
			case 12: this.oldBoot(fxAmount);break;
			case 13: this.glowingSun(fxAmount);break;
			case 14: this.hazyDays(fxAmount);break;
			case 15: this.herMajesty(fxAmount);break;
			case 16: this.nostalgia(fxAmount);break;
			case 17: this.hemingway(fxAmount);break;
			case 18: this.concentrate(fxAmount);break;
		}
        this.render();
            });
  }
  function butt(a){
  	switch(a){
		case 1: $("#editWrapper").width(0); $("#canWrapper").width(0); $("#canWrapper1").width("80%");break;
		case 2: $("#editWrapper").width(0); $("#canWrapper").width("80%"); $("#canWrapper1").width(0);break;
		case 3: $("#editWrapper").width("80%"); $("#canWrapper").width(0); $("#canWrapper1").width(0);break;
	}
  }