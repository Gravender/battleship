import "./css/style.css";
import Game from "./factory/game";

function simulateGame() {
  const game = Game();
  game.fakerGame();
}
simulateGame();
