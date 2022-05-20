const gameBoard = (function() {
  const spots = document.querySelectorAll(".spot");
  let currentPlayer = "player1";
  let spotsArr = Array.from(spots);

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

  const gameFlow = (function() {
    const spotsMarkers = {};

    const pushToSpotsMarkers = (id, marker) => {
      spotsMarkers[id] = marker;
    };

    const checkSpotsMarkers = () => {
      if (spotsMarkers["spot-1"] === spotsMarkers["spot-2"] && spotsMarkers["spot-1"] === spotsMarkers["spot-3"]) {
        console.log("Victory!")
      }
    };

    return { spotsMarkers, pushToSpotsMarkers, checkSpotsMarkers }
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

  spots.forEach(spot => spot.addEventListener("click", () => {
    markSpot(spot);

    spotsArr.map(spot => gameFlow.pushToSpotsMarkers(spot.id, spot.textContent));

    gameFlow.checkSpotsMarkers();
  }));
})();