/**
 * Module to calculate selling crystals value
 * @module utils/calculateCrystalsValue
 */

const constants = require('./constants');

module.exports = (game, playerIndex, keepCrystals, combo) => {
  switch (combo.type) {
    case constants.values.combos.types.THREE_MULTIPLY_ONE:
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        if (game.players[playerIndex].crystals[i].name === combo.conversion.toFirst) {
          game.players[playerIndex].money += 
            (game.players[playerIndex].crystals[i].amount - keepCrystals[i]) * game.players[playerIndex].crystals[i].value;
        }
        game.players[playerIndex].money += 
          (game.players[playerIndex].crystals[i].amount  - keepCrystals[i]) * game.players[playerIndex].crystals[i].value;
        game.players[playerIndex].crystals[i].amount = keepCrystals[i];
      }
      break;
    case constants.values.combos.types.FOUR_MULTIPLY_TWO:
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        if (game.players[playerIndex].crystals[i].name === combo.conversion.toFirst || 
          game.players[playerIndex].crystals[i].name === combo.conversion.toSecond) {
          game.players[playerIndex].money += 
            (game.players[playerIndex].crystals[i].amount - keepCrystals[i]) * game.players[playerIndex].crystals[i].value;
        }
        game.players[playerIndex].money += 
          (game.players[playerIndex].crystals[i].amount  - keepCrystals[i]) * game.players[playerIndex].crystals[i].value;
        game.players[playerIndex].crystals[i].amount = keepCrystals[i];
      }
      break;
    case constants.values.combos.types.FIVE_TO_EIGTH_COINS:
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        game.players[playerIndex].money += 
          (game.players[playerIndex].crystals[i].amount  - keepCrystals[i]) * game.players[playerIndex].crystals[i].value;
        game.players[playerIndex].crystals[i].amount = keepCrystals[i];
      }
      game.players[playerIndex].money += constants.values.combos.money.FIVE_TO_EIGTH_COINS;
      break;
    case constants.values.combos.types.SIX_TO_TWELVE_COINS:
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        game.players[playerIndex].money += 
          (game.players[playerIndex].crystals[i].amount  - keepCrystals[i]) * game.players[playerIndex].crystals[i].value;
        game.players[playerIndex].crystals[i].amount = keepCrystals[i];
      }
      game.players[playerIndex].money += constants.values.combos.money.SIX_TO_TWELVE_COINS;
      break;
    default:
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        game.players[playerIndex].money += 
          (game.players[playerIndex].crystals[i].amount  - keepCrystals[i]) * game.players[playerIndex].crystals[i].value;
        game.players[playerIndex].crystals[i].amount = keepCrystals[i];
      }
      break;
  }
  game.players[playerIndex].crystals[game.players[playerIndex].crystals.length - 1].amount = 0;
  game.players[playerIndex].soldCrystals = true;
  return game;
};
