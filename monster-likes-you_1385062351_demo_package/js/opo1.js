//#######################################################
			var character;
			var config = {

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

				character = new THREE.MD2Character();
				character.scale = 3;

				character.onLoadComplete = function() { }

				character.loadParts( config );
//#######################################################