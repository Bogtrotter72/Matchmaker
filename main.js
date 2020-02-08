class AudioController {
    constructor() {
        this.successAudio = new Audio('Success.mp3');
        this.successAudio.volume = 0.5;
        this.failAudio = new Audio('Failure.mp3');
        this.failAudio.volume = 0.3;
        this.winAudio = new Audio('Game-win.mp3');
        this.winAudio.volume = 0.5;
        this.flipAudio = new Audio('card-flip.mp3');
        this.flipAudio.volume = 0.5;
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
        setTimeout( ()=> {
            this.shuffleCards();
            this.counter = this.gameCounter(this.startTime);
        }, 500);
        this.resetCards();
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
            if(time === 5) this.gameOver();
            $('.game-timer').html('Time: ' + time);
            this.totalTime = time;
        }, 1000);

    }
    flipCard(card) {
        if(this.lockBoard) return;

        if(card === this.firstCard) return;

        card.classList.add("flipped");
        this.audioController.cardFlip();

        this.cardClicks++;
        
    }
    gameOver() {
        clearInterval(this.counter);
        this.gameWonModal = document.getElementById("game-won");
        this.fadeIn = 0;
        this.time = setInterval( () => {
            if(this.fadeIn === 10) {
                clearInterval(this.time);
            } else {
                this.fadeIn += 1;
                this.gameWonModal.style.opacity = this.fadeIn/10;
                this.gameWonModal.style.display = "flex";
            }
        }, 120);

    }
    shuffleCards() {
        for (let i = this.cardsArray.length-1; i > 0;  i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = 1;
            this.cardsArray[i].style.order = randIndex;
        }
    }
}


function gameInit() {

    let cards = Array.from(document.getElementsByClassName('card'));
    cardsRemaining = cards.length;

    let game = new PsychoMatch(cards);
    
    
    document.getElementById("btn-startGame").addEventListener('click', () => {
        let startBtn = document.getElementById("btn-startGame");
        let startBtnWrap = document.getElementById("btn-wrapper__game-start");
        let pageTitle = document.getElementById("page-title");
        let bgImgWrap = document.getElementById("bg-img__wrapper");


        let fadeOut = 10;
    
        let time = setInterval( () => {
            if(fadeOut === 0) {
                clearInterval(time);
            } else {
                fadeOut -= 1;
                startBtn.style.opacity = fadeOut/10;
                startBtnWrap.style.opacity = fadeOut/10;
                pageTitle.style.opacity = fadeOut/10;
                bgImgWrap.style.opacity = fadeOut/10;
                if (pageTitle.style.opacity === "0") {
                    pageTitle.style.display = "none";
                    startBtnWrap.style.display = "none";
                    bgImgWrap.style.display = "none";
                };
            }
        }, 120);
    
        let hudDisplay = document.getElementById("hud");
        let fadeIn = 0;
        let time2 = setInterval( () => {
            if(fadeIn === 10) {
                clearInterval(time2);
            } else {
                fadeIn += 1;
                hudDisplay.style.opacity = fadeIn/10;
                hudDisplay.style.display = "flex";
            }
        }, 120);
    
        document.getElementById("main-page__bg-img").style.animation = "spinOut 1198ms ease-in forwards";
        game.startGame();

    });
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);            
        })
    });

};

document.addEventListener("DOMContentLoaded", gameInit());
















// if(!this.cardFlipped) {
//     this.cardFlipped = true;
//     this.firstCard = card;
//     this.firstCardSrc = this.firstCard.firstElementChild.firstElementChild.src;
// } else {
//     this.cardFlipped = false;
//     this.secondCard = card;
//     this.secondCardSrc = this.secondCard.firstElementChild.firstElementChild.src;


//     function checkForMatch() {
//         for (let i = 0; i < this.beginnerImgs.length; i++) {
//             if (this.firstCardSrc.includes('Beginner' + this.beginnerImgs[i]) && this.secondCardSrc.includes('Beginner' + this.beginnerImgs[i])) {
//                 console.log('true');
//                 return true;
//             }
//         }
//     };

//     if(checkForMatch) {
//         this.firstCard.style.animation = "match 500ms ease-in-out";
//         this.secondCard.style.animation = "match 500ms ease-in-out";
        
//         cardsRemaining -= 2;

//         if (cardsRemaining === 0) {
//             gameWonCond = true;
//             setTimeout(() => {
//                 this.audioController.gameWin();
//             }, 500);
//             gameWon();
//         } else {
//             setTimeout(() => {
//                 this.audioController.cardMatch();
//             }, 500);
//         };
//         this.firstCard.removeEventListener("click", cardCheck(), false);
//         this.secondCard.removeEventListener("click", cardCheck(), false);
//     } else {
//         this.lockBoard = true;

//         setTimeout(() => {
//             this.gameContainer = document.getElementById();
//             this.gameContainer.style.animation = "noMatch 250ms ease-in-out";
//             this.audioController.noMatch();


//             this.firstCard.removeClass('flipped');
//             this.secondCard.removeClass('flipped');
//             this.lockBoard = false;
//         }, 1000);
//     };
    
// }