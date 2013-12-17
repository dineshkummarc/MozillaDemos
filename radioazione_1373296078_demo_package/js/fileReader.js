if(window.FileReader) {
	uploadRadioButton = document.getElementById("uploadRadio");
	
	oFReader = new FileReader();
	oFReader.stream="";
	
	oFReader.onload = function (oFREvent) {
	  var txt = oFREvent.target.result;
		
	  var stream;
	
	//check the file type by extention
	  if(oFReader._type == "pls") {
		var counter = 0;
		  do {
			counter++;
			var str = "File"+counter+"="; //find the File string
		  	var pos = txt.indexOf(str);
			if(pos == -1) {
				mostraMsg("Pls not valid"); 
				return;
			}
			
			pos+= str.length;
			var validPos = pos;	
			while( (validPos < txt.length) && (txt[validPos]!="\n") ) 
				validPos++;
			
			stream = txt.substring(pos, validPos).trim();//get the url
		
		  } while (stream.endsWith(".mp3") && (stream.indexOf(";") == -1)); //check if isn't an mp3
		  oFReader.stream = stream;
		  checkHtmlOrStream(stream);	

			
		} else if(oFReader._type == "m3u") {
				
			var txt = txt.trim();

			//find the first line without '#'
			var pos = 0;
			while(pos < txt.length && txt[pos] == "#") {
				while( (pos < txt.length) && (txt[pos]!="\n") ) 
					pos++;
				pos++;
			}
			
			if(pos >= txt.length) {
				mostraMsg("M3u not valid");
				return;
			}
			
			//copy the line
			var validPos = pos;	
			while( (validPos < txt.length) && (txt[validPos]!="\n") ) 
				validPos++;
			
			stream = txt.substring(pos, validPos).trim();
			oFReader.stream = stream;
			checkHtmlOrStream(stream);
			
		} else {
			mostraMsg("File isn't m3u o pls");
			return;
		}
				
	};
	 
	function loadRadioFile() {
	  if (document.getElementById("uploadRadio").files.length === 0) { 
		  return; 
	  }
	  
	  var oFile = document.getElementById("uploadRadio").files[0];
	  var ok = true;
	  if ( oFile.name.endsWith(".m3u") ) {
		  oFReader._type = "m3u";
	  } else if (oFile.name.endsWith(".pls")) {
		  oFReader._type = "pls";
	  } else {
		  ok = false;
	  }
	  
	  if(ok === false) {
		  mostraMsg("Select a .pls or a .m3u file!"); 
		  return;
	  }
	  
	  uploadRadioButton.setAttribute("disabled", "disabled");
	  submitAddRadioPanel.setAttribute("disabled", "disabled");
	  oFReader.readAsBinaryString(oFile);
	}
	
	/*
	 * Check if address is html page or a audio stream
	 * *It's a my hack*
	 */
	function checkHtmlOrStream(stream) {
		
		radioModel.radioToAddStream("Wait please ...");
		
		getStreamRadioTo = setTimeout(computeRadioStream, 3000);
		
		scriptInjected = document.createElement("script");
		scriptInjected.addEventListener("load", function(){
			clearTimeout(getStreamRadioTo);
			computeRadioStream(true);
		});
		document.head.appendChild(scriptInjected);
		scriptInjected.setAttribute("src", stream);
		
	}
	
	//get Stream Addr
	function computeRadioStream(isHtml) {
		document.head.removeChild(scriptInjected);
		var stream = oFReader.stream;
		if(isHtml===true) {
			if(stream.endsWith("/")) stream += ";";
			else stream += "/;";		
		} 
		
		radioModel.radioToAddStream(stream);
		uploadRadioButton.removeAttribute("disabled");
		submitAddRadioPanel.removeAttribute("disabled");
	}
}