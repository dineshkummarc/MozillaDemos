jQuery(function(){
    // initialize of labels
    $('.labels div#label1').fadeIn(100).effect('bounce', { times:3 }, 300, function() {
        $('.labels div#label2').fadeIn(100).effect('bounce', { times:3 }, 300, function() {
            $('.labels div#label3').fadeIn(100).effect('bounce', { times:3 }, 300, function() {
                $('.labels div#label4').fadeIn(100).effect('bounce', { times:3 }, 300, function() {
                    $('.labels div#label5').fadeIn(100).effect('bounce', { times:3 }, 300, function() {
                        $('.labels div#label6').fadeIn(100).effect('bounce', { times:3 }, 300);
                    });
                });
            });
        });
    });

    // dialog close
    $('.dialog .close').click(function() {
        $(this).parent().fadeOut(500);
        return false;
    });

    // display dialog on click by labels
    $('.labels div').click(function() {
        $('.dialog p').html( $(this).find('p').html() ).parent().fadeIn(500);
        return false;
    });

    // close dialog on click outside
    $('.container').click(function() {
        $('.dialog').fadeOut(500);
    });
});