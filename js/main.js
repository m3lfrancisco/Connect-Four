/*----- constants -----*/
const mark = {
    '1': 'yellow',
    '-1': 'red',
    '0': 'white'
};

const totalMoves = 42;

/*----- app's state (variables) -----*/

let board;
let playerTurn; // 1, -1
let movesMade;
let winner; // 
let yellowScore = 0;
let redScore = 0;

/*----- cached element references -----*/
// Array.from() method will make an array from all elements returned by querySelectorAll.
// querySelectorAll is finding the id of play-buttons and selecting all the div children of that element.
const playButtons = (document.querySelectorAll('#play-buttons > div');
const gameStatus = document.getElementById('#game-status');
// const music = document.getElementById('#sound');
const playSound = document.getElementById('#sound-on');
// const resetButton = document.getElementById('#reset-game');
// const winSound

/*----- event listeners -----*/
// document.getElementById('play-buttons').addEventListener('click', handleMove);
document.getElementById('reset-game').addEventListener('click', init);
// document.getElementById('sound-on').addEventListener('click', toggleSound);

/*----- functions -----*/
// function toggleSound() {
//     playSound.on ? music.play() : music.pause();
// }

init();

function init() {
    board = [
        [0, 0, 0, 0, 0, 0], // Column 0
        [0, 0, 0, 0, 0, 0], // Column 1
        [0, 0, 0, 0, 0, 0], // Column 2
        [0, 0, 0, 0, 0, 0], // Column 3
        [0, 0, 0, 0, 0, 0], // Column 4
        [0, 0, 0, 0, 0, 0], // Column 5
        [0, 0, 0, 0, 0, 0], // Column 6
    ];
    playerTurn = 1;
    movesMade = 0;
    winner = null;
    render();
}
