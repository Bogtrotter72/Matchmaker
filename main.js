class AudioController {
    constructor() {
        this.successAudio = new Audio('Success.mp3');
        this.failAudio = new Audio('Failure.mp3');
        this.winAudio = new Audio('Game-win.mp3');
        this.flipAudio = new Audio('card-flip.mp3');
        this.playSound();
    }
    cardFlip() {
        this.flipAudio.play();
    }
    cardMatch() {
        this.successAudio.play();
    }
    cardNoMatch() {
        this.failAudio.play();
    }
    gameWin() {
        this.winAudio.play();
    }
    playSound() {
        this.successAudio.volume = 0.5;
        this.failAudio.volume = 0.3;
        this.winAudio.volume = 0.5;
        this.flipAudio.volume = 0.5;
    }
    muteSound() {
        this.successAudio.volume = 0;
        this.failAudio.volume = 0;
        this.winAudio.volume = 0;
        this.flipAudio.volume = 0;
    }
}

class PsychoMatch{
    constructor(cards) {
        this.cardsArray = cards;
        this.imgIndex = ['_001', '_002', '_003', '_004', '_005', '_006'];
        this.audioController = new AudioController();
    }
    startGame() {

        this.bonus = 0;
        this.cardClicks = 0;
        this.cardFlipped = false;
        this.cardsRemaining = this.cardsArray.length;
        this.firstCard = null;
        this.lockBoard = false;
        this.matchedCards = [];
        this.score = 0;
        this.secondCard = null;
        this.startTime = 0;
        this.resetCards();
        setTimeout( ()=> {
            this.shuffleCards();
            this.counter = this.gameCounter(this.startTime);
        }, 2000);
    }
    resetCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove("flipped");
            card.style.animation = "none";
        })
    }
    gameCounter(time) {
        return setInterval( () => {
            time++;
            $('.game-timer').html('Time: ' + time);
            this.totalTime = time;
        }, 1000);
    }
    pauseCounter() {
        clearInterval(this.counter);
    }
    restartCounter() {
        this.counter = this.gameCounter(this.totalTime);
    }

    flipCard(card) {
        if(this.lockBoard) return;
        if(card === this.firstCard) return;
        if(this.matchedCards.includes(card)) return;


        // Set initial state of noMatch animation
        $("#game-container").css("animation", "none");


        card.classList.add("flipped");
        this.audioController.cardFlip();

        this.cardClicks++;
        $('.game-click').html('Moves: ' + this.cardClicks);


        if(!this.cardFlipped) {
            this.cardFlipped = true;
            this.firstCard = card;
            this.firstCardSrc = this.firstCard.firstElementChild.firstElementChild.src;

            for(let i = 0; i < this.imgIndex.length; i++)  {
                if(this.firstCardSrc.includes("Beginner" + this.imgIndex[i])  || this.firstCardSrc.includes("Intermediate" + this.imgIndex[i])  || this.firstCardSrc.includes("Advanced" + this.imgIndex[i]) ) {
                    this.firstCardSrc = this.imgIndex[i];
                }
            }

        } else {
            this.cardFlipped = false;
            this.secondCard = card;
            this.secondCardSrc = this.secondCard.firstElementChild.firstElementChild.src;

            for(let i = 0; i < this.imgIndex.length; i++)  {
                if (this.secondCardSrc.includes("Beginner" + this.imgIndex[i]) || this.secondCardSrc.includes("Intermediate" + this.imgIndex[i])  || this.secondCardSrc.includes("Advanced" + this.imgIndex[i]) ) {
                    this.secondCardSrc = this.imgIndex[i];
                }
            }

            if(this.firstCardSrc === this.secondCardSrc) {
                this.cardsMatch();
            } else {
                this.cardsNoMatch();
            }
        }
    }
    cardsMatch() {
        this.firstCard.style.animation = "match 500ms ease-in-out";
        this.secondCard.style.animation = "match 500ms ease-in-out";
        this.cardsRemaining -= 2;

        if(this.cardsRemaining === 0) {
            setTimeout( () => {
                this.audioController.gameWin();
                this.gameOver();
            }, 500);
        } else {
            setTimeout( () => {
                this.audioController.cardMatch();
            }, 500);
        }
        this.matchedCards.push(this.firstCard);
        $(this.firstCard).off('click');
        this.matchedCards.push(this.secondCard);
        $(this.secondCard).off('click');
    }
    cardsNoMatch() {
        this.lockBoard = true;
        this.gameContainer = $('#game-container');

        setTimeout( () => {
            $("#game-container").css("animation", "noMatch 250ms ease-in-out");
            this.audioController.cardNoMatch();
            this.firstCard.classList.remove("flipped");

            // Reset this.firstCard so that it can be selected again
            this.firstCard = null;
            this.secondCard.classList.remove("flipped");
            this.lockBoard = false;
        }, 1000);
    }
    gameOver() {
        // Stop the clock
        clearInterval(this.counter);

        // Play the game over / game start animation
        $.each($('.card'), function () {
            $(this).removeClass('flipped');
            $(this).delay(350).css('animation', 'spinInSpinOut 2396ms ease-in');
        });

        // Calculate the score
        this.score = Math.floor((this.cardsArray.length / this.cardClicks) * this.cardsArray.length * 100);

        $("#game-won__outer-container").fadeIn(1198).css("display", "block");
        $("#game-won__inner-container").fadeIn(1198).css("display", "block");
        $('.game-won__score').html('Score: ' + this.score);

    }
    shuffleCards() {
        for (let i = this.cardsArray.length-1; i > 0;  i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = 1;
            this.cardsArray[i].style.order = randIndex;
        }
    }
    playSound() {
        this.audioController.playSound();
    }
    muteSound() {
        this.audioController.muteSound();
    }
}



function gameInit() {
    // Make an array for the game start buttons and the game cards
    let buttons = $.makeArray($(".btn-start") );
    let cards = $.makeArray($('.card'));
    let imageURL = 'https://res.cloudinary.com/bogtrotter72/image/upload/';
    let levelButtons = $.makeArray($(".btn__level-select"));

    const begImageArray = [
        `${imageURL}v1581008483/Milestone%202/Final%20Images/Beginner_001_bhay28.png`,
        `${imageURL}v1581008484/Milestone%202/Final%20Images/Beginner_001__match_eyrmdw.png`,
        `${imageURL}v1581008482/Milestone%202/Final%20Images/Beginner_002_xlg3f7.png`,
        `${imageURL}v1581008481/Milestone%202/Final%20Images/Beginner_002__match_f57myd.png`,
        `${imageURL}v1581008482/Milestone%202/Final%20Images/Beginner_003_o1jrd7.png`,
        `${imageURL}v1581008480/Milestone%202/Final%20Images/Beginner_003__match_lzysh0.png`,
        `${imageURL}v1581008482/Milestone%202/Final%20Images/Beginner_004_rmtvyq.png`,
        `${imageURL}v1581008481/Milestone%202/Final%20Images/Beginner_004__match_lp5lya.png`,
        `${imageURL}v1581008483/Milestone%202/Final%20Images/Beginner_005_jkkwpo.png`,
        `${imageURL}v1581008483/Milestone%202/Final%20Images/Beginner_005__match_ozvn4w.png`,
        `${imageURL}v1581008481/Milestone%202/Final%20Images/Beginner_006_wimc5m.png`,
        `${imageURL}v1581008482/Milestone%202/Final%20Images/Beginner_006__match_vrisnb.png`
    ];

    const interImageArray = [
        `${imageURL}v1581874097/Milestone%202/Final%20Images/Intermediate_001_p2dysk.png`,
        `${imageURL}v1581874100/Milestone%202/Final%20Images/Intermediate_001__match_sdgpws.png`, 
        `${imageURL}v1581874098/Milestone%202/Final%20Images/Intermediate_002_ta4gwe.png`,
        `${imageURL}v1581874096/Milestone%202/Final%20Images/Intermediate_002__match_lhoewj.png`,
        `${imageURL}v1581874098/Milestone%202/Final%20Images/Intermediate_003_fz7yec.png`,
        `${imageURL}v1581874098/Milestone%202/Final%20Images/Intermediate_003__match_xhltuf.png`,
        `${imageURL}v1581874100/Milestone%202/Final%20Images/Intermediate_004_pbz3rh.png`,
        `${imageURL}v1581874100/Milestone%202/Final%20Images/Intermediate_004__match_i6mmeq.png`,
        `${imageURL}v1581874100/Milestone%202/Final%20Images/Intermediate_005_ymnxgw.png`,
        `${imageURL}v1581874103/Milestone%202/Final%20Images/Intermediate_005__match_nva7ai.png`,
        `${imageURL}v1581874100/Milestone%202/Final%20Images/Intermediate_006_sah2vy.png`,
        `${imageURL}v1581874100/Milestone%202/Final%20Images/Intermediate_006__match_fsr97j.png`
    ];

    const advImageArray = [
        `${imageURL}v1581874951/Milestone%202/Final%20Images/Advanced_001_e0olgy.png`,
        `${imageURL}v1581874951/Milestone%202/Final%20Images/Advanced_001__match_rrkvk8.png`,
        `${imageURL}v1581874950/Milestone%202/Final%20Images/Advanced_002_gfz5rb.png`,
        `${imageURL}v1581874950/Milestone%202/Final%20Images/Advanced_002__match_euggao.png`,
        `${imageURL}v1581874950/Milestone%202/Final%20Images/Advanced_003_al4vxk.png`,
        `${imageURL}v1581874951/Milestone%202/Final%20Images/Advanced_003__match_rc6unj.png`,
        `${imageURL}v1581874951/Milestone%202/Final%20Images/Advanced_004_f75oqo.png`,
        `${imageURL}v1581874952/Milestone%202/Final%20Images/Advanced_004__match_z5gakz.png`,
        `${imageURL}v1581874952/Milestone%202/Final%20Images/Advanced_005_gwjgnu.png`,
        `${imageURL}v1581874952/Milestone%202/Final%20Images/Advanced_005__match_ml0wsn.png`,
        `${imageURL}v1581874952/Milestone%202/Final%20Images/Advanced_006_h1szgq.png`,
        `${imageURL}v1581874953/Milestone%202/Final%20Images/Advanced_006__match_rv0vij.png`
    ];

    // Set initial card images
    let imageArray = begImageArray;


    // Reset the board when the level is changed
    levelButtons.forEach(levelButton => {
        $(levelButton).click( function ()  {
            if ($(levelButton).hasClass("btn-beginner")) {
                imageArray = begImageArray;
            } else if ($(levelButton).hasClass("btn-intermediate")) {
                imageArray = interImageArray;
            } else if ($(levelButton).hasClass("btn-advanced")) {
                imageArray = advImageArray;
            };
            $('.game-timer').html('Time: ');
            $('.game-click').html('Moves: ');
        });
    });

    // Initialize the game end scenario
    cardsRemaining = cards.length;


    // Intial sound conditions (Game start audio & mute / unmute functions)
    let gameStartAudio = new Audio("game-start.mp3");

    $("#soundOn").click(function() {
        $("#soundOn").fadeOut(600);
        $("#soundOff").delay(600).fadeIn(600);
        game.muteSound();
    });

    $("#soundOff").click(function() {
        $("#soundOff").fadeOut(600);
        $("#soundOn").delay(600).fadeIn(600);
        game.playSound();
    });


    // Create a new game instance
    let game = new PsychoMatch(cards);


    // Pause and restart the time on modal open and modal close respectively
    $(".rules").click( () => {
        game.pauseCounter();
        setTimeout( () => {
            $(".rules").prop("disabled", true);
        }, 500);

    })

    $(".selectLevel").click( () => {
        game.pauseCounter();
        setTimeout( () => {
            $(".selectLevel").prop("disabled", true);
        }, 500);
    })

    $(".rulesClose").click( () => {
        game.restartCounter();
        setTimeout( () => {
            $(".rules").prop("disabled", false);
        }, 1200);
    })

    $(".selectLevelClose").click( () => {
        game.restartCounter();
        setTimeout( () => {
            $(".selectLevel").prop("disabled", false);
        }, 1200);
    })
    

    // Add click event listeners to the game start buttons and assign differing responses depending on which button was clicked
    buttons.forEach(button => {
        $(button).click( () => {
            $("#btn-playAgain__true").dblclick(false);

            // Start the game
            let buttonType = ($(button)[0]);
            if (($(buttonType)).prop("id") == "btn-startGame") {
                gameStartAudio.play();
                $("#main-page__bg-img").css("animation", "spinOut 1198ms ease-in forwards");           
                $("#btn-startGame").fadeOut(1198);
                $("#btn-wrapper__game-start").fadeOut(1198);
                $("#page-title").fadeOut(1198);
                $("#bg-img__wrapper").fadeOut(1198);

                if ($("#page-title").css("opacity") === "0") {
                    $("#page-title").css("display", "none");
                    $("#btn-wrapper__game-start").css("display", "none");
                    $("#bg-img__wrapper").css("display", "none");
                };
                $("#hud").fadeIn(1198);
                $('#hud').css("display", "flex").delay(100);
            }

            // Check if 'Play Again' clicked and reset the board for a new game
            if (($(buttonType)).prop("id") == "btn-playAgain__true") {
                setTimeout(() => {
                    // Check if sound is muted
                    if($(".fa-volume-mute").attr("style")!=="display: inline;") {
                        gameStartAudio.play();
                    }
                    setTimeout( () => {
                        $("#game-won__outer-container").fadeOut("slow").css("display", "none");
                    }, 1500)
                    $("#game-won__inner-container").fadeOut(500).css("display", "none");
                }, 100);
                $('.game-timer').html('Time: ');
                $('.game-click').html('Moves: ');
            };


            if (($(buttonType)).prop("id") == "beginner" || ($(buttonType)).prop("id") == "intermediate" || ($(buttonType)).prop("id") == "advanced" ) {
                setTimeout(() => {
                    console.log("Works");
                    // Check if sound is muted
                    if($(".fa-volume-mute").attr("style")!=="display: inline;") {
                        gameStartAudio.play();
                    }
                }, 100);
            };

            // Place the images on the card front faces
            for (i = 0; i < imageArray.length; i++) {
                cardImage = imageArray[i];
                $('.card__front-img').eq(i).attr('src', cardImage);
            }


            // Play the card animation to signify game start
            setTimeout( () => {
                $(".card").css("animation", "spinInSpinOut 1800ms ease-in");
                button.classList.remove("visible");
            }, 750);


            (function disableButtons() {
                setTimeout( () => {
                    $(".rules").prop("disabled", true);
                    $(".selectLevel").prop("disabled", true);
                }, 500);
        
                setTimeout( () => {
                    $(".rules").prop("disabled", false);
                    $(".selectLevel").prop("disabled", false);
                }, 2750)
            })();

            game.startGame();
        })
    });


    // Add a click event listener to the quit button
    // Fade-in game icon and title, and disable background buttons
    $("#btn-playAgain__false").click(() => {
        $("#main-page__bg-img").css("animation", "spinIn 1198ms ease-in forwards"); 
        $("#bg-img__wrapper").fadeIn(1198);
        $("#game-won__outer-container").fadeOut(1198).css("display", "none");
        $("#game-won__inner-container").fadeOut(1198).css("display", "none");
        $("#page-title").fadeIn(1198);
        $(".rules").prop("disabled", true);
        $(".selectLevel").prop("disabled", true);
    });
    

    // Show the game rules and prevent multiple mouse event triggers
    $(".rules").mouseover(function () { 
        $("#rules").stop().fadeIn(250);
    });

    $(".rules").mouseout(function () { 
        // $("#rules").stop().fadeIn(250);
        $("#rules").stop().fadeOut(500);
    });

   

    // Add click event listeners to the card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);            
        })
    });
    return cards;

};

document.addEventListener("DOMContentLoaded", gameInit());