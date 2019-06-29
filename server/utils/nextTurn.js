/**
 * Module to change players's turn
 * @module utils/nextTurn
 */

const push = require('./push');

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
  if (game.players[playerIndex].user.notificationSettings) {
    const payload = {
      title: 'It\'s your turn!',
      body: 'Go mine some crystals.',
      icon: '/static/icon-192x192.png',
      url: `https://quartz.tiimus.com/games/${String(game._id)}`
    };
    for (let i = 0; i < game.players[playerIndex].user.notificationSettings.length; i++) {
      push(game.players[playerIndex].user.notificationSettings[i], payload);
    }
  }
  return game;
};
