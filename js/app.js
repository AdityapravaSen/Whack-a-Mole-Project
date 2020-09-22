// variable declarations

const holes = document.querySelectorAll('.hole');
const scorecard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const start = document.querySelector('button');
const timeLeft = document.querySelector('.time-left');
let modal = document.getElementById("myModal");
const reload = document.querySelector('.reload');
let modalScore = document.querySelector('.modal-score');
let span = document.getElementsByClassName("close")[0];

let lastMole;
let timeUp = false;
let points = 0;
let begin = false;
let currentTime = timeLeft.textContent;
let timerID;

modalScore.textContent = 0;

//function to make the start button disappear when game has started
function disappear() {
    if (begin != false) {
        start.classList.add('hidden');
        console.log("Start button hidden");
    }
    else {
        start.classList.remove('hidden');
        console.log("Start button visible");
    }
}


//function to set time for mole to stay up
function randomTime() {
    return Math.round(Math.random() * (1000 - 200) + 200);
}

//function to select random mole
function randomMole(moles) {

    const i = Math.floor(Math.random() * moles.length);
    const mole = moles[i];

    if (mole === lastMole) {
        console.log("same");

        return randomMole(moles);
    }

    lastMole = mole;
    return mole;
}

//function to pop mole
function molePop() {
    const time = randomTime();
    const mole = randomMole(moles);

    begin = true;
    disappear();

    mole.classList.remove('mole');

    setTimeout(() => {
        mole.classList.add('mole');

        if (!timeUp) {
            molePop();
        }
    }, time);
}

//function to start game
function startGame() {
    scorecard.textContent = 0;
    timeUp = false;
    points = 0;

    molePop();

    setTimeout(() => {
        timeUp = true;
    }, 15000);   //moles are displayed for 15 seconds straight

    timerID = setInterval(countdown, 1000);
}

//function to restart game
function restartGame() {
    modal.style.display = "none";
    timeLeft.textContent = 15;
    currentTime = timeLeft.textContent;
    startGame();
}

function countdown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerID);

        modal.style.display = "block";
        modalScore.textContent = points;
    }
}



start.addEventListener('click', startGame);    //starts the game

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

reload.addEventListener('click', restartGame);

function hit(e) {
    if (!e.isTrusted) return;  //in case the mouse click is simulated 
    points += 10;
    this.classList.add('mole');
    scorecard.textContent = points;
}

moles.forEach(mole => mole.addEventListener('click', hit));