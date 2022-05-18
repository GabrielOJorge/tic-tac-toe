const gameBoard = (function() {
  let currentPlayer = "player1";

  const displayCurrentPlayer = () => {
    document.getElementById("current-player").textContent = `${currentPlayer}'s turn!`;
  };

  const gameController = (function() {

    const changePlayer = () => {
      currentPlayer === "player1" ? currentPlayer = "player2" : currentPlayer = "player1";

      displayCurrentPlayer();
    };
    
    return { changePlayer, };
  })();

  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => cell.addEventListener("click", () => {
    currentPlayer === "player1" ? cell.textContent = "X" : cell.textContent = "O";
    gameController.changePlayer();
  }));
})();