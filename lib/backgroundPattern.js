// -- ELEMENTS -- //
const startMenuBackgroundContainer = document.querySelector(".background-container");


// -- VARIABLES -- //
let screenAvailHeight = screen.availHeight;
let screenAvailWidth = screen.availWidth;
let currentGridCells;


const deleteOldBackgroundGridCells = allCells => {
  allCells.forEach(cell => cell.remove());
}

const generateNewBackgroundGridCells = (rows, cols) => {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      gridCell = document.createElement("div");
      gridCell.setAttribute("id", `${row} ${col}`);
      startMenuBackgroundContainer.appendChild(gridCell);
    }
  }
  currentGridCells = document.querySelectorAll(".background-container > div");
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

const colourFlashCell = () => {
  for (let i = 0; i < (Math.floor(Math.random() * 25 + 8)); i++) {
    const randomCell = currentGridCells[Math.floor(Math.random() * currentGridCells.length)];
    const cellColour = Math.random() > 0.5 ? "green" : "red";
    randomCell.classList.toggle(cellColour);
    setTimeout(() => {
      randomCell.classList.toggle(cellColour);
    }, 2000)
  }
}
setInterval(colourFlashCell, 2000);