if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elem) {
		for(var i = 0; i < this.length; i++){
				if(this[i] == elem) {return i;}
		}
		return -1;
	}
}

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (searchString, position) {
            position = position || this.length;
            position = position - searchString.length;
            return this.lastIndexOf(searchString) === position;
        }
    });
}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.httplize = function() {
	var t = this.substr(0,7).toLowerCase();
	if(t == "http://" || t == "https:/") {
		return this.toString();
	} else {
		return "http://"+this;
	}
};

//Radio Model
function Radio(name, stream, site, tipo) {
	var self = this;
	self.name = ko.observable(name);
	self.stream = ko.observable(stream);
	self.site = ko.observable(site);
	self.tipo = ko.observable(tipo);
}


//Load radio from localStorage
ArrayRadios = null;
var t;
if((t = localStorage.getItem("ArrayRadio")) == null) {
	ArrayRadios = new Array( );
} else {
	//get saved radios
	var tt = JSON.parse(t);
	ArrayRadios = new Array();
	for(var i = 0; i < tt.length; i++) {
		var obj = tt[i];
		ArrayRadios.push(new Radio(obj.name, obj.stream, obj.site, obj.tipo));
	}
}

ArrayTipo = null;
if((t = localStorage.getItem("ArrayTipo")) == null)
	ArrayTipo = new Array("All", "Classical", "Electronic-House", "Jazz-Blues", "Rap-HipHop", "Reggae-Ska", "Rock" );
else
	ArrayTipo = JSON.parse(t);


/*
	Radio KnockOut ViewModel
*/
function RadiosListViewModel() {
    var self = this;
	var txtTipo = "All";

    // Radios
    self.radios = ko.observableArray(ArrayRadios);

	//radio genre
	self.typeToShow = (localStorage.getItem("LastRadioTipo") != null) ? ko.observable(localStorage.getItem("LastRadioTipo")) : ko.observable("All");

	//radios list
	self.optionValues = ko.observableArray(ArrayTipo);

	//favourites list
	self.radioPreferite = (localStorage.getItem("RadioPreferite") != null) ? ko.observableArray(JSON.parse(localStorage.getItem("RadioPreferite"))) : ko.observableArray(new Array());

	//Change the radio to listen
	self.cambiaRadio = function() {
		//salvo l'ultimo tipo di radio visualizzato
		localStorage.setItem("LastRadioTipo", txtTipo);

		//riazzero le randomradio
		radioACaso = new Array(this.name());
		_cambiaRadio(this);
	}


	/*
		Compute radios to show
	*/
	self.radioToShow = ko.computed(function() {
		txtTipo = this.typeToShow(); //salvo l'ultimo tipo, per usarlo in self.cambiaradio
		var desiredType = txtTipo.toLowerCase();
		
		if (desiredType == "all") 
			return this.radios();
	
		var retArray = ko.utils.arrayFilter(this.radios(), function(radio) {
			return (radio.tipo().indexOf(desiredType) >= 0);
		});

		if(retArray.length == 0) {
				if(txtTipo != "All") {
					//remove the genre from list
					self.optionValues.remove(txtTipo);
					localStorage.setItem("ArrayTipo", JSON.stringify(self.optionValues()));	

					//show all radios
					self.typeToShow("All");
					return this.radios();
				}
		}
		
		//show radios
		return retArray;

	}, this);
	

	/*
		Random Radio
	*/
	self.radioRandom = function() {
		var rts = this.radioToShow();
		var len = rts.length;

		//listens all radios, reset
		if(radioACaso.length == len) {		
			radioACaso = new Array();
			radioACaso.push(lastRadio);
		}
		
		//loop untile new radio
		var t;
		do {		
			t =	Math.floor(Math.random()*len);
		} while(radioACaso.indexOf(rts[t].name()) >= 0);
		radioACaso.push(rts[t].name());
		
		//change radio
		_cambiaRadio(rts[t]);
	};

	/*
		Remove radio
	*/
	self.removeRadio = function(radio) {
		hideBasilicoTooltip();
		if (confirm("Are you sure to remove this radio?")) {
			    self.radios.remove(radio);	
				hideBasilicoTooltip();
				localStorage.setItem("ArrayRadio", ko.toJSON(self.radios()) );
				mostraMsg("Radio removed");
		}
	};

/////Panel AddRadio
	self.radioToAdd = ko.observable("");
	self.radioToAddStream = ko.observable("");
	self.radioToAddUrl = ko.observable("");
	self.radioToAddTipo = ko.observable("");

	/* 
		Add Radio
	*/
	self.aggiungiRadio = function() {		
		//parse genre list		
		var tipo = new Array();
		var t2 = self.radioToAddTipo().split(",");
		t2 = ko.utils.arrayFilter(t2, function(input){ 
				var t = input.trim(); 
				return !(t == "")
		});
		if(t2.length == 0) {
			mostraMsg("Genre isn't valid!");			
			return;
		}

		for(var i = 0; i < t2.length; i++) {	
			var t3 = t2[i].trim().capitalize();	
			
			//check the presence
			if(self.optionValues.indexOf(t3) < 0)
				self.optionValues.push(t3);
			
			//add genre
			tipo.push(t3.toLowerCase());
		}
		if(addEditRadio == "add") {
			var t = new Radio(self.radioToAdd(), self.radioToAddStream().httplize(), self.radioToAddUrl().httplize(),  tipo);
			self.radios.push(t );
			
			//to editing		
			addEditRadio = "edit";
			titoloAddRadioPanel.innerHTML = "Edit Radio";
			submitAddRadioPanel.innerHTML = "Edit";
			radioObj = t;
			
			mostraMsg("Radio added!");	
		} else {
			radioObj.name(self.radioToAdd());
			radioObj.stream(self.radioToAddStream().httplize());
			radioObj.site(self.radioToAddUrl().httplize());
			radioObj.tipo(tipo);
			mostraMsg("Radio edited!");
		}

		//save
		localStorage.setItem("ArrayRadio", ko.toJSON(self.radios()) );
		localStorage.setItem("ArrayTipo", JSON.stringify(self.optionValues()));
		
	}

	/*
		To edit a radio	
	*/
	self.editRadio = function(radio) {
		self.radioToAdd(radio.name());
		self.radioToAddStream(radio.stream());
		self.radioToAddUrl(radio.site());
		self.radioToAddTipo(radio.tipo().toString());
		addEditRadio = "edit";
		titoloAddRadioPanel.innerHTML = "Edit Radio";
		submitAddRadioPanel.innerHTML = "Edit";
		radioObj = radio;
		mostraAddRadio(true);
	}

	//util
	self.pulisciAddRadio = function() {
		self.radioToAdd("");
		self.radioToAddStream("");
		self.radioToAddUrl("");
		self.radioToAddTipo("");
		if(window.FileReader) {
			uploadRadioButton.value="";
		}
	}
	
	
	self.nuovaRadio = function() {
		addEditRadio = "add";
		titoloAddRadioPanel.innerHTML = "Add Radio";
		submitAddRadioPanel.innerHTML = "Add";
		self.pulisciAddRadio();
	}

	/*
		Listen prev radio
	*/
	self.radioPrecendente = function() {
		if(prevRadio!=="")
			_cambiaRadio(getRadio(prevRadio));
	}

//Favourites radios
	/*
		Add radio to list
	*/
	self.addPreferito = function() {
		if(self.radioPreferite().length >= 10) {
			mostraMsg("Max favourites number!");
			return;
		}

		if(self.radioPreferite.indexOf(lastRadio) < 0) {
			self.radioPreferite.push(lastRadio);
			localStorage.setItem("RadioPreferite", JSON.stringify(self.radioPreferite()));
			mostraMsg(lastRadio + " added to favourites!");
		} else {
			mostraMsg(lastRadio + " is already a fovourites!");
		}
	}
	
	/*
		remove radio from favourites
	*/
	self.removePreferito = function(preferito) {
		self.radioPreferite.remove(preferito);
		hideBasilicoTooltip();
		localStorage.setItem("RadioPreferite", JSON.stringify(self.radioPreferite()));
	}

	/*
		play radio from favourites
	*/
	self.ascoltaPreferito = function(preferito) {
		_cambiaRadio(getRadio(preferito));
	}
	
	
}
var radioModel = new RadiosListViewModel();
ko.applyBindings(radioModel, document.getElementById("bindRadio"));

//var for edit/add of radios
var addEditRadio = "add";
var radioObj;


//Radio player functions

//Change the radio
function _cambiaRadio(radio) {
	
	if(radio == null || lastRadio == radio.name())
				return;
	
	//per non nascondere il tooltip in caso di blocco 
	hideBasilicoTooltip();
	
	ascoltaRadio(radio.name(), radio.site(), radio.stream());
}

//Listen radio
function ascoltaRadio(nome, sito, stream) {
	btnAddPref.style.display="inline";

	if(prevRadio !== "")
		btnPrevRadio.style.visibility="visible";

	//save the prev radio
	prevRadio = lastRadio;
	
	//set this radio as in listening
	lastRadio = nome;	
	lastRadioSite = sito;
	
	//play the radio
	MRP.stop();
	MRP.setTitle(nome);
	MRP.setUrl(stream);
	MRP.play();

	//save the radio into storage
	localStorage.setItem("LastRadioName", nome);
	
	titoloPagina.innerHTML= "RadioAzione playing " + nome;			
	msgRadio.innerHTML = "<strong><a href=\"" + lastRadioSite + "\" target=\"_blank\" data-title=\"Visualizza il palinsesto\" onmouseover=\"showBasilicoTooltip(this)\" onmouseout=\"hideBasilicoTooltip()\">"+lastRadio+"</a></strong>";
}

function getRadio(nome) {
	var t = radioModel.radios();
	for(var i = 0; i < t.length; i++) {
		if(t[i].name() == nome)
			return t[i];
	}
	return null;
}


//global vars
var playerDiv = document.getElementById("playerDiv");
var msgRadio = document.querySelector("#msgRadio");
var titoloPagina = document.querySelector("title");
var lastRadio = "";
var lastRadioSite = "";
var prevRadio = "";
var radioACaso = new Array();
var addRadioPanel = document.querySelector("#addRadioPanel");
var titoloAddRadioPanel = document.querySelector("#titoloAddRadioPan");
var submitAddRadioPanel = document.querySelector("#submitAddRadioPan");
var MsgPanel = document.querySelector("#MsgPanel");
var MsgTxt = document.querySelector("#MsgTxt");
var btnPrevRadio = document.querySelector("#btnPrevRadio");
var btnAddPref = document.querySelector("#btnAddPref");



//For Add Radio

//show add radio panel
function mostraAddRadio(noEdit) {
	stopChangeBk();
	
	if(window.chrome) playerDiv.style.visibility="hidden"; 
	
	addRadioPanel.style.display="block";
	if(noEdit !== true) radioModel.pulisciAddRadio();
	setTimeout(function(){addRadioPanel.firstChild.style.opacity=1;},16);
}

//hide add radio panel
function nascondiAddRadio() {

	if(window.chrome) playerDiv.style.visibility="visible"; 
	
	addRadioPanel.firstChild.style.opacity=0;
	setTimeout(function(){
		addRadioPanel.style.display='none';
		addEditRadio = "add";
		titoloAddRadioPanel.innerHTML = "Add Radio";
		submitAddRadioPanel.innerHTML = "Add";
		radioModel.pulisciAddRadio();
		changeBk();
	}, 300);
}

//When page is loaded
window.addEventListener("load", function()
{

	btnAddPref.style.display="none";

	//make listen last radio
	if( localStorage.getItem("LastRadioName") !== null) {
		var t = localStorage.getItem("LastRadioName");
		try {	
			//is radio exist?
			var tRadio = getRadio(t);	
			if(tRadio !== null) {
				radioACaso.push(t);
				lastRadio = t;
				ascoltaRadio(t, tRadio.site(), tRadio.stream());
			} else {
				mostraMsg("\"" + t +"\" isn't present into list!");
			} 

		} catch(err) {
			console.log(err);
		}
	} 
}, false);

