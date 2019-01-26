/**
 * Module to check if player exploded
 * @module utils/didPlayerExploded
 */

module.exports = (game, playerIndex) => {
  return game.players[playerIndex].crystals[game.players[playerIndex].crystals.length - 1].amount >= 2;
};
