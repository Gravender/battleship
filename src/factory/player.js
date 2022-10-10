import Gameboard from "./Gameboard";

const Player = () => {
  const gameboard = Gameboard();
  const attack = (enemy, x, y) => {
    return enemy.gameboard.receiveAttack(x, y);
  };
  const randomAttack = (enemy) => {
    let attackHit = false;
    let x;
    let y;
    while (!attackHit) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      attackHit = enemy.gameboard.receiveAttack(x, y);
    }
    return { x, y };
  };
  return { gameboard, attack, randomAttack };
};

export default Player;
