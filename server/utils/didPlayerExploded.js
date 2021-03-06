/**
 * Module to check if player exploded
 * @module utils/didPlayerExploded
 */

const addPlayLog = require('./addPlayLog');

module.exports = (game, playerIndex) => {
  let playerDied = game.players[playerIndex].crystals[game.players[playerIndex].crystals.length - 1].amount >= 2;
  if (playerDied && game.players[playerIndex].hasAnIdiotBook) {
    game.players[playerIndex].hasAnIdiotBook = false;
    game.players[playerIndex].crystals[game.players[playerIndex].crystals.length - 1].amount--;
    game.cave.crystals[game.cave.crystals.length - 1].amount++;
    addPlayLog(game, `${game.players[playerIndex].user.username} used his/her idiot book`);
  }
  return game.players[playerIndex].crystals[game.players[playerIndex].crystals.length - 1].amount >= 2;
};
