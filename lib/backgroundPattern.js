// -- ELEMENTS -- //
const startMenuBackgroundContainer = document.querySelector(".background-container");




// -- VARIABLES -- //
let screenAvailHeight = screen.availHeight;
let screenAvailWidth = screen.availWidth;
let bgGridCellsData = {}


const deleteOldBackgroundGridCells = allCells => {
  allCells.forEach(cell => cell.remove());
}

const updateGridCellData = (cell) => {
  bgGridCellsData[cell.id] = cell.className
}

const generateNewBackgroundGridCells = (rows, cols) => {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      gridCell = document.createElement("div");
      gridCell.setAttribute("id", `${row} ${col}`);
      updateGridCellData(gridCell);
      gridCell.setAttribute("class", `${bgGridCellsData[gridCell.id]}`);
      startMenuBackgroundContainer.appendChild(gridCell);
    }
  }
}

const generateBackgroundGrid = (screenWidth, screenHeight) => {
  const oldGridCells = document.querySelectorAll(`.background-container > div`);
  deleteOldBackgroundGridCells(oldGridCells);
  const gridRowsAmt = Math.floor(screenHeight / 50);
  const gridColsAmt = Math.floor(screenWidth / 50);
  startMenuBackgroundContainer.setAttribute("style", `grid-template: repeat(${gridRowsAmt}, 50px) / repeat(${gridColsAmt}, 50px)`);
  generateNewBackgroundGridCells(gridRowsAmt, gridColsAmt);
}

generateBackgroundGrid(screenAvailWidth, screenAvailHeight); // run on page load

addEventListener('resize', e => {
  screenAvailWidth = e.target.screen.availWidth;
  screenAvailHeight = e.target.screen.availHeight;
  generateBackgroundGrid(screenAvailWidth, screenAvailHeight);
});

count = 0
const playBackgroundAnimation = () => {
  let allGridCells = document.querySelectorAll(".background-container > div");
  cell = allGridCells[Math.floor(Math.random() * allGridCells.length)];
  cellIdSpaceIndex = cell.id.indexOf(" ");
  cellRow = cell.id.slice(0, cellIdSpaceIndex);
  cellCol = cell.id.slice(cellIdSpaceIndex + 1);
  cell.setAttribute("class", `${count % 2 == 0 ? "green" : "red"}`);
  updateGridCellData(cell);
  count++;
}
setInterval(playBackgroundAnimation, 2000);