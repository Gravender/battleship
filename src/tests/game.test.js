import Game from "../factory/game";

describe("Player Factory", () => {
  const game = new Game();
  test("Test random attack", () => {
    expect(game.startGame()).toBe(1);
  });
});
