// -- ELEMENTS -- //
const startMenuBackgroundContainer = document.querySelector(".background-container");




// -- VARIABLES -- //
let screenAvailHeight = screen.availHeight;
let screenAvailWidth = screen.availWidth;






const deleteOldBackgroundGridCells = allCells => {
  allCells.forEach(cell => cell.remove());
}

const generateNewBackgroundGridCells = totalCells => {
  for (let i = 0; i < totalCells; i++) {
    gridCell = document.createElement("div");
    startMenuBackgroundContainer.appendChild(gridCell)
  }
}

const generateBackgroundGrid = (screenWidth, screenHeight) => {
  const oldGridCells = document.querySelectorAll(`.background-container > div`);
  deleteOldBackgroundGridCells(oldGridCells);
  const gridRowsAmt = Math.floor(screenHeight / 50);
  const gridColsAmt = Math.floor(screenWidth / 50);
  const totalGridCells = gridRowsAmt * gridColsAmt
  startMenuBackgroundContainer.setAttribute("style", `grid-template: repeat(${gridRowsAmt}, 50px) / repeat(${gridColsAmt}, 50px)`);
  generateNewBackgroundGridCells(totalGridCells);
}

generateBackgroundGrid(screenAvailWidth, screenAvailHeight); // run on page load

addEventListener('resize', e => {
  screenAvailWidth = e.target.screen.availWidth;
  screenAvailHeight = e.target.screen.availHeight;
  generateBackgroundGrid(screenAvailWidth, screenAvailHeight);
});