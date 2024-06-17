const cells = document.querySelectorAll('[data-cell]');  //коллекция всех ячеек игрового поля
const gameBoard = document.getElementById('gameBoard');   //элемент игрового поля
const currentPlayerElement = document.getElementById('currentPlayer');  //элемент, отображающий текущего игрока
const timerElement = document.getElementById('timer');   //элемент, отображающий таймер
const gameOverElement = document.getElementById('gameOver');  //элемент, отображающий сообщение о завершении игры
const messageElement = document.getElementById('message');  //элемент для отображения сообщения (кто победил или ничья)
const restartButton = document.getElementById('restartButton');  //кнопка для перезапуска игры

let currentPlayer = 'X';
let timer = 0;
let interval;
let board = Array(9).fill(null);

function startGame() {   //запускает новую игру, сбрасывавет все настройки
    currentPlayer = 'X';
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell', 'x-cell', 'o-cell');
    });
    gameOverElement.style.display = 'none';
    currentPlayerElement.textContent = `Игрок ${currentPlayer}`;
    resetTimer();
    startTimer();
}

function handleClick(event) {     //обрабатывает клики по ячейкам, обновляет состояние игры
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    if (board[index] !== null || checkWin()) {
        return;
    }
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x-cell' : 'o-cell');
    board[index] = currentPlayer;
    if (checkWin()) {
        endGame(`${currentPlayer} победил!`);
    } else if (board.every(cell => cell !== null)) {
        endGame('Ничья!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerElement.textContent = `Игрок ${currentPlayer}`;
    }
}

function checkWin() {     //проверяет выигрышные комбинации
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            return true;
        }
    }
    return false;
}

function endGame(message) {   //завершает игру и отображает сообщение
    clearInterval(interval);
    messageElement.textContent = message;
    gameOverElement.style.display = 'block';
}

function startTimer() {   //таймер обновляется каждую секунду и сбрасывается при начале новой игры
    timer = 0;
    interval = setInterval(() => {
        timer++;
        timerElement.textContent = timer;
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    timer = 0;
    timerElement.textContent = timer;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', startGame);

startGame();
