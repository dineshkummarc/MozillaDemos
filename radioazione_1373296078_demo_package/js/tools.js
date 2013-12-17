/*
To show message
*/
//hide
function nascondiMsg() {
	MsgPanel.firstChild.style.opacity=0;
	setTimeout(function(){MsgPanel.style.display="none"; changeBk()}, 300);
}

//show
function mostraMsg(text, noBtn) {
	if(noBtn === true) {
		MsgPanel.querySelector("button").style.display="none";
	} else {
		MsgPanel.querySelector("button").style.display="inline";
	}
	stopChangeBk();
	MsgTxt.innerHTML = text;
	MsgPanel.style.display="block";
	setTimeout(function(){MsgPanel.firstChild.style.opacity=1;},16);
}

/*
To clear localeStorage
*/
function pulisciStorage() {
	hideBasilicoTooltip();
	if(confirm("Are you sure?")) {
		localStorage.removeItem("LastRadioName");
		localStorage.removeItem("ArrayRadio");
		localStorage.removeItem("ArrayTipo");
		localStorage.removeItem("RadioPreferite");
		localStorage.removeItem("LastRadioTipo");
		
		location.replace(location.href.split("?")[0]);
	}
}


/*
Background 
*/
;window.Modernizr=function(a,b,c){function u(a){i.cssText=a}function v(a,b){return u(l.join(a+";")+(b||""))}function w(a,b){return typeof a===b}function x(a,b){return!!~(""+a).indexOf(b)}function y(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:w(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m={},n={},o={},p=[],q=p.slice,r,s={}.hasOwnProperty,t;!w(s,"undefined")&&!w(s.call,"undefined")?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e}),m.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return u((a+"-webkit- ".split(" ").join(b+a)+l.join(c+a)).slice(0,-a.length)),x(i.backgroundImage,"gradient")};for(var z in m)t(m,z)&&(r=z.toLowerCase(),e[r]=m[z](),p.push((e[r]?"":"no-")+r));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)t(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},u(""),h=j=null,e._version=d,e._prefixes=l,e}(this,this.document);

myIntervalId=null;
stopBkChange=1;
function changeBk() {
	stopBkChange--;
	if(stopBkChange < 0) stopBkChange=0;
	if(myIntervalId==null && stopBkChange == 0) {
		myIntervalId = myInterval(function() {
							if(myAdd == 13) bgIncr = false;
							else if(myAdd == 1) bgIncr = true;
							if(bgIncr) myAdd++; else myAdd--;
							myTag.setAttribute("class", "htmlBg"+myAdd);
						}, 750);
	}
}

function stopChangeBk(){
	if(stopBkChange == 0) {
		myClearInterval(myIntervalId);
		myIntervalId=null;
	}
	stopBkChange++;
}

if(Modernizr.cssgradients) {
	
	if(trAfHack.rAFSupported() == true) {
		myInterval = trAfHack.setInterval;
		myClearInterval = trAfHack.clearInterval;
	} else {
		myInterval = window.setInterval.bind(window);
		myClearInterval = window.clearInterval.bind(window);
	}


	var myTag = document.querySelector("html");
	var myAdd = 1;
	var bgIncr = true;

	changeBk();
	document.addEventListener("focus", changeBk);
	document.addEventListener("blur", stopChangeBk);
}
