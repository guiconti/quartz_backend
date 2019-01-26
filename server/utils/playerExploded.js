/**
 * Module to explode player
 * @module utils/playerExploded
 */

module.exports = (game, playerIndex) => {
  game.players[playerIndex].isRoundActive = false;
  game.players[playerIndex].hasAnIdiotBook = true;
  for (let i = 0; i < game.cave.crystals.length; i++) {
    game.cave.crystals[i].amount += game.players[playerIndex].crystals[i].amount;
  }
  return game;
};
