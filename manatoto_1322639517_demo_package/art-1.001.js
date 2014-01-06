var Art_List=[];
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Art(canvas_id) {
	this.canvas = document.getElementById(canvas_id); 
	this.width = parseInt(this.canvas.getAttribute("width"));
	this.height = parseInt(this.canvas.getAttribute("height"));
	this.ctx = this.canvas.getContext('2d');            
	this.params={};
	this.palettes={};
	this.tools={};
	this.brushes={};
	this.sounds={};
	this.set_background(0,0,0);
	this.idgen=0;
	this.interval_draw=5;
	this.interval_refresh=1000/20;
	this.id=Art_List.push(this)-1;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.events_do=function(event) {
	if(this.on_event) this.on_event(event);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.live=function(id) {
	// id transmis par timer
	if(typeof id != 'undefined') 
		Art.prototype.live.call(Art_List[id]);
	else {
		// fonction user 
		this.events_do('do');
		// animer les paramètres
		this.params_do();
		// animer les outils de dessin
		if(this.tools_do()==false) this.stop();
	}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.refresh=function(id) {
	// id transmis par timer
	if(typeof id != 'undefined') 
		Art.prototype.refresh.call(Art_List[id]);
	else {
		// mettre à jour le canvas
		this.ctx.putImageData(this.image_data, 0, 0); 
		this.refreshing=true;
		this.events_do('refresh');
		this.refreshing=false;
		
	}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.start= function() {
	this.time_start=new Date();
	this.erase(1);
	this.palette_add("blanc", 255, 255, 255);
	this.palette_add("blancs", 250, 250, 250, 255, 255, 255);
	this.palette_add("noir", 0,0,0);
	this.palette_add("noirs", 0,0,0, 10,10,10);
	this.timer_draw=setInterval("Art.prototype.live("+this.id+")", this.interval_draw); 
	this.timer_refresh=setInterval("Art.prototype.refresh("+this.id+")", this.interval_refresh);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.stop = function() {
	clearInterval(this.timer_draw);
	clearInterval(this.timer_refresh);
	this.tools={};
	this.params={};
	this.time_stop=new Date();
	this.time_elapsed=this.time_stop-this.time_start;
	for(k in this.sounds) this.sounds[k].stop();
	this.events_do('done');
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.set_background = function(r,g,b) {
	this.background=[r,g,b];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.erase=function(alpha) {
	if(alpha<1 && !this.refreshing) this.refresh();
	this.ctx.fillStyle = "rgba("+this.background[0]+","+this.background[1]+","+this.background[2]+","+alpha+")";
	this.ctx.fillRect (0, 0, this.width, this.height);      		
	this.image_data = this.ctx.getImageData(0,0,this.width, this.height);
	this.data = this.image_data.data;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.put_pixel = function(x, y, r, g, b) {
	var index = (x + y * this.width) * 4;
	var d=this.data;
	d[index] = ~~r;
	d[++index] = ~~g;
	d[++index] = ~~b;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.get_pixel = function(x, y, ret) {
	var index = (x + y * this.width) * 4;
	var d=this.data;
	ret[0]=d[index];
	ret[1]=d[++index];
	ret[2]=d[++index];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.get_pixel_luminosity = function(x, y) {
	var ret=[];
	this.get_pixel(x,y, ret);
	return (ret[0]+ret[1]+ret[2])/3;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.put_pixel_AA=function(p, color) {
	// Symbole des 4 pixels : A D
	//									 B C
	var pp_x = ~~p[0];
	var pp_y = ~~p[1];
	if(pp_x>0 && pp_x<this.width-1 && pp_y>0 && pp_y<this.height-1) {
		var index;
		var data=this.data;
		var r=color[0];
		var g=color[1];
		var b=color[2];
		var a=color[3]/255;
		var pp_dh1 = p[0] - pp_x;
		if(pp_dh1<.2) pp_dh1=0; if(pp_dh1>.8) pp_dh1=1; // pour accélération dessin (et appauvrissement) // [vitesse]
		var pp_dh0 = 1 - pp_dh1;
		var pp_dv1 = p[1] - pp_y;
		if(pp_dv1<.2) pp_dv1=0; if(pp_dv1>.8) pp_dv1=1; // pour accélération dessin (et appauvrissement) // [vitesse]
		var pp_dv0 = 1 - pp_dv1;
		var pp_coeff = a/2; // pour ne pas exécuter 4 fois : alpha = ((dh?+dv?)/2)*a;
		var pp_alpha;

		// lire le pixel A et combiner les couleurs
		pp_alpha = (pp_dh0+pp_dv0)*pp_coeff;
		index = (pp_x + pp_y * this.width) * 4;
		data[index] += pp_alpha*(r-data[index]);
		data[++index] += pp_alpha*(g-data[index]);
		data[++index] += pp_alpha*(b-data[index]);

		// pixel B
		pp_y++;
		if(pp_dv1) {
			pp_alpha = (pp_dh0+pp_dv1)*pp_coeff;
			index = (pp_x + pp_y * this.width) * 4;
			data[index] += pp_alpha*(r-data[index]);
			data[++index] += pp_alpha*(g-data[index]);
			data[++index] += pp_alpha*(b-data[index]);
		}

		// pixel C
		if(pp_dh1) {
			pp_x++;
			if(pp_dv1) {
				pp_alpha = (pp_dh1+pp_dv1)*pp_coeff;
				index = (pp_x + pp_y * this.width) * 4;
				data[index] += pp_alpha*(r-data[index]);
				data[++index] += pp_alpha*(g-data[index]);
				data[++index] += pp_alpha*(b-data[index]);
			}
			// pixel D
			pp_y--;
			pp_alpha = (pp_dh1+pp_dv0)*pp_coeff;
			index = (pp_x + pp_y * this.width) * 4;
			data[index] += pp_alpha*(r-data[index]);
			data[++index] += pp_alpha*(g-data[index]);
			data[++index] += pp_alpha*(b-data[index]);
		}
   }
}		
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.draw_image=function(img,x,y) {
	this.ctx.drawImage(img,x,y);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.fade_background = function(qtt) {
	var fond={
		main: false, // n'est pas compté comme objet "vivant"
		alpha:0.05,
		decal:0,
		cell_size:4,
		qtt:qtt,
		x:0,
		y:0,
		data: [ [0,0],[2,2],[2,0],[0,2],[3,1],[3,3],[1,3],[1,1],[3,0],[1,2],[1,0],[3,2],[0,1],[2,1],[2,3],[0,3] ]
	};
	
	fond.on_event=function(event) {
		if(event=='do') {
			var index,r,g,b;
			var inv_alpha=1-this.alpha;
			var color=[0,0,0];
			var data=this.art.data;
			for(var i=0;i<this.qtt;i++) {
				index=( this.x+this.data[this.decal][0] + (this.y+this.data[this.decal][1]) * this.art.width) * 4;
				data[index]=~~(data[index]*inv_alpha+color[0]*this.alpha);
				data[index+1]=~~(data[index+1]*inv_alpha+color[1]*this.alpha);
				data[index+2]=~~(data[index+2]*inv_alpha+color[2]*this.alpha);
				this.x+=this.cell_size;
				if(this.x>=this.art.width) {
					this.x=0;
					this.y+=this.cell_size;
					if(this.y>=this.art.height) {
						this.y=0;
						this.decal++;
						if(this.decal>=this.data.length) this.decal=0;
					}
				}
			}
		}
	};
	
	return this.create_tool(fond);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.to_int=function(v,vdf) {
	var ret=parseInt(v);
	if(isNaN(ret)) ret=vdf || 0;
	return ret;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.to_float=function(v,vdf) {
	var ret=parseFloat(v);
	if(isNaN(ret)) ret=vdf || 0;
	return ret;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.deg_rad= 57.29577; 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.get_int_value=function(txt) {
	var ret=txt;
	if(typeof(txt)=='string') {
		// la valeur peut être du type "(n)(~a)"
			// ex : 100~50 (100 plus ou moins une valeur aléatoire de 0 à 50, donc valeur finale entre 50 et 150)
			// ex : ~100 (valeur aléatoire de 0 à 100)
			// ex : -50~10 (valeur aléatoire de -60 à -40)
		var r=txt.toString().match(/([^~]*)~*(.*)/);
		var ret = this.to_int(r[1]);
		if(r[2]!="") {
			var alea_arg = this.to_int(r[2]);
			if(r[1]!="") ret += (Math.random() * alea_arg*2) - alea_arg;
			else ret = Math.random() * alea_arg;
		}
		ret=this.to_int(ret);
	}
	return ret;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.calc_point=function(angle, distance, p_ref) {
	var a = angle / this.deg_rad;
	// il faut soustraire le sin(a) pour les ordonnées car y=0 est en haut de l'écran
	// alors que la fonction sin() suppose une origine en BAS à gauche
	return [this.to_int((Math.cos(a) * distance) + p_ref[0]), this.to_int((- Math.sin(a) * distance) + p_ref[1])];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.get_couple_value=function(txt, sep) {
	var ret=txt;
	if(typeof(txt)=='string') {
		sep = sep || ',';
		var re=new RegExp("(.*)"+sep+"(.*)","i");
		var r=re.exec(txt);
		if(r) ret=[this.get_int_value(r[1]), this.get_int_value(r[2])];
	}
	return ret;	
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.calc_angle_distance=function(p1,p2) {
	// calculer angle et distance entre les points x1,y1 et x2,y2
	var distance = Math.sqrt((p2[0]-p1[0])*(p2[0]-p1[0])+(p2[1]-p1[1])*(p2[1]-p1[1]));
	var angle;
	if(distance) angle=this.to_int(Math.acos((p2[0]-p1[0])/distance) * this.deg_rad);
	else angle=0;
	if(p2[1]>p1[1]) angle = -angle;
	return [angle, this.to_int(distance)];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.get_point_value=function(txt, angle, distance, p_ref) {
	var ret=txt;
	if(typeof(txt)=='string') {
		ret=[0,0];
		// voir si valeur avec paramètre (commence par @)
		var r=txt.toString().match(/^@(.*)/) 
		if(r) {
			// la 2ème valeur est la capture
			//ret=[ this.get_int_value(this.params.value(r[1]+"_x")),  this.get_int_value(this.params.value(r[1]+"_y"))];
		}
		else {
			// le séparateur de coordonnées peut être le > (angle>dist) ou la virgule (x,y)
			r=txt.toString().match(/(.*)>(.*)/) 
			if(r) {
				if(r[1]!="") angle=this.get_int_value(r[1]);
				if(r[2]!="") distance=this.get_int_value(r[2]);
				ret=this.calc_point(angle, distance, p_ref);
			}
			else {
				ret=this.get_couple_value(txt);
			}
		}
	}
	return ret;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.get_color_rect=function(x1, y1, x2, y2, color) {
	x1=~~x1;
	x2=~~x2;
	y1=~~y1;
	y2=~~y2;
	// si on est en dehors de l'écran, retourner la couleur de fond
	if(x2>=0 && x1<this.width && y2>=0 && y1<this.height) {
		if(x1<0) x1=0; if(x2>this.width) x2=this.width;
		if(y1<0) y1=0; if(y2>this.height) y2=this.height;
	
		var x,y,r,g,b;
		r=g=b=0;
		var color=[];
		for(x=x1; x<x2; x++) {
			for(y=y1; y<y2; y++) {
				this.get_pixel(x,y,color);
				r+=color[0]; g+=color[1]; b+=color[2];
			}
		}
		// nombre de pixels du carré
		x=(x2-x1)*(y2-y1);
		if(x==0) x=1;
		// moyenne RVB
		color[0]=~~(r/x);
		color[1]=~~(g/x);
		color[2]=~~(b/x);
	}
	else {
		color[0]=this.background[0];
		color[1]=this.background[1];
		color[2]=this.background[2];
	}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.get_color_diff=function(c1,c2) {
	return Math.max(Math.abs(c1[0]-c2[0]),Math.abs(c1[1]-c2[1]),Math.abs(c1[2]-c2[2]));
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.pt_random=function(pt,rnd) {
	if(rnd) {
		pt[0] += Math.random() * rnd - rnd/2;
		pt[1] += Math.random() * rnd - rnd/2;
	}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.calc_bezier_points = function(p1,c1,c2,p2,step) {
	var x,y,t1;	
	var xl=p1[0]-1;
	var yl=p1[1]-1;
	var t=0;
	if(typeof step=='undefined') step=5;
	if(step<1) step=1;
	step=~~step;
	var f=1;
	var k=1.1;
	var pts=new Array();
	
	while(t<=1) {
		t1=1-t;
		x=t1*t1*t1*p1[0] + 3*t1*t1*t*c1[0] + 3*t1*t*t*c2[0] + t*t*t*p2[0];
		y=t1*t1*t1*p1[1] + 3*t1*t1*t*c1[1] + 3*t1*t*t*c2[1] + t*t*t*p2[1];

		if(x!=xl || y!=yl) {
			if(x-xl>step || y-yl>step || xl-x>step || yl-y>step) {
				t-=f;
				f=f/k;
			}
			else {
				pts[pts.length]=[x,y];  
				xl=x;
				yl=y;
			}
		}
		else {
			t-=f;
			f=f*k;
		}
		t+=f;
	}
	return pts;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.calc_bezier_length = function(p1,c1,c2,p2) {
	// calculer la longueur de la courbe de bezier, avec une approximation par segments de 10 pixels
	var pts=this.calc_bezier_points(p1,c1,c2,p2,10);
	var ret=0;
	var v1,v2;
	for(var i=1;i<pts.length;i++) {
		v1=pts[i-1][0]-pts[i][0];
		v2=pts[i-1][1]-pts[i][1];		
		ret+=Math.sqrt(v1*v1+v2*v2);
	}
	return ret;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//==============================================================================================================================
//==============================================================================================================================

Art.prototype.palette_add = function(id, r1, g1, b1, r2, g2, b2) {
	r1=parseInt(r1);
	g1=parseInt(g1);
	b1=parseInt(b1);
	if(typeof r2=='undefined') r2=r1; else r2=parseInt(r2);
	if(typeof g2=='undefined') g2=g1; else g2=parseInt(g2);
	if(typeof b2=='undefined') b2=b1; else b2=parseInt(b2);
	this.palettes[id]={r1:r1,g1:g1,b1:b1,r2:r2,g2:g2,b2:b2};
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.palette_get = function(id) {
	var r=0;
	var g=0;
	var b=0;
	var p=this.palettes[id];
	if(p) {
		var a = Math.random();
		r = p.r1 + Math.round((p.r2-p.r1) * a);
		g = p.g1 + Math.round((p.g2-p.g1) * a);
		b = p.b1 + Math.round((p.b2-p.b1) * a);
	}
	return [r,g,b,0];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.palette_color=function(v) {
	if(typeof(v)=="string") return this.palette_get(v);
	else return v;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//==============================================================================================================================
//==============================================================================================================================
function Art_Param(art, props) {
	// définir la cible du paramètre avec les 2 props : 'object' et 'object_prop'
	// props : {start:100,start_random:50,end:1000,end_random:50,qtt:10,extension_mode:'none/restart/reverse'}
	for(var k in props) this[k]=props[k];
	this.start=parseInt(this.start);
	if(typeof this.start_random=='undefined') this.start_random=0; else this.start_random=parseInt(this.start_random);
	this.end=parseInt(this.end);
	if(typeof this.end_random=='undefined') this.end_random=0; else this.end_random=parseInt(this.end_random);
	// if param is time-dependent (expressed in milliseconds)
	if(this.delay)  
		this.delay=parseFloat(this.delay);
	else {
		this.qtt=parseInt(this.qtt);
		if(this.qtt<1) this.qtt=1;
	}
	this.extension_mode=this.extension_mode || 'reverse';
	if(typeof this.enabled=='undefined') this.enabled=true;
	this.init=1;
	this.value=0;
	this.id=++art.idgen;
	this.art=art;
	art.params[this.id]=this;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.create_param=function(p) { return new Art_Param(this, p); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Param.prototype.done=function() {
	if(this.art.params[this.id]) delete this.art.params[this.id];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Param.prototype.restart=function() { this.init=1; }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Param.prototype.value=function() { return this.value; }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.params_do=function() {
	var suppr=[];
	for(var k in this.params) {
		var p=this.params[k];
		if(p.enabled) {
			var update_object=true;
			if(p.init) {
				p.start_1 = p.start;
				if(p.start_random) p.start_1 += Math.random() * p.start_random*2 - p.start_random;				
				p.end_1 = p.end;
				if(p.end_random) p.end_1 += Math.random() * p.end_random*2 - p.end_random;
				p.value = p.start_1;
				if(p.delay) {
					p.time_start=p.time_last=new Date();
					p.step=(p.end_1-p.start_1) / p.delay; // value to add per elapsed milliseconds
				}
				else {
					// adapter le sens du pas au sens de l'intervalle deb/fin
					p.step = (p.end_1-p.start_1) / p.qtt;
					p.index=0;
				}
				p.init = 0;			
				if(p.on_event) p.on_event("init");
			}
			else {		
				var over;				
				if(p.delay) {
					p.time_now=new Date();
					over=(p.time_now-p.time_start)>p.delay;
				}
				else {
					over=p.index>=p.qtt;
				}
				if(over) {
					// on est arrivé à la fin de l'intervalle, voir si il faut boucler et comment
					if(p.extension_mode=='none') {
						if(p.on_event) p.on_event('end_value');
					}
					else {
						if(p.extension_mode=='reverse') {
							var tmp1 = p.end;
							var tmp2 = p.end_random;
							p.end = p.start;
							p.end_random = p.start_random;
							p.start = tmp1;
							p.start_random = tmp2;
						}
						// réinitialiser sans changer la valeur courante
						p.init = 1;
					}
				}
				else {
					if(p.delay) {
						if(p.time_now-p.time_last>.05) {
							// number of elapsed milliseconds since last test, multiplied by step (value per millisecond)						
							p.value += (p.time_now-p.time_last)*p.step;
							p.time_last=p.time_now;
						}
						else update_object=false;
					}
					else {
						p.index++;
						p.value += p.step;
					}
					if((p.step>0 && p.value>p.end_1) || (p.step<0 && p.value<p.end_1)) p.value=p.end_1;
					if(p.on_event) p.on_event("do");
				}
			}
			// mettre à jour la cible si définie
			if(update_object && p.object && typeof(p.object)=='object' && p.object_prop) {
				p.object[p.object_prop]=p.value;
			}
			else suppr.push(p.id);
		}
	}
	var n=suppr.length;
	while(n--) delete this.params[suppr[n-1]];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//==============================================================================================================================
//==============================================================================================================================
function Art_Tool(art, props) {
	props.translation_x = props.translation_y = props.rotation_angle = props.rotation_angle_rad = 0;
	props.scale_x = props.scale_y = 100;
	this.art=art;
	props.id=++art.idgen;
	art.tools[props.id]=this;
	this.set(props);	
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.create_tool=function(p) { return new Art_Tool(this, p); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Tool.prototype.set=function(props) {
	for(var k in props) this[k]=props[k];
	this.state='alive';
	// sauvegarder les valeurs d'origine des propriétés
	this.save={};
	for(var k in this) {
		var v=this[k];
		if(typeof(v)!="object" && typeof(v)!="function") {
			if(typeof(v)=="string") {
				v=v.replace(/width/gi, this.art.width);
				v=v.replace(/height/gi, this.art.height);
				v=v.replace(/radius/gi, "+~360>"); // C1:radius10 remplacé par C1:+~360>~10
				v=v.replace(/origin/gi, "0,0");
				v=v.replace(/\[(.*)\]/gi, function(txt,cap) { return this[cap];});
				this[k]=v;
			}
			this.save[k]=v;
		}
	}
	this.events_do("eval");
	this.events_do("init");
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Tool.prototype.events_do=function(event) {
	if(event=="eval") {
		if(this.position) {
			var r=this.art.get_point_value(this.position, 0, 0, [0,0] );
			this.translation_x=r[0];
			this.translation_y=r[1];
		}
		if(this.rotation) {
			this.rotation_angle = this.art.get_int_value(this.rotation);
			this.rotation_angle_rad = this.rotation_angle / this.art.deg_rad;
		}
		if(this.scale) {
			// 'scale' peut être une valeur seule ou un couple t1,t2
			var r=this.art.get_couple_value(this.scale);
			if(r) {
				this.scale_x=r[0];
				this.scale_y=r[1];
			}
			else this.scale_x=this.scale_y=this.art.get_int_value(this.scale);
		}
	}	
	if(this.on_event) this.on_event(event);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.tools_do=function() {
	var k,t;
	var suppr=[];
	var ret=false;
	for(k in this.tools) {
		t=this.tools[k];
		if(t.state=='alive') {
			// les objets 'main:false' n'empêchent pas l'art de se terminer
			if(t.main!==false) ret=true;
			t.events_do('do');
		}
		// supprimer après la boucle
		else if(t.state=='done') suppr.push(k);
	}
	var n=suppr.length;
	while(n--) delete this.tools[suppr[n-1]];
	return ret;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Tool.prototype.alive=function() { this.state='alive'; }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Tool.prototype.pause=function() { this.state='pause'; }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Tool.prototype.done=function() {
	this.state='done';
	this.events_do("done");
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Tool.prototype.transform_coord=function(p) {
	// p est un tableau contenant x,y
	// facteur d'echelle
	var x1 = p[0] * this.scale_x / 100;
	var y1 = p[1] * this.scale_y / 100;
	// rotation
	var x2 = Math.cos(this.rotation_angle_rad)*x1 + Math.sin(this.rotation_angle_rad)*y1;
	var y2 = -Math.sin(this.rotation_angle_rad)*x1 + Math.cos(this.rotation_angle_rad)*y1;
	// translation
	return [this.translation_x + x2, this.translation_y + y2];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Tool.prototype.untransform_coord=function(p) {
	// annuler la translation
	var x1 = p[0] - this.translation_x;
	var y1 = p[1] - this.translation_y;
	// effectuer une rotation en sens inverse
	var x2 = Math.cos(-this.rotation_angle_rad)*x1 + Math.sin(-this.rotation_angle_rad)*y1;
	var y2 = -Math.sin(-this.rotation_angle_rad)*x1 + Math.cos(-this.rotation_angle_rad)*y1;
	// annuler le facteur d'échelle (non nul)
	return [ x2 / this.scale_x * 100, y2 / this.scale_y * 100];
}

//==============================================================================================================================
//==============================================================================================================================

function Art_Brush(art, id, props) {
	for(var k in props) this[k]=props[k];
	this.id=id;
	this.art=art;
	this.precision=props.precision || 1;
	this.ready=true;
	if(props.url) {
		this.data=[];
		this.ready=false;
		this.width=0;
		this.height=0;
		var img=new Image();
		img.onload=function() {
			var brush=art.get_brush(id);
			brush.width=img.width;
			brush.height=img.height;
			brush.ready=true;
			var canvas=document.createElement('canvas');
			canvas.width=img.width;
			canvas.height=img.height;
			var ctx=canvas.getContext('2d');            
			ctx.drawImage(img,0,0);
			var imgdata=ctx.getImageData(0,0,img.width, img.height);			
			for(var i=0;i<imgdata.data.length;i+=4) brush.data[i/4]=~~((imgdata.data[i]+imgdata.data[i+1]+imgdata.data[i+2])/3);
			delete canvas;
		}
		img.src=props.url;
	}
	art.brushes[id]=this;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Brush.prototype.draw=function(p, color, pressure) {
	if(this.ready) {
		// décaler x et y en fonction de la taille de la brosse
		var x = p[0] - this.width/2;
		var y = p[1] - this.height/2;
		var ind = 0;
		var i,j;
		var p1=[];
		var invp = 255 - pressure;
		var data=this.data;
		var precision=this.precision;
		var w=this.width;
		var h=this.height;
		var random=Math.random;
		
		for(i=0; i<h; i++) {
			for(j=0; j<w; j++) {
				if(data[ind] > invp) {
					p1[0] = x + j;
					p1[1] = y + i;
					if(precision) {
						p1[0] += random() * precision - precision/2;
						p1[1] += random() * precision - precision/2;
					}
					this.art.put_pixel_AA(p1, color);
				}
				ind++;
			}
		}
	}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.create_brush=function(id, p) { return new Art_Brush(this,id,p); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.get_brush=function(id) { return this.brushes[id]; }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//==============================================================================================================================
//==============================================================================================================================
function Art_Stroke(art, props) {
	props.step= props.step|| 3;
	props.precision = props.precision || 0;
	props.distance = props.distance || 50;
	props.c1 = props.c1 || "+0>0";
	props.c2 = props.c2 || "+0>0";
	props.brush_name = props.brush_name || "std";
	props.pressure = props.pressure || 255; // maximum
	props.color = props.color ||[0,0,0];
	if(props.color_stop) {
		props.color_stop_tolerance = props.color_stop_tolerance || 100; //de 1 à 255
		props.color_stop_state = -1;
	}
	props.p1 = props.p1 || [0,0];
	props.p2 = props.p2 || [0,0];
	props.c1 = props.c1 || [0,0];
	props.c2 = props.c2 || [0,0];
	props.angle = props.angle || 0;

	Art_Tool.call(this,art,props);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
for(var k in Art_Tool.prototype) Art_Stroke.prototype[k]=Art_Tool.prototype[k];
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Stroke.prototype.events_do=function(event) {
	Art.prototype.events_do.call(this, event);
	if(event=="eval") {
		if(this.save.p1) this.p1=this.get_point_value(this.save.p1, [0,0]);
		if(this.save.p2) this.p2=this.get_point_value(this.save.p2, this.p1);
		// points de contrôle des courbes de bézier
		if(this.save.c1)	this.c1=this.get_point_value(this.save.c1, this.p1);
		if(this.save.c2)	this.c2=this.get_point_value(this.save.c2, this.p2);
		
		if(this.save.color) this.color=this.art.palette_color(this.save.color);
		if(this.save.pressure) this.pressure = this.art.get_int_value(this.save.pressure);
		if(this.save.precision) this.precision = this.art.get_int_value(this.save.precision);
	}
	else if(event=='init') {
		// transformer tous les points (translation, rotation, échelle)
		var r=this.art.calc_angle_distance(this.p1, this.p2);
		this.angle=r[0];
		this.distance=r[1];
		this.p1=this.transform_coord(this.p1);
		this.p2=this.transform_coord(this.p2);
		this.c1=this.transform_coord(this.c1);
		this.c2=this.transform_coord(this.c2);
		// point courant au départ
		this.p = this.p1;
		this.speed = this.speed || 1;
		if(this.speed<1) this.speed=1;
		this.color_stop_state= -1;
		this.color_found = false;
		this.cur_ind_point=0;
		this.brush=this.art.get_brush(this.brush_name);
		this.pts_spline=this.art.calc_bezier_points(this.p1, this.c1, this.c2, this.p2,this.step); 
	}
	else if(event=="do") {
		var color_found;
		var xy_color=[];
		for(var i=0;i<this.speed;i++) {
			var b_trace= this.cur_ind_point < this.pts_spline.length;
			if(b_trace) {
				// avancer le point x/y
				this.p = this.pts_spline[this.cur_ind_point++];
				// mode du tracé : faut-il s'arrêter si couleur de stop ?
				if(this.color_stop) {
					// ne pas tenir compte de la largeur de la brosse théorique : appliquer un coef fonction de la pression
					var brush_width = ((this.brush.width + this.brush.height) /2) * this.pressure / 255;
					// voir sur quelle couleur on part
					if(this.color_stop_state==-1) {
						this.art.get_color_rect(this.p[0], this.p[1], this.p[0]+brush_width,this.p[1]+brush_width,xy_color);
						color_found = this.art.get_color_diff(xy_color,this.color_stop) < this.color_stop_tolerance;
						if(color_found)
							// on part de la couleur qui provoque l'arrêt du trait, donc attendre de
							// trouver 2 changements de couleurs pour arrêter (sinon on arrête tout de suite)
							this.color_stop_state=2;
						else
							//on part d'une couleur autre que celle qui provoque l'arrêt du trait
							this.color_stop_state=1;
					}
					// pendant le tracé du trait, détecter le changement de couleur
					else {
						// Ne pas examiner le carré de pixel à la position courante, puisque on va trouver
						// à cette position une partie de la brosse dessinée à l'itération précédente.
						// Examiner la couleur une demi-largeur de brosse plus loin, dans la direction
						// du tracé actuel
						// ... code incomplet : il faudrait ensuite continuer un peu le trait d'une longueur
						//                      égale à brush_width
						var r=this.get_current_direction();
						var x=this.p[0] + brush_width * r[0];
						var y=this.p[1] + brush_width * r[1];
						this.art.get_color_rect(x, y, x+brush_width, y+brush_width,xy_color);
						color_found = this.art.get_color_diff(xy_color,this.color_stop) < this.color_stop_tolerance;
						if(color_found!=this.color_found) this.color_stop_state--;
					}
					this.color_found = color_found;
					// si toutes les bascules ont eu lieu, arrêter le trait
					b_trace = this.color_stop_state>0;
				}
			}
			if(b_trace) {
				this.art.pt_random(this.p, this.precision);
				if(this.brush) this.brush.draw(this.p, this.color, this.pressure);
			}
			else {
				this.done();
			}
		}
	}
	
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.create_stroke=function(prop) { return new Art_Stroke(this, prop); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Stroke.prototype.get_current_direction=function() {
	// la direction tient compte des transformations de coord.
	var dx,dy;
	if(this.cur_ind_point<10 || this.cur_ind_point>=this.pts_spline.length+9) {
	   dx=this.p2[0] - this.p1[0];
	   dy=this.p2[1] - this.p1[1];	
	}
 	else {
		dx=this.p[0] - this.pts_spline[this.cur_ind_point-10][0];
		dy=this.p[1] - this.pts_spline[this.cur_ind_point-10][1];
	}
	var m = Math.max(Math.abs(dx),Math.abs(dy));
	if(m) {
		dx /= m;
		dy /= m;
	}
	return [dx,dy];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Stroke.prototype.get_coord=function(b_untransform) {
	var ret={};
	if(typeof b_untransform=='undefined') b_untransform=true;
	ret.p = this.p;
	ret.p1 = this.p1; ret.p2 = this.p2;
	ret.c1 = this.c1; ret.c2 = this.c2;
	if(b_untransform) {
		ret.p=this.untransform_coord(ret.p);
		ret.p1=this.untransform_coord(ret.p1);
		ret.p2=this.untransform_coord(ret.p2);
		ret.c1=this.untransform_coord(ret.c1);
		ret.c2=this.untransform_coord(ret.c2);
	}
	var r=this.art.calc_angle_distance(ret.p1,ret.p2);
	ret.angle=r[0];
	ret.distance=r[1];
	return ret;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Stroke.prototype.get_point=function(ind_point) {
	if(ind_point=='current') ind_point = this.cur_ind_point;
	if(ind_point < 0) ind_point = 0;
	else if(ind_point >= this.pts_spline.length) ind_point = this.pts_spline.length-1;
	return this.pts_spline[ind_point];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Stroke.prototype.get_point_value=function(txt, p_ref) {
	var p;
	if(txt=="*") 
		p=this.untransform_coord(this.p);
	else 
		p=this.art.get_point_value(txt, this.angle, this.distance, p_ref);
	return p;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//==============================================================================================================================
//==============================================================================================================================
function Art_Sound(art, id, props) {
	for(var k in props) this[k]=props[k];
	this.id=id;
	this.art=art;
	this.audio=new Audio();
	var ext='wav';
	if(this.audio.canPlayType('audio/mpeg')!='' || this.audio.canPlayType('audio/mp3')!='') ext='mp3';
	else if(this.audio.canPlayType("audio/ogg; codec='vorbis'")!='') ext='ogg';
	var url='';
	if(this.dir) {
		url=this.dir;
		if(url.substr(-1)!='/') url+='/';
	}
	this.url=url+this.name+"."+ext;
	this.audio.src=this.url;
	this.audio.load();
	this.audio.volume=0;
	if(this.loop) this.audio.addEventListener('ended', function(){ this.currentTime = 0; }, false);
	this.playing=false;
	art.sounds[id]=this;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.create_sound=function(id, props) {return new Art_Sound(this, id, props); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.get_sound=function(id) {return this.sounds[id]; }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art.prototype.play_sound=function(id, volume) {
	var s=this.sounds[id];
	if(s && s.audio && s.audio.readyState==4) {
		if(typeof volume=='undefined') volume=1;
		s.audio.volume=volume;
		s.audio.currentTime = 0;
		s.audio.play();
	}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Sound.prototype.play=function() { this.audio.play(); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Sound.prototype.fade_in=function(volume, delay) { this.fade(0, volume, delay); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Sound.prototype.fade_out=function(delay) { this.fade(this.audio.volume, 0, delay); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Sound.prototype.stop=function() {	this.audio.pause(); }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Art_Sound.prototype.fade=function(vol_start, vol_end, delay) {
	if(this.audio.readyState!=4) return;
	if(typeof delay=='undefined') delay=500;	
	if(!this.param_volume) {
		this.param_volume=this.art.create_param({
			sound:this,
			object:this.audio, 
			object_prop:'volume', 
			extension_mode:'none', 
			enabled:false,
			on_event: function(event) {
				if(event=='end_value') {
					if(!this.sound.playing) this.sound.audio.pause();
					this.enabled=false;
				}
			}
		});
	}
	this.param_volume.delay=delay;
	this.param_volume.start=vol_start;
	this.param_volume.end=vol_end;
	this.param_volume.enabled=true;
	this.param_volume.restart();
	if(vol_end==0){
		this.playing=false;
	}
	else if(vol_start==0) {
		this.audio.play();
		this.playing=true;
	}

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
