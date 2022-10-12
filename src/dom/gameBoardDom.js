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
      cell.setAttribute("data-hit", 0);
      element.appendChild(cell);
    }
  }
  return element;
}
function populateGame(gameboard, playID, visible) {
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
        if (!visible) {
          ship.classList.add("invisible");
        }
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
  cell.setAttribute("data-hit", 1);
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
function displayGameOver(winner) {
  const gameOver = document.getElementById("gameOver");
  const displayWinner = document.getElementById("displayWinner");
  gameOver.style.display = "block";
  displayWinner.innerText = `${winner} Won`;
}
function removeInvisibility(playId, shipID) {
  const gameboard = document.getElementById(`gameboard-playID-${playId}`);
  const cells = gameboard.getElementsByClassName("grid-item");
  for (let i = 0; i < cells.length; i += 1) {
    const cell = cells[i];
    const { status } = cell.dataset;
    if (status == shipID) {
      const ship = cell.getElementsByClassName("ship")[0];
      if (ship && ship.classList.contains("invisible")) {
        ship.classList.remove("invisible");
      }
    }
  }
}
function createClickableGameboard(player, enemy, playID, func) {
  const gameboard = document.getElementById(`gameboard-playID-${playID}`);
  const cells = gameboard.getElementsByClassName("grid-item");
  for (let i = 0; i < cells.length; i += 1) {
    const cell = cells[i];
    cell.addEventListener("click", () => {
      func(player, enemy, playID, cell.dataset);
    });
  }
}
export {
  createGameBoard,
  populateGame,
  updateGameboard,
  createClickableGameboard,
  removeInvisibility,
  displayGameOver,
};
