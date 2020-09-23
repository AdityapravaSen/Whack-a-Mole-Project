const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const start = document.querySelector('button');
const timeLeft = document.querySelector('.time-left');
let modal = document.getElementById("myModal");
const reload = document.querySelector('.reload');
let modalScore = document.querySelector('.modal-score');
let span = document.getElementsByClassName("close")[0];

let lastHole;
let timeUp = false;
let score = 0;
let begin = false;
let currentTime = timeLeft.textContent;
let timerID;

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

//Function to make a random time for  the mole to pop from the hole.
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];

    //prevent same hole from getting the same number
    if (hole === lastHole) {
        return randomHole(holes);   //recursive call to randomHole
    }
    lastHole = hole;
    return hole;
}

function molepop() {
    const time = randomTime(500, 1000); //get a random time to determine how long mole should peep
    const hole = randomHole(holes);     //get the random hole from the randomHole function

    begin = true;
    disappear();

    hole.classList.add('up');           //add the CSS class so selected mole can "pop up"


    setTimeout(() => {
        hole.classList.remove('up');    //make the selected mole "pop down" after a random time
        if (!timeUp) {
            molepop();
        }
    }, time);
}

function StartGame() {

    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;

    molepop();

    setTimeout(() => timeUp = true, 15000)  //show random moles for 15 seconds

    timerID = setInterval(countdown, 1000);
}

//function to restart game
function restartGame() {
    modal.style.display = "none";

    timeLeft.textContent = 15;
    currentTime = timeLeft.textContent;

    StartGame();
}

function countdown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerID);

        modal.style.display = "block";
        modalScore.textContent = score;
    }
}

start.addEventListener('click', StartGame);    //starts the game

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";

    timeLeft.textContent = 15;
    currentTime = timeLeft.textContent;

    begin = false;
    disappear();
}

reload.addEventListener('click', restartGame);

function wack(e) {
    if (!e.isTrusted) return; //** new thing I learned */
    score += 10;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack));