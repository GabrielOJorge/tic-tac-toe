const gameBoard = (function() {
  const spots = document.querySelectorAll(".spot");
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

  const checkSpotTextCont = spot => {
    if (spot.textContent === "") return true;
  };

  const markSpot = spot => {
    if (checkSpotTextCont(spot) === true) {
      currentPlayer === "player1" ? spot.firstChild.textContent = "X" : spot.firstChild.textContent = "O";
      spot.firstChild.classList.remove("scale-0");
      gameController.changePlayer();
    }
  };

  spots.forEach(spot => spot.addEventListener("click", () => markSpot(spot)));
})();