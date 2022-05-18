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

  const spots = document.querySelectorAll(".spot");

  spots.forEach(spot => spot.addEventListener("click", () => {
    currentPlayer === "player1" ? spot.textContent = "X" : spot.textContent = "O";
    gameController.changePlayer();
  }));
})();