$(function(){

  //no retweets
  //time scale
  //galery of images and video from the tweet
  //have a heat map and then 
  //integrate twitters user's lists
  //cross referencing 
  var map = new L.Map('map'), latestTweet, queue = [];
  
  var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/43782/256/{z}/{x}/{y}.png', cloudmadeAttribution = '', cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
  
  if (Modernizr.geolocation) {
  
    navigator.geolocation.getCurrentPosition(show_map);
    
  } else {
  
    alert('your browser does not support geolocation')
    
  }
  
  function show_map( location ){
  
    map.setView( new L.LatLng( location.coords.latitude, location.coords.longitude ), 10 ).addLayer( cloudmade );
    
    var circleLocation = new L.LatLng( location.coords.latitude, location.coords.longitude ),
		circleOptions = {color: '#000', opacity: 0.5, weight:1},
		circle = new L.Circle( circleLocation, 20000, circleOptions );
	
  	circle.on('click', function( e ) {
  	
      onCircleClick( e )
        
    });
  	
  	map.addLayer(circle);
  	
  	//map.on('click', onMapClick);
  	
    var marker = new L.Marker( new L.LatLng( location.coords.latitude, location.coords.longitude ) );
    
    map.addLayer(marker);
    
    fetchTweets( '?geocode=' + location.coords.latitude + ',' + location.coords.longitude + ',20km&&rpp=100&callback=?' )
    var interval = setInterval(function(){
        fetchTweets('?since_id='+ latestTweet +'&geocode=' + location.coords.latitude + ',' + location.coords.longitude + ',20km&&rpp=100&callback=?', true)
      
    }, 10000)
    
  
  }
  
  function fetchTweets( q, latest ){
    
     
    $.getJSON('http://search.twitter.com/search.json'+ q + '', function (data) {
    
      console.log( data )
      console.log( queue.length )
      $('#new-tweets-bar').text('' + queue.length + ' new tweets');
      
      if( queue.length > 0){
        $('#new-tweets-bar').click(function(){displayAndEmptyQ()})
        $('#new-tweets-bar').css('display', 'block');
      
      }
      
      //$('#results').empty();
	    
	    $.each(data.results, function( i, t ){
	    
            if( i === 0){
            
              latestTweet = t.id;
              console.log()
            
            }
            
  	        if( t.geo ){
  	          
  	          var lat = t.geo.coordinates[0], lng = t.geo.coordinates[1];
  	          var marker = new L.Marker(new L.LatLng(lat, lng));
              map.addLayer(marker);
  	           
  	        }
  	        
  	        if( latest ){
  	        
  	          queue.push( t )
  	         
  	          
  	          
  	          
  	        }else{
  	        
  	        $('#results').append('<div class="stream-item"><div class="tweet"><span style="padding-left:10px; float:left; width:50px; "><img src="' + t.profile_image_url + '" /></span><span style="vertical-align:top; float:left;font-size:11px;  padding-left:10px; width:350px;"><b>' + t.from_user + '</b> <br />' + t.text + ' <br /><span style="font-size:10px;">'+ t.created_at +'</span></span></div></div')
  	        
  	       }
  	       
	    })

    })

  }
			
	function onMapClick(e) {
	  
		var circleLocation = new L.LatLng( e.latlng.lat, e.latlng.lng ),
		circleOptions = {color: '#000', opacity: 0.5, weight:1},
		circle = new L.Circle( circleLocation, 2000, circleOptions );
	
  	circle.on('click', function( e ) {
  	  
      onCircleClick( e )
        
    });

    map.addLayer(circle);
		
		$.getJSON('http://search.twitter.com/search.json?geocode=' + e.latlng.lat + ',' + e.latlng.lng + ',1km&&rpp=100&callback=?', function (data) {
	    
	    console.log( data )
	    $('#results').empty();
	    $.each(data.results, function(i, t){

	        console.log( t.created_at );
	        
	        if( t.geo ){
	          
	          var lat = t.geo.coordinates[0], lng = t.geo.coordinates[1];
	          var marker = new L.Marker(new L.LatLng(lat, lng));
            map.addLayer(marker);
	           
	        }
	        
	        $('#results').append('<div style="padding: 5px;"><span><img src="' + t.profile_image_url + '" /></span><span style="vertical-align:top;">' + t.text + ' <br />'+ t.created_at +'</span></div')
	    
	    })
	
		})
		
	}
	
	function onCircleClick( e ){
	
	  console.log( 'event = %o', e )
	
	}
	
	function displayAndEmptyQ(){
	
	  $.each(queue, function(i, t){

	        console.log( t.created_at );
	        
	        if( t.geo ){
	          
	          var lat = t.geo.coordinates[0], lng = t.geo.coordinates[1];
	          var marker = new L.Marker(new L.LatLng(lat, lng));
            map.addLayer(marker);
	           
	        }
	        
	        
	     $('#results').prepend('<div class="stream-item"><div class="tweet"><span style="padding-left:10px; float:left; width:50px; "><img src="' + t.profile_image_url + '" /></span><span style="vertical-align:top; float:left;font-size:11px;  padding-left:10px; width:350px;"><b>' + t.from_user + '</b> <br />' + t.text + ' <br /><span style="font-size:10px;">'+ t.created_at +'</span></span></div></div')
	     
	     if( i === queue.length - 1 ){
	      
	      queue = [];
	      $('#new-tweets-bar').css('display', 'none');
	      
	     }
	    
	    })
	
	
	
	}

})