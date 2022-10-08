import Gameboard from "./Gameboard";

const Player = () => {
  const gameboard = new Gameboard();
  const attack = (enemy, x, y) => {
    return enemy.gameboard.receiveAttack(x, y);
  };
  const randomAttack = (enemy) => {
    let attackHit = false;
    while (!attackHit) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      attackHit = enemy.gameboard.receiveAttack(x, y);
    }
    return true;
  };
  return { gameboard, attack, randomAttack };
};

export default Player;
