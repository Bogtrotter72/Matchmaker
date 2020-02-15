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
        this.beginnerImgs = ['_001', '_002', '_003', '_004', '_005', '_006'];
        this.audioController = new AudioController();
    }
    startGame() {
        this.bonus = 0;
        this.cardClicks = 0;
        this.cardFlipped = false;
        this.cardsRemaining = this.cardsArray.length;
        this.firstCard = null;
        this.lockBoard = false;
        this.score = 0;
        this.secondCard = null;
        this.startTime = 0;
        this.resetCards();
        setTimeout( ()=> {
            this.shuffleCards();
            this.counter = this.gameCounter(this.startTime);
        }, 3000);
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
    flipCard(card) {
        if(this.lockBoard) return;
        if(card === this.firstCard) return;


        // Set initial state of noMatch animation
        $("#game-container").css("animation", "none");


        card.classList.add("flipped");
        this.audioController.cardFlip();

        this.cardClicks++;

        if(!this.cardFlipped) {
            this.cardFlipped = true;
            this.firstCard = card;
            this.firstCardSrc = this.firstCard.firstElementChild.firstElementChild.src;

            for(let i = 0; i < this.beginnerImgs.length; i++)  {
                if(this.firstCardSrc.includes("Beginner" + this.beginnerImgs[i])) {
                    this.firstCardSrc = this.beginnerImgs[i];
                }
            }

        } else {
            this.cardFlipped = false;
            this.secondCard = card;
            this.secondCardSrc = this.secondCard.firstElementChild.firstElementChild.src;

            for(let i = 0; i < this.beginnerImgs.length; i++)  {
                if(this.secondCardSrc.includes("Beginner" + this.beginnerImgs[i])) {
                    this.secondCardSrc = this.beginnerImgs[i];
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
        $(this.firstCard).off('click');
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
        clearInterval(this.counter);
        $.each($('.card'), function () {
            $(this).removeClass('flipped');
            $(this).delay(350).css('animation', 'spinInSpinOut 2396ms ease-in');
        });

        // Calculate the score
        this.score = Math.floor((this.cardsArray.length / this.cardClicks) * this.cardsArray.length * 100);

        $("#game-won").fadeIn(1198).css("display", "block");
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

$("#btn-playAgain__false").click(() => {
    console.log("Quit");
});

function gameInit() {

    let buttons = $.makeArray($(".btn-start") );
    let cards = $.makeArray($('.card'));
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

    cardsRemaining = cards.length;

    let game = new PsychoMatch(cards);
    
    buttons.forEach(button => {
        $(button).click( () => {


            $("#btn-playAgain__true").dblclick(false);

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
            if (($(buttonType)).prop("id") == "btn-playAgain__true") {
                setTimeout(() => {
                    gameStartAudio.play();
                    $("#game-won").fadeOut(500).css("display", "none");
                }, 100);
                $('.game-timer').html('Time: '); 
            };


            setTimeout( () => {
                $(".card").css("animation", "spinInSpinOut 2400ms ease-in");
                button.classList.remove("visible");
            }, 750);

            game.startGame();

        })
    })
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);            
        })
    });
    return cards;

};

document.addEventListener("DOMContentLoaded", gameInit());