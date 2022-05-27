const gameBoard = (function() {
  const spots = document.querySelectorAll(".spot");
  let currentPlayer = "player1";
  let currentMarker;
  const restartBtn = document.getElementById("restart-btn");

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
    const changePlayer = () => {
      currentPlayer === "player1" ? currentPlayer = "player2" : currentPlayer = "player1";
    };

    const displayOverlay = (previousPlayer) => {
      const overlay = document.getElementById("overlay");
      const board = document.getElementById("board");
      const winningMsg = document.getElementById("winning-msg");

      overlay.classList.remove("scale-0");
      board.classList.add("scale-0");
      winningMsg.textContent = `${previousPlayer} wins!`.toUpperCase();
    };

    const markSpot = spot => {
      currentPlayer === "player1" ? spot.firstChild.textContent = "X" : spot.firstChild.textContent = "O";
      spot.firstChild.classList.remove("scale-0");
  
      gameController.changePlayer();
    };

    const startGame = () => {
      spots.forEach(spot => spot.addEventListener("click", () => {
        let previousPlayer = currentPlayer;
        currentMarker = currentPlayer === "player1" ? "X" : "O";
    
        markSpot(spot);
        
        if (gameFlow.checkWin(currentMarker)) {
          gameController.displayOverlay(previousPlayer);
        };
      }, {once: true}));
    };

    const restartGame = () => {
      overlay.classList.add("scale-0");
      board.classList.remove("scale-0");

      spots.forEach(spot => {
        spot.firstChild.textContent = "";
        spot.firstChild.classList.add("scale-0");
      });

      currentPlayer = "player1";

      gameController.startGame();
    };

    return { changePlayer, displayOverlay, startGame, restartGame, };
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

  restartBtn.addEventListener("click", gameController.restartGame);

  gameController.startGame();
})();