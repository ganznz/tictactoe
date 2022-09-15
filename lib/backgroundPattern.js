// -- ELEMENTS -- //
const startMenuBackgroundContainer = document.querySelector(".background-container");




// -- VARIABLES -- //
let screenAvailHeight = screen.availHeight;
let screenAvailWidth = screen.availWidth;




const deleteOldBackgroundGridCells = allCells => {
  allCells.forEach(cell => cell.remove());
}

const generateNewBackgroundGridCells = (rows, cols) => {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      gridCell = document.createElement("div");
      gridCell.textContent = `${row} : ${col}`
      startMenuBackgroundContainer.appendChild(gridCell);

    }
  }
}

const generateBackgroundGrid = (screenWidth, screenHeight) => {
  const oldGridCells = document.querySelectorAll(`.background-container > div`);
  deleteOldBackgroundGridCells(oldGridCells);
  const gridRowsAmt = Math.floor(screenHeight / 50);
  const gridColsAmt = Math.floor(screenWidth / 50);
  const totalGridCells = gridRowsAmt * gridColsAmt
  startMenuBackgroundContainer.setAttribute("style", `grid-template: repeat(${gridRowsAmt}, 50px) / repeat(${gridColsAmt}, 50px)`);
  generateNewBackgroundGridCells(gridRowsAmt, gridColsAmt);
}

generateBackgroundGrid(screenAvailWidth, screenAvailHeight); // run on page load

addEventListener('resize', e => {
  screenAvailWidth = e.target.screen.availWidth;
  screenAvailHeight = e.target.screen.availHeight;
  generateBackgroundGrid(screenAvailWidth, screenAvailHeight);
});