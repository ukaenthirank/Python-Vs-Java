const board = document.getElementById("board");
const winnerText = document.getElementById("winner");

const pythonLogo = "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg";
const javaLogo = "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg";

let currentPlayer = "python";
let gameState = Array(9).fill(null);

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((value, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    if (value) {
      const img = document.createElement("img");
      img.src = value === "python" ? pythonLogo : javaLogo;
      cell.appendChild(img);
    }
    cell.addEventListener("click", () => handleMove(i));
    board.appendChild(cell);
  });
}

function handleMove(index) {
  if (gameState[index] || checkWinner()) return;

  gameState[index] = currentPlayer;
  currentPlayer = currentPlayer === "python" ? "java" : "python";
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    winnerText.innerText = winner === "python" ? "🐍 Python Wins!" : "☕ Java Wins!";
  } else if (!gameState.includes(null)) {
    winnerText.innerText = "It's a Draw!";
  }
}

function checkWinner() {
  for (const [a, b, c] of winPatterns) {
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return null;
}

function restartGame() {
  gameState = Array(9).fill(null);
  currentPlayer = "python";
  winnerText.innerText = "";
  renderBoard();
}

renderBoard();
