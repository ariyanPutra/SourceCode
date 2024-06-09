document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restartBtn');
    const modeSelect = document.getElementById('modeSelect');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let mode = 'human'; // Default mode

    // Function to render the board
    const renderBoard = () => {
        board.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent = cell;
            cellDiv.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cellDiv);
        });

        // Ensure board has minimum dimensions when game starts
        if (!board.offsetWidth) {
            board.style.minWidth = '320px'; // Lebar papan permainan
            board.style.minHeight = '320px'; // Tinggi papan permainan
        }
    };

    // Function to handle click on cell
    const handleCellClick = (index) => {
        if (gameBoard[index] === '' && !checkWinner()) {
            if (mode === 'human' || (mode === 'bot' && currentPlayer === 'X')) {
                gameBoard[index] = currentPlayer;
                renderBoard();
                if (checkWinner()) {
                    highlightWinner(); // Menyorot kotak pemenang
                    setTimeout(() => {
                        document.getElementById('result').textContent = `${currentPlayer} wins!`;
                        document.getElementById('result').classList.add('dark-bg');
                    }, 200); // Tambahkan pesan kemenangan setelah sedikit keterlambatan
                } else if (gameBoard.every(cell => cell !== '')) {
                    document.getElementById('result').textContent = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    if (mode === 'bot') {
                        setTimeout(botMove, 500); // Call botMove after a short delay
                    }
                }
            }
        }
    };

    const highlightWinner = () => {
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
    
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                // Menambahkan kelas CSS untuk menyorot sel pemenang
                document.getElementById('board').children[a].classList.add('winner-cell');
                document.getElementById('board').children[b].classList.add('winner-cell');
                document.getElementById('board').children[c].classList.add('winner-cell');
                break;
            }
        }
    };

    // Function to let bot make a move
    const botMove = () => {
        if (mode === 'bot' && currentPlayer === 'O' && !checkWinner()) {
            let index = Math.floor(Math.random() * 9);
            if (gameBoard[index] === '') {
                gameBoard[index] = currentPlayer;
                renderBoard();
                if (checkWinner()) {
                    document.getElementById('result').textContent = `${currentPlayer} wins!`;
                } else if (gameBoard.every(cell => cell !== '')) {
                    document.getElementById('result').textContent = "It's a draw!";
                } else {
                    currentPlayer = 'X';
                }
            } else {
                botMove(); // Call botMove again if cell is not empty
            }
        }
    };

    // Function to check for a winner
    const checkWinner = () => {
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

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    };

    // Function to restart the game
    const restartGame = () => {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        document.getElementById('result').textContent = '';
        renderBoard();
    };

    // Event listener for restart button
    restartBtn.addEventListener('click', restartGame);

    // Event listener for mode select
    modeSelect.addEventListener('change', () => {
        mode = modeSelect.value;
        restartGame();
    });

    // Render initial board
    renderBoard();
});
