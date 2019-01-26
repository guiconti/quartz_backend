/**
 * Module to change players's turn
 * @module utils/nextTurn
 */

module.exports = (game, playerIndex) => {
  game.players[playerIndex].currentTurn = false;
  playerIndex++;
  while(true) {
    if (playerIndex >= game.players.length)
      playerIndex = 0;
    if (game.players[playerIndex].isRoundActive) {
      game.players[playerIndex].currentTurn = true;
      break;
    }
    playerIndex++;
  }
  return game;
};
