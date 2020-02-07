(function($) {

    let bonus = 0;
    let cardFlipped = false;
    let cardClick = 0;
    let difficultyLevel = 0;
    let firstCard, secondCard, firstCardImg, secondCardImg, cardsRemaining;
    let gameWonCond = false;
    let lockBoard = false;
    let score = 0;
    let timer, totalTime, timeOnTheClock;
    let successAudio = new Audio('Success.mp3');
    successAudio.volume = 0.5;
    let failAudio = new Audio('Failure.mp3');
    failAudio.volume = 0.3;
    let winAudio = new Audio('Game-win.mp3');
    winAudio.volume = 0.5;
    let flipAudio = new Audio('card-flip.mp3');
    flipAudio.volume = 0.5;
    let beginnerImgs = ['_001', '_002', '_003','_004', '_005', '_006'];



    const imageArray = [
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008483/Milestone%202/Final%20Images/Beginner_001_bhay28.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008484/Milestone%202/Final%20Images/Beginner_001__match_eyrmdw.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008482/Milestone%202/Final%20Images/Beginner_002_xlg3f7.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008481/Milestone%202/Final%20Images/Beginner_002__match_f57myd.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008482/Milestone%202/Final%20Images/Beginner_003_o1jrd7.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008480/Milestone%202/Final%20Images/Beginner_003__match_lzysh0.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008482/Milestone%202/Final%20Images/Beginner_004_rmtvyq.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008481/Milestone%202/Final%20Images/Beginner_004__match_lp5lya.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008483/Milestone%202/Final%20Images/Beginner_005_jkkwpo.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008483/Milestone%202/Final%20Images/Beginner_005__match_ozvn4w.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008481/Milestone%202/Final%20Images/Beginner_006_wimc5m.png',
        'https://res.cloudinary.com/bogtrotter72/image/upload/v1581008482/Milestone%202/Final%20Images/Beginner_006__match_vrisnb.png'
    ];

    // Initialize the game
    gameInit();

    // Call the game setup function
    gameSetup();


    // Reveal the game board and allow game play
    $('.btn-startGame').click(function() {
        $('.page-title').fadeOut('slow');
        $('.hud').css('display', 'flex');
        $('.hud').fadeIn('slow');

        $('#main-page__bg-img').css('animation', 'spinOut 1198ms ease-in forwards');
        $('.bg-img__wrapper').fadeOut(1198);
        $('.btn-wrapper__game-start').fadeOut(1198);

        // Delay calling the timer until the spinOut animation is complete
        setTimeout(function() {
            gameCounter(0);
        }, 1198);
    })



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
        difficultyLevel = 1;
    });
    $('.btn-intermediate').click(function() {
        difficultyLevel = 3;
    });
    $('.btn-advanced').click(function() {

        difficultyLevel = 7;
    });

    // Fade out game info, fade in the game board and set the timer
    // $('.btn__game-start').click(function() {
    //     $('.game-info-container').fadeOut('slow');
    //     $('.flip-card-game-container').fadeIn(3000).css('display', 'flex');
    //     $('.game-timer').fadeIn(3000);
        
    // });    

    $('.btn-playAgain__true').click(resetGame);


    /* GAME FUNCTIONALITY */

    function gameInit() {
        $('#main-page__bg-img').animate({
            transform: 'scale(1)'
        }, 3000);
    };

    function gameSetup() {

        // Set the card back images
        $('.card__back-img').each(function() {
            $(this).attr('src', 'https://res.cloudinary.com/bogtrotter72/image/upload/v1580943175/Milestone%202/Final%20Images/Card-Back__Mob_003_us1l0q.png');
        });

        // Set the cards remaining value
        cardsRemaining = imageArray.length;
        
        // Shuffle the card face images
        shuffleCards(imageArray);

        // Set the initial game play conditions
        cardFlipped = false;

        $('.card').click(playGame);
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

    function playGame() {
        // Prevent clicking if two, non-matching cards are already flipped
        if(lockBoard) return;

        // Prevent double clicks
        if(this === firstCard) return;

        flipAudio.play();
        $('.game-container').css('animation', 'none');


        // Flip the card
        $(this).addClass('flipped');
        cardClick += 1;

        // Register the first flipped card
        if(!cardFlipped) {
            cardFlipped = true;
            firstCard = this;
            firstCardImg = $(this).find(">:first-child").find(">:first-child").attr('src');
        } else {
            // Register the second flipped card
            cardFlipped = false;
            secondCard = this;
            secondCardImg = $(this).find(">:first-child").find(">:first-child").attr('src');


            function checkForMatch() {
                for(let i = 0; i < beginnerImgs.length; i++) {
                    if( firstCardImg.includes('Beginner' + beginnerImgs[i]) && secondCardImg.includes('Beginner' + beginnerImgs[i]) ) {
                        return true;
                    }
                }
            };  


            // Do the flipped cards match
            if( checkForMatch() ) {

                $(firstCard).css('animation', 'match 500ms ease-in-out');
                $(secondCard).delay(250).css('animation', 'match 1000ms ease-in-out');


                cardsRemaining -=2;

                if (cardsRemaining === 0) {
                    gameWonCond = true;
                    setTimeout(() => {
                        winAudio.play()
                    }, 500);
                    gameWon();
                } else {
                    setTimeout(() => {
                        successAudio.play()
                    }, 500);
                };
                $(firstCard).off('click');
                $(secondCard).off('click');

            } else {
                // If two, non-matching cards have been flipped lock the board
                lockBoard = true;

                // Flip the cards back after 1.5 second delay and release the board
                setTimeout(function() {
                    $('.game-container').css('animation', 'noMatch 250ms ease-in-out');


                    failAudio.play()
                    $(firstCard).removeClass('flipped');
                    $(secondCard).removeClass('flipped');
                    firstCard= null;
                    secondCard= null;
                    lockBoard = false;
                }, 1000);

            }
        };

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
            $('.card__front-img').eq(i).attr('src', cardImage);
        }
     };
    

     /* TIMER FUNCTIONALITY */
     function gameCounter(timeOnTheClock) {


        // Delay timer start until animation end
        timer = setInterval(gameTimer, 1000);

         function gameTimer () {
            if(gameWonCond) stopTimer();
            timeOnTheClock++;
            $('.game-timer').html('Time: ' + timeOnTheClock);
            totalTime = timeOnTheClock;
            }
        };

    function stopTimer() {
        clearInterval(timer);
    };
    
    // Game win and reset
    function gameWon() {

        $.each($('.card'), function() {
            $(this).delay(250).css('animation', 'spinInSpinOut 2396ms ease-in forwards');
            $(this).removeClass('flipped');
        });

        $('.game-won').fadeIn(500);
        $('.btn-wrapper__game-won').fadeIn(500);

        /* REPLACE THIS WITH A PLAY AGAIN BUTTON */
        $('.btn-wrapper__game-start').fadeIn(1198);
        resetGame();


        /* TO BE COMPLETED */
        // New method of calculating bonus required!!
        // bonus = ( (timeRemaining - timeOnTheClock) * difficultyLevel ) * 10;

        score = Math.floor( (imageArray.length / cardClick) * imageArray.length * 100 + bonus );
        $('.game-won__score').html('Score: ' + score);

        console.log(cardClick);
        console.log(totalTime);
        // console.log(bonus);
        gameWonCond = true;
    };


    function resetGame() {
        $('.card').removeClass('flipped');
        $('.game-won').fadeOut(500);
        $('.btn-wrapper__game-won').fadeOut(500);
        lockBoard = false;
        gameWonCond = false;
        cardClick = 0;
        firstCard= null;
        secondCard= null;
        $('.game-info > p:eq(2)').remove();


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