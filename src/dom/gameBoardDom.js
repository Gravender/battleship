function createGameBoard(size, playID) {
  const element = document.createElement("div");
  element.style.setProperty("--grid-rows", size);
  element.style.setProperty("--grid-cols", size);
  element.classList.add("gameboard");
  element.setAttribute("id", `gameboard-playID-${playID}`);
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const cell = document.createElement("div");
      cell.classList.add("grid-item");
      cell.setAttribute("id", `row-${row}-col-${col}-playID-${playID}`);
      cell.setAttribute("data-status", 0);
      cell.setAttribute("data-x", row);
      cell.setAttribute("data-y", col);
      element.appendChild(cell);
    }
  }
  return element;
}
function populateGame(gameboard, playID) {
  const { grid } = gameboard;
  const size = grid[0].length;
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const cell = document.getElementById(
        `row-${row}-col-${col}-playID-${playID}`
      );
      const status = grid[row][col];
      if (status > 0) {
        const ship = document.createElement("div");
        ship.classList.add(`ship`);
        ship.classList.add(`shipID-${status - 1}`);
        cell.appendChild(ship);
        cell.setAttribute("data-status", status - 1);
      }
    }
  }
}
function updateGameboard(id) {
  const cell = document.getElementById(id);
  const hit = document.createElement("div");
  cell.classList.add("cellHit");

  hit.innerText = "❌";
  if (cell.dataset.status > 0) {
    hit.classList.add("hit");
    const ship = cell.children[0];
    ship.appendChild(hit);
  } else {
    hit.classList.add("miss");
    cell.appendChild(hit);
  }
}
export { createGameBoard, populateGame, updateGameboard };
