import Player from "../factory/player";

describe("Player Factory", () => {
  const player1 = Player();
  const player2 = Player();
  test("Attack enemy board", () => {
    player2.gameboard.placeShip(0, 0, 0, true);
    expect(player2.gameboard.grid[0][0]).toBe(2);
    expect(player1.attack(player2, 0, 0)).toBe(true);
    expect(player2.gameboard.grid[0][0]).toBe(-2);
  });
  test("Attack enemy board invalid", () => {
    expect(player1.attack(player2, 0, 0)).toBe(false);
  });
  test("Test random attack", () => {
    expect(player1.randomAttack(player2)).toBe(true);
  });
});
