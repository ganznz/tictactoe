// import iterateEventOverNodeList from "./helperFunctions";


const iterateEventOverNodeList = (list, event, fn) => {
  for (item in list) {
    addEventListener(event, fn);
  }
}

// -- ELEMENTS -- //
const rowIncreaseBtn = document.querySelector(".gb-size-up-btn.row");
const rowDecreaseBtn = document.querySelector(".gb-size-down-btn.row");
const colIncreaseBtn = document.querySelector(".gb-size-up-btn.col");
const colDecreaseBtn = document.querySelector(".gb-size-down-btn.col");
const increaseDecreaseBtns = [rowIncreaseBtn, rowDecreaseBtn, colIncreaseBtn, colDecreaseBtn];
const boardSetupRowsText = document.querySelector(".size-value.rows");
const boardSetupColsText = document.querySelector(".size-value.cols");

// -- VARIABLES -- //






const gameSetup = (() => {
  'use strict'

  let _gbRowsValue = 3;
  let _gbColsValue = 3;

  const changeSetupValues = (btn) => {
    if (btn.classList.contains("row")) {
      btn.classList.contains("gb-size-up-btn") ? _gbRowsValue++ : _gbRowsValue--
    } else { // inc/dec col values
      btn.classList.contains("gb-size-up-btn") ? _gbColsValue++ : _gbColsValue--
    }
    console.log(_gbRowsValue, _gbColsValue)
  }

  return {
    changeSetupValues: changeSetupValues
  };
})();

iterateEventOverNodeList(increaseDecreaseBtns, "click", e => { gameSetup.changeSetupValues(e.target) });
