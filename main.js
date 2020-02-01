(function($) {

    let bonus = 0;
    let cardFlipped = false;
    let cardClick = 0;
    let difficultyLevel = 0;
    let firstCard, secondCard, firstCardImg, secondCardImg, cardsRemaining;
    let gameWonCond = false;
    let lockBoard = false;
    let score = 0;
    let timer, timeOnTheClock;
    let timeRemaining = 0;


    const imageArray = [
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

    // Initialize the game
    gameInit();

    // Call the game setup function
    gameSetup();

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
        timeRemaining = 45;
        difficultyLevel = 1;
        $('.game-info').append('<p>You have ' +timeRemaining+ ' seconds to find all pairs</p>');
    });
    $('.btn-intermediate').click(function() {
        timeRemaining = 30;
        difficultyLevel = 3;
        $('.game-info').append('<p>You have ' +timeRemaining+ ' seconds to find all pairs</p>');
    });
    $('.btn-advanced').click(function() {
        timeRemaining = 20;
        difficultyLevel = 7;
        $('.game-info').append('<p>You have ' +timeRemaining+ ' seconds to find all pairs</p>');
    });

    // Fade out game info, fade in the game board and set the timer
    $('.btn__game-start').click(function() {
        $('.game-info-container').fadeOut('slow');
        $('.flip-card-game-container').fadeIn(3000).css('display', 'flex');
        $('.game-timer').fadeIn(3000);
        
        // Call the timer countdown function
        switch (timeRemaining) {
            case 45:
                countDown(45);
                break;
            case 30:
                countDown(30);
                break;
            case 20:
                countDown(20);
                break;
        }
    });    

    $('.btn-playAgain__true').click(resetGame);


    /* GAME FUNCTIONALITY */

    function gameInit() {

        // Create a relationship between the number of images and the number of cards in the game container
        for(i = 0; i < imageArray.length; i++) {
            $('.flip-card-game-container').append('<div class="flip-card"></div>');
            $('.flip-card').eq(i)
                .append('<img alt="nature image" class="flip-card-front">')
                .append('<img alt="puzzle image" class="flip-card-back">');
        }

        // Set the card back images
        $('.flip-card-back').each(function() {
            $(this).attr('src', 'https://res.cloudinary.com/bogtrotter72/image/upload/v1580145848/Milestone%202/Placeholder%20Images/card-back_dy1srw.png');
        });

        // Create a 3-column or 4-column game board depending on number of images supplied 
        if(imageArray.length%4 === 0) {
            fourColumnLayout();
        } else if (imageArray.length%6 === 0) {
            threeColumnLayout();
        } else {
            return;
        };
    };

    function gameSetup() {

        // Set the cards remaining value
        cardsRemaining = imageArray.length;
        
        // Shuffle the card face images
        shuffleCards(imageArray);

        // Set the initial game play conditions
        cardFlipped = false;

        $('.flip-card').click(playGame);
    };

    function playGame() {
        // Prevent clicking if two, non-matching cards are already flipped
        if(lockBoard) return;

        // Prevent double clicks
        if(this === firstCard) return;

        // Flip the card
        $(this).addClass('flipped');
        cardClick += 1;

        // Register the first flipped card
        if(!cardFlipped) {
            cardFlipped = true;
            firstCard = this;
            firstCardImg = $(this).find(">:first-child").attr('src');
        } else {
            // Register the second flipped card
            cardFlipped = false;
            secondCard = this;
            secondCardImg = $(this).find(">:first-child").attr('src');

            // Do the flipped cards match
            if(firstCardImg === secondCardImg) {
                $(firstCard).off('click');
                $(secondCard).off('click');

                cardsRemaining -=2;

                if (cardsRemaining === 0) {
                    gameWonCond = true;
                    gameWon();
                }
            } else {
                // If two, non-matching cards have been flipped lock the board
                lockBoard = true;

                // Flip the cards back after 1.5 second delay and release the board
                setTimeout(function() {
                    $(firstCard).removeClass('flipped');
                    $(secondCard).removeClass('flipped');
                    lockBoard = false;
                }, 1500);

            }
        };

    };


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
    
    };

    
    // Fisher-Yates shuffle algorithm:
    function shuffleCards(imageArray) {
    
        let m = imageArray.length;
        let t, i;
    
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
            cardImage = imageArray[i];
            $('.flip-card-front').eq(i).attr('src', cardImage);
        }
     };
    

     /* TIMER FUNCTIONALITY */
     function countDown(timeRemaining) {

        timer = setInterval(gameTimer, 1000);

         function gameTimer () {
            if(gameWonCond) stopTimer();
            timeRemaining--;
            if(timeRemaining >= 0  && !gameWonCond) {
                $('.game-timer').html('Time: ' + timeRemaining);
                timeOnTheClock = timeRemaining;
            } 
            // Game lost condition
            if(timeRemaining === 0) {
                alert('Game Over');
            }
        };
    };

    function stopTimer() {
        clearInterval(timer);
    };
    

    // Layout functionality
    function fourColumnLayout() {
        $('.flip-card').css({
            'height': 'calc(33.3333% - 10px)',
            'width': 'calc(25% - 10px)'
        });
    };
    
    function threeColumnLayout() {
        $('.flip-card').css({
            'height': 'calc(25% - 10px)',
            'width': 'calc(33.3333% - 10px)'
        });
    };
    
    // Game win and reset
    function gameWon() {
        $('.game-won').fadeIn(500);
        $('.btn-wrapper__game-won').fadeIn(500);
        bonus = ( (timeRemaining - timeOnTheClock) * difficultyLevel ) * 10;
        score = Math.floor( (imageArray.length / cardClick) * imageArray.length * 100 + bonus );
        $('.game-won__score').html('Score: ' + score);
        gameWonCond = true;
    };

    function resetGame() {
        $('.flip-card').removeClass('flipped');
        $('.game-won').fadeOut(500);
        $('.btn-wrapper__game-won').fadeOut(500);
        lockBoard = false;
        gameWonCond = false;
        timeRemaining = 0;
        cardClick = 0;
        $('.game-info > p:eq(2)').remove();

        // All the conditions set out below need to be collected into a function

        $('.flip-card-game-container').css('display', 'none');
        $('.game-timer').css('display', 'none');

        $('.btn-wrapper__level-select').fadeIn();
        $('.btn__level-select').css('transform', 'translateX(150px) rotateY(90deg)');

        $('.btn-beginner').fadeIn('slow').css({
            'transform': 'rotateY(0deg)',
            'opacity': 1,
            'transition-delay': '0.5s'
        });

        $('.btn-intermediate').fadeIn('slow').css({
            'transform': 'rotateY(0deg)',
            'opacity': 1,
            'transition-delay': '1s'
        });

        $('.btn-advanced').fadeIn('slow').css({
            'transform': 'rotateY(0deg)',
            'opacity': 1,
            'transition-delay': '1.5s'
        });

        gameSetup();
    };

}(jQuery));