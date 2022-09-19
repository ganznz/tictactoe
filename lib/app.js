// -- ELEMENTS -- //
const rowIncreaseBtn = document.querySelector(".gb-size-up-btn.row");
const rowDecreaseBtn = document.querySelector(".gb-size-down-btn.row");
const gbSizeBtns = document.querySelectorAll(".board-size-btns > button");
const gbSetupSizeTextRows = document.querySelector(".size-value.rows");
const gbSetupSizeTextCols = document.querySelector(".size-value.cols");
const gbPreviewContainer = document.querySelector(".gameboard-preview-container");


const iterateEventOverNodeList = (list, event, fn) => {
  for (i = 0; i < list.length; i++) {
    list[i].addEventListener(event, fn);
  }
}


const gameSetup = (() => {
  'use strict'

  let _gbRowsValue = 3;
  let _gbColsValue = 3;

  const _deleteOldBoardPreviewCells = () => {
    document.querySelectorAll(".gameboard-preview-container > div").forEach(cell => {
      cell.remove();
    });
  }

  const _getBoardInfo = () => {
    const cellSize = 20;
    const cellGap = 5;
    const containerHeight = _gbRowsValue * cellSize + (_gbRowsValue - 1) * cellGap;
    const containerWidth = _gbColsValue * cellSize + (_gbColsValue - 1) * cellGap;
    return { cellSize, containerHeight, containerWidth }
  }

  const _generateBoardPreview = () => {
    _deleteOldBoardPreviewCells();
    const { cellSize, containerHeight, containerWidth } = _getBoardInfo()
    gbPreviewContainer.setAttribute("style", `width: ${containerWidth}px; height: ${containerHeight}px; grid-template: repeat(${_gbRowsValue}, ${cellSize}px) / repeat(${_gbColsValue}, ${cellSize}px)`);
    // generate cells for grid
    for (let i = 1; i <= _gbRowsValue * _gbColsValue; i++) {
      const div = document.createElement("div");
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
    changeSetupValues: changeSetupValues
  };
})();

iterateEventOverNodeList(gbSizeBtns, "click", e => { gameSetup.changeSetupValues(e.target) });