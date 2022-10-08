import Ship from "./ship";

const Gameboard = () => {
  const grid = [];
  const ships = [];
  const boardSize = 10;
  const generateGrid = () => {
    for (let i = 0; i < boardSize; i += 1) {
      grid[i] = [];
      for (let j = 0; j < boardSize; j += 1) {
        grid[i][j] = 0;
      }
    }
  };
  const generateShips = () => {
    ships[0] = new Ship(2);
    ships[1] = new Ship(3);
    ships[2] = new Ship(3);
    ships[3] = new Ship(4);
    ships[4] = new Ship(5);
  };
  generateGrid();
  generateShips();
  const placeShip = (ship, startX, startY, rotation) => {
    let x = startX;
    let y = startY;
    for (let i = 0; i < ships[ship].length; i += 1) {
      grid[x][y] = ship + 2;
      if (rotation) {
        x += 1;
      } else {
        y += 1;
      }
    }
  };
  const receiveAttack = (x, y) => {
    if (grid[x][y] > 0) {
      const shipId = grid[x][y];
      ships[shipId - 2].hit();
      grid[x][y] = -shipId;
    } else if (grid[x][y] === 0) {
      grid[x][y] = -1;
    } else {
      return false;
    }
    return true;
  };
  const shipsSunk = () => {
    let numSunk = 0;
    ships.forEach((ship) => {
      if (ship.isSunk()) {
        numSunk += 1;
      }
    });
    return ships.length === numSunk;
  };
  return { placeShip, receiveAttack, shipsSunk, grid };
};

export default Gameboard;
