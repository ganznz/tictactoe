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

  const _generateBoardPreview = () => {
    _deleteOldBoardPreviewCells();
    const { cellSize, containerHeight, containerWidth } = getPreviewBoardInfo()
    gbPreviewContainer.setAttribute("style", `width: ${containerWidth}px; height: ${containerHeight}px; grid-template: repeat(${_gbRowsValue}, ${cellSize}px) / repeat(${_gbColsValue}, ${cellSize}px)`);
    
    // generate cells for grid
    for (let i = 1; i <= _gbRowsValue * _gbColsValue; i++) {
      const div = document.createElement("div")
      div.setAttribute("style", "opacity: 0; scale: 0.5");
      gbPreviewContainer.appendChild(div);
      setTimeout(() => {
        Math.random() > 0.5 ? div.setAttribute("style", "background-color: rgb(134, 235, 142); opacity: 1; scale: 1; transition: 0.5s") : 
        div.setAttribute("style", "background-color: rgb(250, 145, 145); opacity: 1; scale: 1; transition: 0.5s");
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
    _generateBoardPreview();
  }

  return {
    changeSetupValues
  };
})();

// change gb setup size values
iterateEventOverNodeList(gbSizeBtns, "click", e => { gameSetup.changeSetupValues(e.target) });


const Player = (plr_name) => {
  const name = plr_name;
  let score = 0;

  const getName = () => name;

  const getScore = () => score;

  const setScore = newScore => score = newScore;

  return { getName, getScore, setScore };
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

  const getGameboardData = () => _gameboardData

  return {
    generateGameboard,
    getGameboardData
  }
})();


const gameLogic = (() => {
  'use strict'
  const plrs = [];
  let _currentPlr = null

  const initializeGame = () => {
    gameBoard.generateGameboard();
    plrs.push(Player("Ganz"));
    plrs.push(Player("Opponent"));
    _currentPlr = plrs[0] // sets plr1 as first move
  }

  const scoringFormula = connected_pieces => { connected_pieces - 2 };

  const getPlayersTurn = () => {
    _currentPlr == plrs[1] || _currentPlr == null ? _currentPlr = plrs[0] : _currentPlr = plrs[1];
    plrScoreboards.forEach(scoreboard => { scoreboard.classList.toggle("current-turn") });
  }

  const checkForConnectedPieces = () => {

  }

  return {
    initializeGame,
    scoringFormula,
    getPlayersTurn
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

setupMenuPlayBtn.addEventListener("click", e => { UITransition.changeScreen(startMenuScreen, gameScreen) });

setupMenuPlayBtn.addEventListener("click", e => { gameLogic.initializeGame() });