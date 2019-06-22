/**
 * Module to start selling phase
 * @module utils/startSelling
 */

module.exports = game => {
  game.isSelling = true;
  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].keptCrystal && game.players[i].keptCrystal !== '') {
      for (let j = 0; j < game.players[i].crystals.length; j++) {
        if (game.players[i].crystals[j].name === game.players[i].keptCrystal) {
          game.players[i].crystals[j].amount++;
          game.players[i].keptCrystal = '';
          break;
        }
      }
    }
  }
};
