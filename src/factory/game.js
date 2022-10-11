import {
  attackRandomGameBoard,
  createClickableGameboard,
  createGameBoard,
  displayGameOver,
  populateGame,
  removeInvisibility,
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
    if (player1.gameboard.shipsSunk()) {
      return 1;
    }
    if (player2.gameboard.shipsSunk()) {
      return -1;
    }
    return 0;
  };
  const checkShips = (enemy, enemyID) => {
    const enemyShips = enemy.gameboard.ships;
    enemyShips.forEach((ship, i) => {
      if (ship.isSunk()) {
        removeInvisibility(enemyID, i + 1);
        removeInvisibility(enemyID, 0);
      }
    });
  };
  const randomAttack = (player, enemy, playID) => {
    const attack = player.randomAttack(enemy);
    const attackID = `row-${attack.x}-col-${attack.y}-playID-${playID}`;
    updateGameboard(attackID);
  };
  const easyAi = (player, enemy, playID) => {
    if (isGameOver(player, enemy) == 0) {
      randomAttack(player, enemy, playID);
      checkShips(enemy, playID);
    } else {
      displayGameOver(isGameOver(enemy, player));
    }
  };
  const playerTurn = (player, enemy, playID, data) => {
    const { x, y, hit, status } = data;
    if (isGameOver(player, enemy) == 0) {
      if (parseInt(hit) === 0) {
        player.attack(enemy, x, y);
        const attackID = `row-${x}-col-${y}-playID-${playID}`;
        updateGameboard(attackID);
        checkShips(enemy, 1);
        easyAi(enemy, player, 0);
      }
    } else {
      displayGameOver(isGameOver(player, enemy));
    }
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

    populateGame(player1.gameboard, 0, true);
    populateGame(player2.gameboard, 1, false);
    for (let i = 0; i < 80; i += 1) {
      if (i % 2 === 0) {
        easyAi(player1, player2, 1);
      } else {
        easyAi(player2, player1, 0);
      }
    }
    createClickableGameboard(player1, player2, 1, playerTurn);
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
