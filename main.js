(function($) {

    var cardFlipped = false;
    var firstCard, secondCard;
    var lockBoard = false;

    
    // shuffleCards(imageArray);

    $('.flip-card-back').each(function() {
        $(this).attr('src', 'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/card-back_dy1srw.png');
    });
   
    (function shuffleCards(imageArray) {
       var imageArray = [
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature1_rvbn13.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature1_rvbn13.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature1_rvbn13.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature1_rvbn13.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature2_ekswas.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature2_ekswas.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature2_ekswas.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature2_ekswas.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature3_cpaoaw.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature3_cpaoaw.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature3_cpaoaw.jpg',
           'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/placeimg_300_400_nature3_cpaoaw.jpg'
        ]

       var m = imageArray.length;
       var t, i;

       // Fisher-Yates shuffle algorithm:

       // While there are elements left to shuffle
       while(m) {
           // Pick a random element
           i = Math.floor(Math.random() * m--);

           // And swap it with the current element
           t = imageArray[m];
           imageArray[m] = imageArray[i];
           imageArray[i] = t;
       }

       for(i = 0; i < imageArray.length; i++) {
           cardIndex = imageArray[i];
           console.log(cardIndex);
           $('.flip-card-front').eq(i).attr('src', cardIndex);
       }
   
    })();
    
    

    // Rotate main menu buttons out and level select buttons in
    $('.btn-selectLevel').click(function() {
        selectLevelBtnAnim();

    })
    
    $('.btn__level-select').click(function() {
        $('.btn__level-select').fadeOut('slow');
        $('.btn-wrapper__level-select').fadeOut('slow');
        $('.flip-card-game-container').fadeIn(3000).css('display', 'flex');
    });

    var cardFlipped = false;

    $('.flip-card').click(function() {
        if(lockBoard) return;
        $(this).addClass('flipped');
        

        if(!cardFlipped) {
            cardFlipped = true;
            var firstCard = this;
        } else {
            cardFlipped = false;
            var secondCard = this;

            // If two card have been flipped lock the board
            lockBoard = true;
        };

    })

}(jQuery));


function selectLevelBtnAnim() {
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
}
var card = $('.flip-card');

function cardShuffle() {
    cards.forEach(card => {
        var randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })();
}