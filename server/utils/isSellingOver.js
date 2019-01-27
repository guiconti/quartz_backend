/**
 * Module to check if selling is over
 * @module utils/isSellingOver
 */

module.exports = game => {
  for (let i = 0; i < game.players.length; i++) {
    if (!game.players[i].soldCrystals)
      return false;
  }
  return true;
};
