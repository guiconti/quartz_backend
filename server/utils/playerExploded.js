/**
 * Module to explode player
 * @module utils/playerExploded
 */

const updateSummary = require('./updateSummary');
const constants = require('./constants');

module.exports = (game, playerIndex) => {
  game.players[playerIndex].currentTurn = false;
  game.players[playerIndex].isRoundActive = false;
  game.players[playerIndex].hasAnIdiotBook = true;
  for (let i = 0; i < game.cave.crystals.length; i++) {
    game.cave.crystals[i].amount += game.players[playerIndex].crystals[i].amount;
    game.players[playerIndex].crystals[i].amount = 0;
  }
  updateSummary(game, playerIndex, constants.values.summary.EXPLODED);
  return game;
};
