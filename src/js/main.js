const gameBoard = (function() {
  const spots = document.querySelectorAll(".spot");
  let currentPlayer = "player1";
  let currentMarker;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const gameController = (function() {
    const changePlayer = () => {
      currentPlayer === "player1" ? currentPlayer = "player2" : currentPlayer = "player1";
    };
    
    return { changePlayer, };
  })();

  const gameFlow = (function() {
    const checkWin = (currentMarker) => {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return spots[index].textContent.includes(currentMarker);
        });
      });
    };

    return { checkWin, }
  })();

  const markSpot = spot => {
    currentPlayer === "player1" ? spot.firstChild.textContent = "X" : spot.firstChild.textContent = "O";
    spot.firstChild.classList.remove("scale-0");
  };

  spots.forEach(spot => spot.addEventListener("click", () => {
    let previousPlayer = currentPlayer;
    currentMarker = currentPlayer === "player1" ? "X" : "O";

    markSpot(spot);
    
    gameController.changePlayer();
    
    if (gameFlow.checkWin(currentMarker)) {
      console.log("WInner");
    }
  }, {once: true}));
})();