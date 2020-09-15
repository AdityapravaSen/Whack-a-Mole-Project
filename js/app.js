// variable declarations

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const start = document.querySelector('button');

let lastMole;
let timeUp = false;

//console.log(holes);

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

//function to start game
function startGame() {
    timeUp = false;
    molePop();
    setTimeout(() => timeUp = true, 10000);
}

start.addEventListener('click', startGame);    //starts the game