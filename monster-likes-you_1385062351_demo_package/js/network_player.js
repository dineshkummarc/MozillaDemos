///////////////////////
 	 	var character1;
//#######################################################
 function CREATE_NET_PLAYER(MY_NET_ID){
			var config1 = {

					baseUrl: "models/animated/ratamahatta/",

					body: "ratamahatta.js",
					skins: [ "ratamahatta.png", "ctf_b.png", "ctf_r.png", "dead.png", "gearwhore.png" ],
					weapons:  [  [ "weapon.js", "weapon.png" ],
								 [ "w_bfg.js", "w_bfg.png" ],
								 [ "w_blaster.js", "w_blaster.png" ],
								 [ "w_chaingun.js", "w_chaingun.png" ],
								 [ "w_glauncher.js", "w_glauncher.png" ],
								 [ "w_hyperblaster.js", "w_hyperblaster.png" ],
								 [ "w_machinegun.js", "w_machinegun.png" ],
								 [ "w_railgun.js", "w_railgun.png" ],
								 [ "w_rlauncher.js", "w_rlauncher.png" ],
								 [ "w_shotgun.js", "w_shotgun.png" ],
								 [ "w_sshotgun.js", "w_sshotgun.png" ]
								]

				};

				window["character1"+MY_NET_ID] = new THREE.MD2Character();
				window["character1"+MY_NET_ID].scale = 3;
				window["character1"+MY_NET_ID].onLoadComplete = function() {   }
				window["character1"+MY_NET_ID].loadParts( config1 );
	            window["objekat_netPLAYER"+MY_NET_ID] = window["character1"+MY_NET_ID];
                //console.log(window["objekat" + GLOBAL_OBJECT_INDEX].root + "OVO JE INDEX ZA OPO1" + GLOBAL_OBJECT_INDEX );
 }