import {
  createGameBoard,
  populateGame,
  updateGameboard,
} from "../dom/gameBoardDom";
import Player from "./player";

const Game = () => {
  const startGame = () => {
    const player1 = Player();
    const player2 = Player();
    return { player1, player2 };
  };
  const placeShip = (player, shipID, x, y, direction) => {
    return player.gameboard.placeShip(shipID, x, y, direction);
  };
  const randomShipPlacment = (player, shipID) => {
    let attackHit = false;
    while (!attackHit) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = Math.random() < 0.5;
      attackHit = placeShip(player, shipID, x, y, direction);
    }
  };
  const randomShipsPlacments = (player) => {
    for (let i = 0; i < 5; i += 1) {
      randomShipPlacment(player, i);
    }
  };
  const isGameOver = (player1, player2) => {
    if (player1.gameboard.shipsSunk) {
      return 1;
    }
    if (player2.gameboard.shipsSunk) {
      return -1;
    }
    return 0;
  };
  const fakerGame = () => {
    const game = Game();
    const { player1, player2 } = game.startGame();

    const content = document.querySelector("#content");
    const gameboard1 = createGameBoard(10, 0);
    const gameboard2 = createGameBoard(10, 1);
    content.appendChild(gameboard1);
    content.appendChild(gameboard2);

    game.randomShipsPlacments(player1);
    game.randomShipsPlacments(player2);

    populateGame(player1.gameboard, 0);
    populateGame(player2.gameboard, 1);
    for (let i = 0; i < 80; i += 1) {
      if (i % 2 === 0) {
        const attack = player1.randomAttack(player2);
        const attackID = `row-${attack.x}-col-${attack.y}-playID-1`;
        updateGameboard(attackID);
      } else {
        const attack = player2.randomAttack(player1);
        const attackID = `row-${attack.x}-col-${attack.y}-playID-0`;
        updateGameboard(attackID);
      }
    }
  };
  return {
    placeShip,
    randomShipPlacment,
    randomShipsPlacments,
    startGame,
    isGameOver,
    fakerGame,
  };
};
export default Game;
