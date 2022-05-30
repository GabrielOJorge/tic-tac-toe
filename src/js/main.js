const gameBoard = (function() {
  const gameBoard = document.getElementById("gameBoard");
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
  ];

  const gameController = (function() {
    const startGame = () => {
      spots.forEach(spot => spot.addEventListener("click", () => {
        currentMarker = currentPlayer === "player1" ? "X" : "O";
        let previousPlayer = currentPlayer;

        gameFlow.markSpot(spot);
        gameFlow.changePlayer();
        gameFlow.displayCurrentPlayer();
        
        endGame(previousPlayer);
      }, {once: true}));
    };

    const endGame = (previousPlayer) => {
      if (gameFlow.checkWin(currentMarker)) {
        gameFlow.displayOverlay(`${previousPlayer} wins!`);
      } else if (!gameFlow.checkWin(currentMarker) && gameFlow.checkDraw()) {
        gameFlow.displayOverlay("draw!");
      };
    };

    const restartGame = () => {
      overlay.classList.add("scale-0");
      gameBoard.classList.remove("scale-0");

      spots.forEach(spot => {
        spot.firstChild.textContent = "";
        spot.firstChild.classList.add("scale-0");
      });

      currentPlayer = "player1";

      startGame();
      gameFlow.displayCurrentPlayer();
    };

    return { startGame, restartGame, };
  })();

  const gameFlow = (function() {
    const checkWin = (currentMarker) => {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return spots[index].textContent.includes(currentMarker);
        });
      });
    };

    const checkDraw = () => {
      return Array.from(spots).every(spot => spot.textContent !== "");
    };

    const markSpot = spot => {
      currentPlayer === "player1" ? spot.firstChild.textContent = "X" : spot.firstChild.textContent = "O";
      spot.firstChild.classList.remove("scale-0");  
    };

    const changePlayer = () => {
      currentPlayer === "player1" ? currentPlayer = "player2" : currentPlayer = "player1";
    };

    const displayCurrentPlayer = () => {
      if (currentPlayer === "player1") {
        player1.classList.add("animate-pulse");
        player2.classList.remove("animate-pulse");
      } else {
        player1.classList.remove("animate-pulse");
        player2.classList.add("animate-pulse");
      }
    };

    const displayOverlay = (msg) => {
      overlay.classList.remove("scale-0");
      gameBoard.classList.add("scale-0");
      winningMsg.textContent = msg.toUpperCase();
    };

    return { checkWin, checkDraw, markSpot, changePlayer, displayCurrentPlayer, displayOverlay, }
  })();

  restartBtn.addEventListener("click", gameController.restartGame);

  gameController.startGame();
})();