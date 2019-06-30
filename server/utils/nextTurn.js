/**
 * Module to change players's turn
 * @module utils/nextTurn
 */

const push = require('./push');
const constants = require('./constants');

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
  const payload = {
    title: constants.messages.push.currentTurn.title,
    body: constants.messages.push.currentTurn.body,
    icon: constants.assets.smallIcon,
    data: {
      url: `https://quartz.tiimus.com/games/${String(game._id)}`
    }
  };
  push(game, playerIndex, payload);
  return game;
};
