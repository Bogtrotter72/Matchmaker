(function($) {


    // Rotate main menu buttons out and level select buttons in
    $('.btn-selectLevel').click(function() {
        $('.btn-selectLevel').css('transform', 'translateX(-100px) rotateY(-90deg)').delay(1300).fadeOut();
        
        $('.btn-credits').css({
            'transform': 'translateX(-100px) rotateY(-90deg)',
            'transition-delay': '0.5s'
        }).delay(1300).fadeOut();
        
        $('.btn-quit').css({
            'transform': 'translateX(-100px) rotateY(-90deg)',
            'transition-delay': '1.0s'
        }).delay(1300).fadeOut();

        $('.btn-wrapper__level-select').fadeIn();

        $('.btn-beginner').fadeIn('slow').css({
            'transform': 'rotateY(0deg)',
            'opacity': 1,
            'transition-delay': '1.5s'
        });

        $('.btn-beginner').css({
            'transform': 'translateX(-150px)',
            'transition-delay': '2.6s'
        });

        $('.btn-intermediate').fadeIn('slow').css({
            'transform': 'rotateY(0deg)',
            'opacity': 1,
            'transition-delay': '2.5s'
        });

        $('.btn-intermediate').css({
            'transform': 'translateX(-150px)',
            'transition-delay': '3.1s'
        });

        $('.btn-advanced').fadeIn('slow').css({
            'transform': 'rotateY(0deg)',
            'opacity': 1,
            'transition-delay': '3.0s'
        });

        $('.btn-advanced').css({
            'transform': 'translateX(-150px)',
            'transition-delay': '3.6s'
        });

    })
    
    $('.btn__level-select').click(function() {
        $('.btn__level-select').fadeOut('slow');
        $('.btn-wrapper__level-select').fadeOut('slow');
        $('.flip-card-game-container').fadeIn('slow').css('display', 'flex');
        console.log('Hooray!');
    });

    $('.flip-card').click(function() {
        $(this).toggleClass('flipped');
        console.log('clicked');
        console.log(this);
    })

}(jQuery))