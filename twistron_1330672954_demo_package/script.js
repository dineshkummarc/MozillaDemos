
  //Settings
  var renderOnDemand = false;
  
  
  //Rest
  
  var w, h, iw, ih, gutterX, gutterY, spots, set, began = false;
  
    var ongoingTouches = [];
  
    var players = 1, curPlayer = 1,
        lockTimer, lockTimeNeeded = 500, // ms
        lastTouch, spotOwners = [],
        pphMode = false, hardCoreMode = false,
    
    //no of players :no of slots 
    sets = {
      1 : {cols: 3, rows: 3},
      2 : {cols: 4, rows: 3},
      3 : {cols: 4, rows: 4},
      4 : {cols: 5, rows: 4}
    };
    var touches = [];


  if(!renderOnDemand){
    // Setup a 60fps timer
    timer = setInterval(function() {
      renderTouches(touches);
    }, 15);
  }
    
      
  //Manage touches
  function ongoingTouchIndexById(idToFind) {  
    for (var i=0; i<ongoingTouches.length; i++) {  
      var id = ongoingTouches[i].identifier;  
        
      if (id == idToFind) {  
        return i;  
      }  
    }  
    return -1;
  }
  
  
  //Private
  function _pickLine(){
      var unused = $('.line-x:not([data-tid])');
      if(unused){
        return unused.eq(0).data('id');
    }else{
        return -1;        
    } 
  }
  
  function _removeLineByTouchId(id){
      $('div[data-tid='+id+']')
        .hide()
        .removeAttr('data-tid');
  }


  //RENDER
  function renderTouches(touches){
    var toRemoveHover = spots;
      
    for (var i = 0; i < touches.length; i++) {
      var touch = touches[i];
      
      var prevLines = $('div[data-tid='+touch.identifier+']');
      if(prevLines.length){ //has line already
          prevLines.filter('.line-x').css('top', touch.pageY).show();
          prevLines.filter('.line-y').css('left', touch.pageX).show();
      }else{ //get new line
          var lineNo = _pickLine();
          $('#lineX-'+lineNo).css('top', touch.pageY).show().attr('data-tid', touch.identifier);
          $('#lineY-'+lineNo).css('left', touch.pageX).show().attr('data-tid', touch.identifier);
      }
      
      //find the relevant spot
      var currentSpot = $(document.elementFromPoint(touch.pageX, touch.pageY));
      if(!currentSpot.is('.spot') && currentSpot.closest('.spot').length){
          currentSpot = currentSpot.closest('.spot');
      }
      
      if(currentSpot.is('.spot')){
        toRemoveHover = toRemoveHover.not(currentSpot);
        currentSpot.addClass('hovering p-' + spotOwners[touch.identifier]);
      }
    }
    if(hardCoreMode){
        toRemoveHover.removeClass('hovering');
    }
    
  }
  

  function renderUI(){
    w = $(window).width();
    h = $(window).height();
      
    set = {
      cols: (w > h ? sets[players]['cols'] : sets[players]['rows']),
      rows: (w > h ? sets[players]['rows'] : sets[players]['cols'])
    }; 
      
    iw = w / (set['cols'] + 1); // - 12;
    ih = h / (set['rows'] + 1); // - 12;
    gutterX = (w - (set['cols'] * iw)) / (set['cols'] + 1);
    gutterY = (h - (set['rows'] * ih)) / (set['rows'] + 1);
    
      
      //clear previous
    $('#main ul').empty();
    for(var row = 0; row < set['rows']; row++){
      for(var col = 0; col < set['cols']; col++){
        var li = $('<li><div class="spot"><div class="eyes"></div>' + (row * set['rows'] + col + 1) + '</div></li>');
        li.css('width', iw);
        li.css('height', ih);
        li.css('marginLeft', (gutterX * col) + ((iw * col) - 1));
        li.css('marginTop', (gutterY * (row + 1)) + ((ih * row) - 1));
  
        $('#main ul').append(li);
      }
    }
      
    //spots
    spots = $('.spot'); 
    spots
      .css('line-height', ih)
      .css('height', ih)
      .css('width', ih)
      .css('margin-left', Math.abs(iw-ih) / 2);
      
    if(pphMode){
        $('body').addClass('PPH');
    }
    
  }
  
  function renderMenu(){
      $('#menu input[name=start]').on('click', function(e){
         e.preventDefault();
         players = $('#menu select[name=players]').val();
         pphMode = $('#menu input[name=pphmode]').is(':checked');
         hardCoreMode = $('#menu input[name=hardCoreMode]').is(':checked');
         $('#menu').fadeOut();
         renderUI();
         initEvents();
      });
  }
  
  /* Game */
 function promptPlayer(autoIncrement){
     if((typeof autoIncrement == 'undefined' ) || (typeof autoIncrement != 'undefined' && autoIncrement)){
        curPlayer++;
     }
     
     curPlayer = (curPlayer > players?1:curPlayer);
     
     if(players > 1){
         $('#msg')
            .text('Player #' + curPlayer)
            .attr('class', 'p' + curPlayer)
            .fadeIn('fast');
     }
 }


 function lockSpot(touch){   
    if(typeof lockTimer != 'undefined'){
         clearTimeout(lockTimer);
    }
    lockTimer = setTimeout(function(touch){
        $('div[data-tid='+touch.indentifier+']')
            .addClass('locked');
            
        
        if($('div.spot').not('.hovering').length == 0){
            $('#grats').fadeIn();
        }
            
            
        promptPlayer();
    }, lockTimeNeeded, touch);
 }

  
  ////////////////////////  
  //TOUCH EVENT HANDLERS//
  ////////////////////////
  
  //Touch START
  function touchStart(event) {  
    event.preventDefault();
    var touches = event.changedTouches;
    for (var i=0; i<touches.length; i++) {
      spotOwners[touches[i].identifier] = curPlayer;
      ongoingTouches.push(touches[i]);
      lastTouch = touches[i];
    }
        
    lockSpot(lastTouch);
    
    if(renderOnDemand){
      renderTouches(ongoingTouches);
    }
  }
  
  //Touch MOVE
  function touchMove(event) {
    event.preventDefault();
    touches = event.changedTouches;
    
    for(var i=0;i<touches.length;i++){
        var idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1, touches[i]);
    }
    
    if(renderOnDemand){
      renderTouches(ongoingTouches);
    }
  }
    
  //Touch END
  function touchEnd(event) {
    event.preventDefault();
    var touches = event.changedTouches;
    for (var i=0; i<touches.length; i++) {  
      _removeLineByTouchId(touches[i].identifier);
      $('div[data-tid='+touches[i].identifier+']')
        .removeClass('hovering forced')
        .removeAttr('data-tid');
      ongoingTouches.splice(i, 1);
    }  
    
    if(renderOnDemand){
      renderTouches(ongoingTouches);
    }
  }
  
  function touchCancel(event) {
    event.preventDefault();  
    var touches = event.changedTouches;  
    
    for (var i=0; i<touches.length; i++) {
      _removeLineByTouchId(touches[i].identifier);  
      ongoingTouches.splice(i, 1);  
    }
    if(renderOnDemand){
      renderTouches(ongoingTouches);
    }
  } 
       
  //Enforce rerendering on resize or orientation change
  $(window).on('resize',renderUI);
  
  //INIT
  function initEvents(){
    document.body.addEventListener("touchstart", touchStart, false);  
    document.body.addEventListener("touchend", touchEnd, false);  
    document.body.addEventListener("touchcancel", touchCancel, false);  
    document.body.addEventListener("touchleave", touchEnd, false);  
    document.body.addEventListener("touchmove", touchMove, false);
    
    
    promptPlayer(false);
  }

  function init(){
    $(document).ready(function(){
      for(var i=0;i < 24;i++){
        $('body').append('<div id="lineX-'+i+'" class="lines line-x line-'+i+'" data-id="'+i+'"></div><div id="lineY-'+i+'" class="lines line-y line-'+i+'" data-id="'+i+'"></div>');
      }
      
      $('#grats a').on('click', function(e){
        self.location.reload();
        e.preventDefault();
        return false;
      })
    });
  
    renderMenu();
  }
  init();
