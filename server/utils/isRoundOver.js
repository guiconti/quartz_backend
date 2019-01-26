/**
 * Module to check if round is over
 * @module utils/isRoundOver
 */

module.exports = game => {
  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].isRoundActive)
      return false;
  }
  return true;
};
