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

  const checkSpotTextCont = spot => {
    if (spot.textContent === "") return true;
  };

  const markSpot = (spot) => currentPlayer === "player1" ? spot.textContent = "X" : spot.textContent = "O";

  spots.forEach(spot => spot.addEventListener("click", () => {
    if (checkSpotTextCont(spot) === true) markSpot(spot);

    gameController.changePlayer();
  }));
})();