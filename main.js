(function($) {

    let cardFlipped = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let timeRemaining = 0;

    // Rotate main menu buttons out and level select buttons in
    $('.btn-selectLevel').click(function() {
        selectLevelBtnAnim();

    })
    
    // Fade out the level select buttons and fade in game info
    $('.btn__level-select').click(function() {
        $('.btn__level-select').fadeOut('slow');
        $('.btn-wrapper__level-select').fadeOut('slow');
        $('.game-info-container').fadeIn(3000);
    });

    // Set the timer value based on the level selected
    $('.btn-beginner').click(function() {
        timeRemaining = 60;
        $('.game-info').append('<p>You have ' +timeRemaining+ ' seconds to find all pairs</p>');
    });
    $('.btn-intermediate').click(function() {
        timeRemaining = 45;
        $('.game-info').append('<p>You have ' +timeRemaining+ ' seconds to find all pairs</p>');
    });
    $('.btn-advanced').click(function() {
        timeRemaining = 30;
        $('.game-info').append('<p>You have ' +timeRemaining+ ' seconds to find all pairs</p>');
    });


    // Fade out game info and fade in the game board
    $('.btn__game-start').click(function() {
        $('.game-info-container').fadeOut('slow');
        $('.flip-card-game-container').fadeIn(3000).css('display', 'flex');
        $('.game-timer').fadeIn(3000);
        
        // Call the timer countdown function
        switch (timeRemaining) {
            case 60:
                countDown(60);
                break;
            case 45:
                countDown(45);
                break;
            case 30:
                countDown(30);
                break;
        }
    });

    
    function countDown(timeRemaining) {
        
        setInterval(function() {
            timeRemaining--;
            if(timeRemaining >= 0) {
                $('.game-timer').html('Time: ' + timeRemaining);
            }
        }, 1000);
    }


    // Create an array to store the images
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
    ];

    // Create a relationship between the number of images and the number of cards in the game container
    for(i = 0; i < imageArray.length; i++) {
        $('.flip-card-game-container').append('<div class="flip-card"></div>');
        $('.flip-card').eq(i)
            .append('<img alt="nature image" class="flip-card-front">')
            .append('<img alt="puzzle image" class="flip-card-back">');
    }

    // Shuffle the card face images
    shuffleCards(imageArray);

    // Set the card back images
    $('.flip-card-back').each(function() {
        $(this).attr('src', 'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/card-back_dy1srw.png');
    });

    // Create a 3-column or 4-column game board depending on number of images supplied 
    if(imageArray.length%4 === 0) {
        $('.flip-card').css({
            'height': 'calc(33.3333% - 10px)',
            'width': 'calc(25% - 10px)'
        });
    } else if (imageArray.length%6 === 0) {
        $('.flip-card').css({
            'height': 'calc(25% - 10px)',
            'width': 'calc(33.3333% - 10px)'
        });
    } else {
        return;
    };

    // Set the initial game play conditions
    cardFlipped = false;

    $('.flip-card').click(function() {
        if(lockBoard) return;
        $(this).addClass('flipped');
        

        if(!cardFlipped) {
            cardFlipped = true;
            var firstCard = this;
        } else {
            cardFlipped = false;
            var secondCard = this;

            // If two cards have been flipped lock the board
            // lockBoard = true;
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

        $('.btn-intermediate').fadeIn('slow').css({
            'transform': 'rotateY(0deg)',
            'opacity': 1,
            'transition-delay': '2s'
        });

        $('.btn-advanced').fadeIn('slow').css({
            'transform': 'rotateY(0deg)',
            'opacity': 1,
            'transition-delay': '2.5s'
        });

}

// Fisher-Yates shuffle algorithm:
function shuffleCards(imageArray) {

    var m = imageArray.length;
    var t, i;

    // While there are elements left to shuffle
    while(m) {
        // Pick a random element
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element
        t = imageArray[m];
        imageArray[m] = imageArray[i];
        imageArray[i] = t;
    }

    // Place the images on the card front faces
    for(i = 0; i < imageArray.length; i++) {
        cardIndex = imageArray[i];
        $('.flip-card-front').eq(i).attr('src', cardIndex);
    }

 };