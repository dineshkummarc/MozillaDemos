/***************************************************
		Script used to generate the media queries (stores the result on the clipboard)
****************************************************/
var texto = "";
// var images = [0, 34, 68, 102, 136, 170, 204, 238]; // 34
// var images = [0, 30, 60, 90, 120, 150, 180, 210]; // 30
// var images = [0, 36, 72, 108, 144, 180, 216]; // 36
var images = [0, 35, 70, 105, 140, 175, 210, 245]; // 35 -> best of all
//var images = [0, 38, 76, 114, 152, 190, 228]; // 38
//var images = [0, 37, 74, 111, 148, 185, 222]; // 37
for (var i = 0, j= 0; i<1000; i=i+6, j++) {
	j = j > 7 ? 0:j;
	var pixelsMin = 320+i;
	var pixelsMax = pixelsMin + 5;
	var marginLeft = i;

	texto += "@media screen and (min-width: " + pixelsMin + "px) and (max-width : " + pixelsMax + "px){\n";
	texto += "    #dancingMichael {\n";
	texto += "		background:url(../images/sprites.png) -" + images[j] + "px -1076px no-repeat;\n";
	texto += "		margin-left:" +  marginLeft + "px;\n";
	texto += "    }\n";
/*
	// For moving the background (distracts too much, so I haven't added it)
	if (i%2 === 0) {
		texto += "    #wrapper {\n";
		texto += "		background-position: -" + i + "px 0px;\n";
		texto += "    }\n";
	}
*/
	texto += "}\n\n";
};
copy(texto);
