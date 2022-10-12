import {
  createClickableGameboard,
  createGameBoard,
  displayGameOver,
  populateGame,
  removeInvisibility,
  updateGameboard,
} from "../dom/gameBoardDom";
import { resetGameDom, startGameDom } from "../dom/gameStartResetDom";
import Player from "./player";

const Game = () => {
  const isGameOver = (player1, player2) => {
    if (player1.gameboard.shipsSunk()) {
      return player2;
    }
    if (player2.gameboard.shipsSunk()) {
      return player1;
    }
    return 0;
  };
  const randomAttack = (player, enemy, playID) => {
    const attack = player.randomAttack(enemy);
    const attackID = `row-${attack.x}-col-${attack.y}-playID-${playID}`;
    updateGameboard(attackID);
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
  const easyAi = (player, enemy, playID) => {
    if (isGameOver(player, enemy) === 0) {
      randomAttack(player, enemy, playID);
      checkShips(enemy, playID);
    }
    if (isGameOver(player, enemy) !== 0) {
      displayGameOver(isGameOver(player, enemy).name);
    }
  };
  const playerTurn = (player, enemy, playID, data) => {
    const { x, y, hit } = data;
    if (isGameOver(player, enemy) === 0) {
      if (parseInt(hit, 10) === 0) {
        player.attack(enemy, x, y);
        const attackID = `row-${x}-col-${y}-playID-${playID}`;
        updateGameboard(attackID);
        checkShips(enemy, 1);
        easyAi(enemy, player, 0);
      }
    }
    if (isGameOver(player, enemy) !== 0) {
      displayGameOver(isGameOver(player, enemy).name);
    }
  };
  const createBoard = (play1ID, play2ID) => {
    const content = document.querySelector("#content");
    const gameboard1 = createGameBoard(10, play1ID);
    const gameboard2 = createGameBoard(10, play2ID);
    content.appendChild(gameboard1);
    content.appendChild(gameboard2);
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
  const startGame = (name1 = "", name2 = "AI") => {
    const player1 = Player();
    const player2 = Player();
    player1.name = name1;
    player2.name = name2;
    createBoard(0, 1);
    randomShipsPlacments(player1);
    randomShipsPlacments(player2);
    populateGame(player1.gameboard, 0, true);
    populateGame(player2.gameboard, 1, false);
    createClickableGameboard(player1, player2, 1, playerTurn);
    return { player1, player2 };
  };
  const resetGame = () => {
    resetGameDom();
  };
  const startGameButton = () => {
    const { name1, name2 } = startGameDom();
    const { player1, player2 } = startGame(name1, name2);
    // uncomment for testing
    // fakerGame(player1, player2);
  };
  const initGame = () => {
    const resetBtn = document.getElementById("resetBtn");
    const startBtn = document.getElementById("startBtn");
    resetBtn.addEventListener("click", resetGame);
    startBtn.addEventListener("click", startGameButton);
  };

  const fakerGame = (player1, player2) => {
    for (let i = 0; i < 120; i += 1) {
      if (i % 3 === 0) {
        easyAi(player1, player2, 1);
      } else {
        easyAi(player2, player1, 0);
      }
    }
  };
  return {
    placeShip,
    randomShipPlacment,
    randomShipsPlacments,
    startGame,
    isGameOver,
    initGame,
  };
};
export default Game;
