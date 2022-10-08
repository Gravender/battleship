import Gameboard from "../factory/Gameboard";

describe("Gameboard Factory", () => {
  const gameboard = Gameboard();
  test("Placing a ship", () => {
    const shipID = 0;
    gameboard.placeShip(shipID, 0, 0, true);
    gameboard.placeShip(shipID + 1, 0, 1, true);
    gameboard.placeShip(shipID + 2, 0, 2, true);
    gameboard.placeShip(shipID + 3, 0, 3, true);
    gameboard.placeShip(shipID + 4, 0, 4, true);
    expect(gameboard.grid[0][0]).toBe(shipID + 2);
    expect(gameboard.grid[1][0]).toBe(shipID + 2);
  });
  test("Hiting a ship", () => {
    const attackCordX = 0;
    const attackCordY = 0;
    gameboard.receiveAttack(attackCordX, attackCordY);
    expect(gameboard.grid[attackCordX][attackCordY]).toBe(-2);
  });
  test("Missing a ship", () => {
    const attackCordX = 5;
    const attackCordY = 5;
    gameboard.receiveAttack(attackCordX, attackCordY);
    expect(gameboard.grid[attackCordX][attackCordY]).toBe(-1);
  });
  test("attacking a already hit square", () => {
    const attackCordX = 5;
    const attackCordY = 5;
    gameboard.receiveAttack(attackCordX, attackCordY);
    expect(gameboard.receiveAttack(attackCordX, attackCordY)).toBe(false);
  });
  test("All ships sunk", () => {
    gameboard.receiveAttack(1, 0);
    for (let i = 1; i < 5; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        gameboard.receiveAttack(j, i);
      }
    }
    expect(gameboard.shipsSunk()).toBe(true);
  });
});
