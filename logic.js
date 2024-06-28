const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.getElementById('restart-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopupButton = document.getElementById('close-popup');
const popupRestartButton = document.getElementById('restart-popup')

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let isGameActive = true;

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        popupMessage.textContent = `Player ${currentPlayer} has won!`;
        popup.style.display = 'flex';
        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.textContent = `Game is a draw!`;
        popupMessage.textContent = `Game is a draw!`;
        popup.style.display = 'flex';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
};

const checkWin = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    return roundWon;
};

const handleRestartGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    popup.style.display = 'none';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
});
popupRestartButton.addEventListener('click',handleRestartGame,() => {popup.style.display = 'none';});
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
