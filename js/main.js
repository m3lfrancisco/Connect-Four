/*----- constants -----*/
const mark = {
    '1': '#F2F680', // yellow,
    '-1': '#EF7179', // red
    '0': '#FAF4E0' // white
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
const playButtons = [...document.querySelectorAll('#play-buttons > div')];
const gameStatus = document.getElementById('message');
const yellowPlayer = document.querySelector('.yellow-score');
const redPlayer = document.querySelector('.red-score');
// const music = document.getElementById('#sound');
// const playSound = document.getElementById('#sound-on');
// const resetButton = document.getElementById('#reset-game');
// const winSound

/*----- event listeners -----*/
// document.getElementById('play-buttons').addEventListener('click', handleMove);
// document.getElementById('reset-game').addEventListener('click', init);
// document.getElementById('sound-on').addEventListener('click', toggleSound);

$('#play-buttons').on('click', 'div', handleMove);
$('#reset-game').on('click', init);
// $('#sound-on').on('click', toggleSound);

/*----- functions -----*/
// function toggleSound() {
//      playSound.on ? music.play() : music.pause();
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
};

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
      message.innerText = "It's a Tie!";  
    } else if (winner) {
        if (winner === 1) {
            yellowScore++
            yellowPlayer.innerText = `${yellowScore}`;
        } else if (winner === -1) {
            redScore++
            redPlayer.innerText = `${redScore}`;
        }
        message.innerText = `${winner === 1 ? 'YELLOW' : 'RED'} wins the game!`;
    } else {
        message.innerText = `It's ${playerTurn === 1 ? 'YELLOW' : 'RED'}'s turn!`;
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

    winner = checkForWin(columnIdx, rowIdx);
    render();
}

function checkForWin() {
    // Check for a tie
    if (movesMade === 42) 
        return winner = 'T';

    // Check each column for a winner
    for (let columnIdx = 0; columnIdx <= 6; columnIdx++) {
        winner = checkColumn(columnIdx);
        if (winner) break; 
    }
    return winner;
}

// Check index of column in the board 2d array
function checkColumn(columnIdx) {
    const columnArr = board[columnIdx];
    // Check each row in the column for a winner and set winning color's number value to winner variable
    for (let rowIdx = 0; rowIdx < columnArr.length; rowIdx++) {
        let winner = checkVertical(columnArr, rowIdx) || checkHorizontal(columnIdx, rowIdx) ||
            checkDiagonal(columnIdx, rowIdx, 1) || checkDiagonal(columnIdx, rowIdx, -1);
            if (winner) return winner;
    }
    return null;
};

function checkDiagonal(columnIdx, rowIdx, direction) {
    // Boundary check
    if (direction > 0 && columnIdx > 3 || direction > 0 && rowIdx > 2) return null;
    if (direction < 0 && columnIdx > 3 || direction < 0 && rowIdx < 3) return null;
    
    if (Math.abs(board[columnIdx][rowIdx] + board[columnIdx + 1][rowIdx + direction] +
        board[columnIdx + 2][rowIdx + direction * 2] + board[columnIdx + 3][rowIdx + direction * 3]) === 4) {
            return board[columnIdx][rowIdx];          
    } else {
        return null;
    }
};

function checkHorizontal(columnIdx, rowIdx) {
    // Boundary check
    if (columnIdx > 3) return null;

    // Add the value of all spaces to the right of columnIdx and look for +4 or -4
    // then return the value of +4 using Math.abs to get the winner
    if (Math.abs(board[columnIdx][rowIdx] + board[columnIdx + 1][rowIdx] + 
        board[columnIdx + 2][rowIdx] + board[columnIdx + 3][rowIdx]) === 4) {
            return board [columnIdx][rowIdx];
        } else {
            return null;
        }
};

function checkVertical(columnArr, rowIdx) {
    // Boundary check
    if (rowIdx > 2) return null;

    // Add the value of all spaces above row index and look for +4 or -4
    // then return the value of +4 using Math.abs to get the winner
    if (Math.abs(columnArr[rowIdx] + columnArr[rowIdx + 1] + columnArr[rowIdx + 2] + columnArr[rowIdx + 3]) === 4) {
        return columnArr[rowIdx];
    } else {
        return null;
    }
};