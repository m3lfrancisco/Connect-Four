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
const playButtons = document.querySelectorAll('#play-buttons > div');
const gameStatus = document.getElementById('#game-status');
const yellowPlayer = document.querySelector('.yellow-score');
const redPlayer = document.querySelector('.red-score');
// const music = document.getElementById('#sound');
const playSound = document.getElementById('#sound-on');
// const resetButton = document.getElementById('#reset-game');
// const winSound

/*----- event listeners -----*/
// document.getElementById('play-buttons').addEventListener('click', handleMove);
// document.getElementById('reset-game').addEventListener('click', init);
// document.getElementById('sound-on').addEventListener('click', toggleSound);

// $('#play-buttons').on('click', 'div', handleMove);
$('#reset-game').on('click', init);
$('#sound-on').on('click', toggleSound);

/*----- functions -----*/
function toggleSound() {
     playSound.on ? music.play() : music.pause();
}

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

function render() {
    // iterate over each column in the board
    board.forEach(function(column, columnIndex) {
        // iterate over each cell in the column
        column.forEach(function(cell, cellIndex) {
            // find the specific cell using columnIndex and cellIndex
            let tableCell = document.getElementById(`col${columnIndex}row${cellIndex}`);
            tableCell.style.backgroundColor = mark[cell];
        });
        // If column is filled, hide play button
        playButtons[columnIndex].style.visibility = column.includes(0) ? 'visible' : 'hidden';
    });

    // render game status message
    if (winner === 'T') {
      gameStatus.innerText = "It's a Tie!";  
    } else if (winner) {
        if (winner === 1) {
            ++yellowScore
            yellowPlayer.innerText = `${yellowScore}`;
        } else if (winner === -1) {
            ++redScore
            redPlayer.innerText = `${redScore}`;
        }
        gameStatus.innerText = `${winner === 1 ? 'YELLOW' : 'RED'} wins the game!`;
    } else {
        gameStatus.innerText = `It's ${playerTurn === 1 ? 'YELLOW' : 'RED'}'s turn!`;
    }
};

function handleMove(evt) {
    // The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
    // Looking for the corresponding column index the playButtons was clicked 
    const columnIdx = playButtons.indexOf(evt.target);
        if (columnIdx === -1 || winner) return;
        const columnArr = board[columnIdx];
        // The provided index is 0, so the entire array will be searched.
        const rowIdx = columnArr.indexOf(0);
            if (rowIdx === -1) return;

    columnArr[rowIdx] = playerTurn;
    movesMade++;
    playerTurn *= -1;

    winner = getWinner(columnIdx, rowIdx);
    render();
};
