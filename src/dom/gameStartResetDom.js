function resetGameDom() {
  const content = document.getElementById("content");
  content.style.display = "none";
  const gameOver = document.getElementById("gameOver");
  const displayWinner = document.getElementById("displayWinner");
  const startDiv = document.getElementById("start");
  gameOver.style.display = "none";
  displayWinner.innerText = "";
  startDiv.style.display = "block";
  while (content.firstChild) {
    content.removeChild(content.lastChild);
  }
}
function startGameDom() {
  const content = document.getElementById("content");
  const startDiv = document.getElementById("start");
  const player1 = document.getElementById("player1");
  /*  const player2 = document.getElementById("player2");
  const opponent = document.getElementsByName("opponent");
  let aiLvl = 0;
  for (let i = 0; i < opponent.length; i += 1) {
    if (opponent[i].checked === true) {
      aiLvl = opponent[i].value;
      break;
    }
  } */
  startDiv.style.display = "none";
  content.style.display = "flex";
  const name1 = player1.value;
  const name2 = "EasyAI";
  return { name1, name2 };
}
export { resetGameDom, startGameDom };
