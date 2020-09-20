// variable declarations

const holes = document.querySelectorAll('.hole');
const scorecard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const start = document.querySelector('button');
const restart = document.querySelector('.reload');

let lastMole;
let timeUp = false;
let points = 0;
let c = 0;

//function to check setTimeout()
function count() {
    console.log(++c);
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

    mole.classList.remove('mole');
    setTimeout(() => {
        mole.classList.add('mole');

        if (!timeUp) {
            molePop();
        }
    }, time);
}

//function to disable start wile game is running
function disableStart() {
    start.disabled = true;

    console.log("disabled");

    setTimeout(() => {
        start.disabled = false;
    }, 15000);
}

//function to start game
function startGame() {
    scorecard.textContent = 0;
    timeUp = false;
    points = 0;

    disableStart();
    molePop();

    setTimeout(() => {
        timeUp = true;

        count();
    }, 15000);   //moles are displayed for 15 seconds straight
}

// //function to restart the game
// function restartGame() {
//     if (window.confirm("Do you Want to Reload the Game?")) {
//         window.location.reload();
//     }

// }

start.addEventListener('click', startGame);    //starts the game

// restart.addEventListener('click', restartGame); //restarts the game

function hit(e) {
    if (!e.isTrusted) return;  //in case the mouse click is simulated 
    points += 10;
    this.classList.add('mole');
    scorecard.textContent = points;
}

moles.forEach(mole => mole.addEventListener('click', hit));