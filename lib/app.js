// -- ELEMENTS -- //

// screens
const startMenuScreen = document.querySelector(".start-menu-window");
const gameScreen = document.querySelector(".game-window");

const rowIncreaseBtn = document.querySelector(".gb-size-up-btn.row");
const rowDecreaseBtn = document.querySelector(".gb-size-down-btn.row");
const gbSizeBtns = document.querySelectorAll(".board-size-btns > button");
const gbSetupSizeTextRows = document.querySelector(".size-value.rows");
const gbSetupSizeTextCols = document.querySelector(".size-value.cols");
const gbPreviewContainer = document.querySelector(".gameboard-preview-container");
const setupMenuPlayBtn = document.querySelector(".play-button");
const gameboardContainer = document.querySelector(".gameboard-container");
const plrScoreboards = document.querySelectorAll(".player-section");
const plrOneColours = document.querySelectorAll("#plr1 .colour-selection > div");
const plrTwoColours = document.querySelectorAll("#plr2 .colour-selection > div");


const iterateEventOverNodeList = (list, event, fn) => {
  for (i = 0; i < list.length; i++) {
    list[i].addEventListener(event, fn);
  }
}


const gameSetup = (() => {
  'use strict'

  let _gbRowsValue = 3;
  let _gbColsValue = 3;

  const _deleteOldBoardPreviewCells = () => { document.querySelectorAll(".gameboard-preview-container > div").forEach(cell => { cell.remove(); }); }

  const getPreviewBoardInfo = () => {
    let cellSize = 20; // in px
    let cellGap = 5; // in px
    const containerHeight = _gbRowsValue * cellSize + (_gbRowsValue - 1) * cellGap;
    const containerWidth = _gbColsValue * cellSize + (_gbColsValue - 1) * cellGap;
    return { cellSize, containerHeight, containerWidth }
  }

  const generateBoardPreview = () => {
    _deleteOldBoardPreviewCells();
    const { cellSize, containerHeight, containerWidth } = getPreviewBoardInfo()
    gbPreviewContainer.setAttribute("style", `width: ${containerWidth}px; height: ${containerHeight}px; grid-template: repeat(${_gbRowsValue}, ${cellSize}px) / repeat(${_gbColsValue}, ${cellSize}px)`);
    const cellColours = gameSetup.getPlayerColours();

    // generate cells for grid
    for (let i = 1; i <= _gbRowsValue * _gbColsValue; i++) {
      const div = document.createElement("div")
      div.setAttribute("style", "opacity: 0; scale: 0.5");
      gbPreviewContainer.appendChild(div);
      setTimeout(() => {
        Math.random() > 0.5 ? div.setAttribute("style", `background-color: ${cellColours[0]}; opacity: 1; scale: 1; transition: 0.5s`) : 
        div.setAttribute("style", `background-color: ${cellColours[1]}; opacity: 1; scale: 1; transition: 0.5s`);
      }, 50);
    }
  }

  const changeSetupValues = (btn) => {
    if (btn.classList.contains("row")) {
      if (_gbRowsValue >= 3 && _gbRowsValue <= 10) {
        btn.classList.contains("gb-size-up-btn") ? (_gbRowsValue + 1 < 11 ? _gbRowsValue++ : _gbRowsValue) : (_gbRowsValue - 1 > 2 ? _gbRowsValue-- : _gbRowsValue);
        gbSetupSizeTextRows.textContent = _gbRowsValue;
      }
    } else { // inc/dec col values
      if (_gbColsValue >= 3 && _gbColsValue <= 10) {
        btn.classList.contains("gb-size-up-btn") ? (_gbColsValue + 1 < 11 ? _gbColsValue++ : _gbColsValue) : (_gbColsValue - 1 > 2 ? _gbColsValue-- : _gbColsValue);
        gbSetupSizeTextCols.textContent = _gbColsValue;
      }
    }
    generateBoardPreview();
  }

  const getPlayerNames = () => {
    const plrNames = document.querySelectorAll(".player-setup > input");
    return [plrNames[0].value, plrNames[1].value]
  }

  const getPlayerColours = () => {
    const plrOneColour = Array.from(plrOneColours).find(colour => colour.classList.contains("selected")).style.backgroundColor
    const plrTwoColour = Array.from(plrTwoColours).find(colour => colour.classList.contains("selected")).style.backgroundColor
    return [plrOneColour, plrTwoColour];
  }

  return {
    changeSetupValues,
    getPlayerNames,
    getPlayerColours,
    generateBoardPreview
  };
})();




const Player = (plr_name, plr_colour) => {
  const name = plr_name;
  const marker_colour = plr_colour;
  let score = 0;

  const getName = () => name;

  const getMarkerColour = () => marker_colour

  const getScore = () => score;

  const setScore = newScore => score = newScore;

  return { getName, getScore, setScore, getMarkerColour };
}


const gameBoard = (() => {
  'use strict'

  let _gameboardData = [];

  const _deleteOldBoardCells = () => {
    document.querySelectorAll(".gameboard-container > div").forEach(cell => { cell.remove(); });
    _gameboardData = []
  }

  const _getBoardInfo = () => {
    let cellSize = 30; // in px
    let cellGap = 5; // in px
    let rowsAmt = parseInt(gbSetupSizeTextRows.textContent);
    let colsAmt = parseInt(gbSetupSizeTextCols.textContent);
    const containerHeight = rowsAmt * cellSize + (rowsAmt - 1) * cellGap;
    const containerWidth = colsAmt * cellSize + (colsAmt - 1) * cellGap;
    return { cellSize, containerHeight, containerWidth, rowsAmt, colsAmt };
  }

  const generateGameboard = () => {
    _deleteOldBoardCells();
    const { cellSize, containerHeight, containerWidth, rowsAmt, colsAmt } = _getBoardInfo();
    gameboardContainer.setAttribute("style", `width: ${containerWidth}px; height: ${containerHeight}px; grid-template: repeat(${rowsAmt}, ${cellSize}px) / repeat(${colsAmt}, ${cellSize}px)`);

    // generate cells for gameboard grid
    for (let row = 1; row <= rowsAmt; row++) {
      for (let col = 1; col <= colsAmt; col++) {
        gridCell = document.createElement("div");
        gridCell.setAttribute("id", `${row} ${col}`);
        gameboardContainer.appendChild(gridCell);
        _gameboardData.push(gridCell);
      }
    }
  }

  const cellTaken = selectedCell => selectedCell.classList.contains("taken");

  const updateSelectedCell = (selectedCell, plr) => {
    selectedCell.classList.add("taken");
    selectedCell.setAttribute("colour", `${plr.getMarkerColour()}`);
    selectedCell.setAttribute("style", `background-color: ${plr.getMarkerColour()}`);
  }

  const getGameboardData = () => _gameboardData;

  return {
    generateGameboard,
    getGameboardData,
    cellTaken,
    updateSelectedCell
  }
})();


const gameLogic = (() => {
  'use strict'
  const plrs = [];
  let _currentPlr = null; // defaults to plr1 getting first move when playGame() is run
  let gameActive = true

  const initializeGame = () => {
    gameBoard.generateGameboard();
    const plrNames = gameSetup.getPlayerNames() 
    const plrColours = gameSetup.getPlayerColours()
    plrs.push(Player((plrNames[0] == "" ? "Player 1" : plrNames[0]), plrColours[0]));
    plrs.push(Player((plrNames[1] == "" ? "Player 2" : plrNames[1]), plrColours[1]));
    plrScoreboards[0].querySelector(".player-name").textContent = plrs[0].getName()
    plrScoreboards[1].querySelector(".player-name").textContent = plrs[1].getName()
    _currentPlr = plrs[0];
    
    iterateEventOverNodeList(gameBoard.getGameboardData(), "click", e => {
      if (gameActive) {
        _playRound(_currentPlr, e.target);
      } else {

      }
    });
  }

  const scoringFormula = connectedPieces => connectedPieces - 2 ;

  const _setCurrentPlayer = () => {
    _currentPlr == plrs[1] ? _currentPlr = plrs[0] : _currentPlr = plrs[1];
    plrScoreboards.forEach(scoreboard => { scoreboard.classList.toggle("current-turn") });
  }

  const _playRound = (plr, selectedCell) => {
    // ---- run while cell not taken
    if (!(gameBoard.cellTaken(selectedCell))) { //  run while cell not taken
      gameBoard.updateSelectedCell(selectedCell, plr);
      _setCurrentPlayer(); // sets player for next round
    } else {
      selectedCell.classList.add("selection-taken");
      selectedCell.addEventListener("animationend", e => { e.target.classList.remove("selection-taken") });
    }
    _checkForConnectedPieces(plr);
    plrScoreboards[0].querySelector(".player-score").textContent = plrs[0].getScore()
    plrScoreboards[1].querySelector(".player-score").textContent = plrs[1].getScore()
  }

  const _gameboardFull = () => Array.from(document.querySelectorAll(".gameboard-container > div")).every(cell => cell.classList.contains("taken"));

  const _checkForConnectedPieces = (plr) => {
    let rowCount = gbSetupSizeTextRows.textContent;
    let colCount = gbSetupSizeTextCols.textContent;
    let allConnectedPieces = [];

    // check horizontally
    for (let row = 1; row <= rowCount; row++) {
      let connectedPieces = 0;
      for (let col = 1; col <= colCount; col++) {
        let currentCell = document.getElementById(`${row} ${col}`);
        let isCurrentCellPlrColour = currentCell.getAttribute("colour") == plr.getMarkerColour();
        if (isCurrentCellPlrColour) {
          col == colCount ? allConnectedPieces.push(connectedPieces + 1) : connectedPieces++
        } else {
          allConnectedPieces.push(connectedPieces);
          connectedPieces = 0;
        }
      }
    }

    // check vertically
    for (let col = 1; col <= colCount; col++) {
      let connectedPieces = 0;
      for (let row = 1; row <= rowCount; row++) {
        let currentCell = document.getElementById(`${row} ${col}`);
        let isCurrentCellPlrColour = currentCell.getAttribute("colour") == plr.getMarkerColour();
        if (isCurrentCellPlrColour) {
          row == rowCount ? allConnectedPieces.push(connectedPieces + 1) : connectedPieces++
        } else {
          allConnectedPieces.push(connectedPieces);
          connectedPieces = 0;
        }
      }
    }

    // check diagonally (bottom-left to top-right)
    outer: for (let row = 1; row <= rowCount; row++) {
      let connectedPieces = 0;
      let currRow = row
      for (let col = 1; col <= colCount; col++) {
        let currentCell = document.getElementById(`${currRow} ${col}`);
        if (!(currentCell)) continue outer; // skip inner loop iteration if currentCell doesn't exist
        let isCurrentCellPlrColour = currentCell.getAttribute("colour") == plr.getMarkerColour();
        if (isCurrentCellPlrColour) {
          if (col == colCount || currRow == 1) {
            allConnectedPieces.push(connectedPieces + 1);
            if (currRow == 1) continue outer;
          } else {
            connectedPieces++
          }
        } else {
          allConnectedPieces.push(connectedPieces);
          connectedPieces = 0;
          if (currRow == 1) continue outer;
        }
        currRow--;
      }
    }

    // now check from bottom line of board
    outer: for (let col = 2; col <= colCount; col++) {
      let connectedPieces = 0;
      let currCol = col;
      for (let row = rowCount; rowCount >= 1; row--) {
        let currentCell = document.getElementById(`${row} ${currCol}`);
        if (!(currentCell)) continue outer; // skip inner loop iteration if currentCell doesn't exist
        let isCurrentCellPlrColour = currentCell.getAttribute("colour") == plr.getMarkerColour();
        if (isCurrentCellPlrColour) {
          if (currCol == colCount || row == 1) {
            allConnectedPieces.push(connectedPieces + 1);
            if (currCol == colCount) continue outer;
          } else {
            connectedPieces++
          }
        } else {
          allConnectedPieces.push(connectedPieces);
          connectedPieces = 0;
          if (currCol == colCount) continue outer;
        }
        currCol++;
      }
    }

    // check diagonally (top-left to bottom-right)
    outer: for (let row = 1; row <= rowCount; row++) {
      let connectedPieces = 0;
      let currRow = row
      for (let col = colCount; col >= 1; col--) {
        let currentCell = document.getElementById(`${currRow} ${col}`);
        if (!(currentCell)) continue outer; // skip inner loop iteration if currentCell doesn't exist
        let isCurrentCellPlrColour = currentCell.getAttribute("colour") == plr.getMarkerColour();
        if (isCurrentCellPlrColour) {
          if (col == 1 || currRow == 1) {
            allConnectedPieces.push(connectedPieces + 1);
            if (currRow == 1) continue outer;
          } else {
            connectedPieces++
          }
        } else {
          allConnectedPieces.push(connectedPieces);
          connectedPieces = 0;
          if (currRow == 1) continue outer;
        }
        currRow--;
      }
    }

    // now check from bottom line of board
    outer: for (let col = colCount - 1; col >= 1; col--) {
      let connectedPieces = 0;
      let currCol = col;
      for (let row = rowCount; rowCount >= 1; row--) {
        let currentCell = document.getElementById(`${row} ${currCol}`);
        if (!(currentCell)) continue outer; // skip inner loop iteration if currentCell doesn't exist
        let isCurrentCellPlrColour = currentCell.getAttribute("colour") == plr.getMarkerColour();
        if (isCurrentCellPlrColour) {
          if (currCol == 1 || row == 1) {
            allConnectedPieces.push(connectedPieces + 1);
            if (currCol == 1) continue outer;
          } else {
            connectedPieces++
          }
        } else {
          allConnectedPieces.push(connectedPieces);
          connectedPieces = 0;
          if (currCol == colCount) continue outer;
        }
        currCol--;
      }
    }

    let plrScore = 0
    allConnectedPieces.forEach(num => {
      if (num >= 3) { plrScore += scoringFormula(num) };
    })
    plr.setScore(plrScore);
  }

  return {
    initializeGame
  }
})();


const UITransition = (() => {
  'use strict'
  const changeScreen = (changeFrom, changeTo) => {
    changeFrom.classList.add("inactive");
    changeFrom.classList.remove("active");
    changeTo.classList.add("active");
    changeTo.classList.remove("inactive");
  }

  return {
    changeScreen
  };
})();

// change gb setup size values
iterateEventOverNodeList(gbSizeBtns, "click", e => { gameSetup.changeSetupValues(e.target) });

// change players selected colours
iterateEventOverNodeList(plrOneColours, "click", e => {
  e.target.classList.add("selected");
  plrOneColours.forEach(colour => { if (colour != e.target) { colour.classList.remove("selected") } });
  gameSetup.generateBoardPreview()
});
iterateEventOverNodeList(plrTwoColours, "click", e => {
  e.target.classList.add("selected");
  plrTwoColours.forEach(colour => { if (colour != e.target) { colour.classList.remove("selected") } });
  gameSetup.generateBoardPreview()
});

setupMenuPlayBtn.addEventListener("click", e => { UITransition.changeScreen(startMenuScreen, gameScreen) });
setupMenuPlayBtn.addEventListener("click", e => { gameLogic.initializeGame() });