(function($) {


    $('.flip-card').click(function() {
        $(this).toggleClass('flipped');
        console.log('clicked');
        console.log(this);
    })


}(jQuery))