document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const checkWin = () => {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                gameActive = false;
                return boardState[a];
            }
        }
        if (!boardState.includes('')) {
            gameActive = false;
            return 'draw';
        }
        return null;
    };

    const handleCellClick = (e) => {
        const cellIndex = parseInt(e.target.id.split('-')[1]);
        if (boardState[cellIndex] || !gameActive) return;

        boardState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        const winner = checkWin();

        if (winner) {
            if (winner === 'draw') {
                statusDisplay.textContent = 'It\'s a draw!';
            } else {
                statusDisplay.textContent = `${winner} wins!`;
            }
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Current player: ${currentPlayer}`;
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        boardState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        statusDisplay.textContent = `Current player: ${currentPlayer}`;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
});
