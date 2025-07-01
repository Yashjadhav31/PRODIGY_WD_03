const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => boardState[index] === currentPlayer);
  });
}

function resetGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player X's turn`;
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
}

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetGame);
