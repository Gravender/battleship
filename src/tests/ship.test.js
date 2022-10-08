import Ship from "../factory/ship";

describe("Ship Factory", () => {
  const length = 5;
  const ship = Ship(length);
  test("Create Ship", () => {
    expect(ship.length).toBe(length);
  });
  test("Not sunk", () => {
    expect(ship.isSunk()).toBe(false);
  });
  test("Sunk", () => {
    for (let i = 0; i < length; i += 1) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
