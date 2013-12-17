function CONGO(){
				// CHARACTER// CHARACTER// CHARACTER// CHARACTER// CHARACTER// CHARACTER// CHARACTER// CHARACTER// CHARACTER// CHARACTER// CHARACTER
				var configOgro = {
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
								],
					animations: {
						move: "run",
						idle: "stand",
						jump: "jump",
						attack: "attack",
						crouchMove: "cwalk",
						crouchIdle: "cstand",
						crouchAttach: "crattack"
					},
					walkSpeed: 350,
					crouchSpeed: 175
				};
//####################
//TEST BEGIN
//####################
				var nRows = 1;
				var nSkins = 1;// configOgro.skins.length;
				 
				nCharacters = nSkins * nRows ;

				for ( var i = 0; i < nCharacters; i ++ ) {

					var character = new THREE.MD2CharacterComplex();
					character.scale = 3;
					
					 
					character.controls = controls;
					 
					
					characters.push( character );

				}

				var baseCharacter = new THREE.MD2CharacterComplex();
				baseCharacter.scale = 3;

				baseCharacter.onLoadComplete = function () {

					var k = 0;
								
					for ( var j = 0; j < nRows; j ++ ) {

						for ( var i = 0; i < nSkins; i ++ ) {

							var cloneCharacter = characters[ k ];

							cloneCharacter.shareParts( baseCharacter );

							cloneCharacter.enableShadows( true );
 
						//	cloneCharacter.setWeapon( 0 );
							cloneCharacter.setSkin( i );

							cloneCharacter.root.position.x = ( i - nSkins/2 ) * 150;
							cloneCharacter.root.position.z = j * 250;
							window["cloneCharacter"]=cloneCharacter;
                             
							window["player"]= cloneCharacter.root;
							scene.add(window["player"]); 
							  
							k ++;

							//
											
 
							//
							
						}

					}

					var gyro = new THREE.Gyroscope();
					gyro.add( camera );

					characters[ Math.floor( nSkins/2 ) ].root.add( gyro );

				};

				baseCharacter.loadParts( configOgro );
				


}