/**
 * Module to check if round is over
 * @module utils/isRoundOver
 */

const generateCave = require('./generateCave');
const constants = require('./constants');

module.exports = (game, playerIndex) => {
  game.cave = generateCave();
  game.players.forEach(player => {
    player.isRoundActive = true;
    player.currentTurn = false;
    player.crystals = [
      {
        name: constants.values.crystals.QUARTZO.name,
        value: constants.values.crystals.QUARTZO.value
      },
      {
        name: constants.values.crystals.RUBELITA.name,
        value: constants.values.crystals.RUBELITA.value
      },
      {
        name: constants.values.crystals.ESMERALDA.name,
        value: constants.values.crystals.ESMERALDA.value
      },
      {
        name: constants.values.crystals.SAFIRA.name,
        value: constants.values.crystals.SAFIRA.value
      },
      {
        name: constants.values.crystals.RUBI.name,
        value: constants.values.crystals.RUBI.value
      },
      {
        name: constants.values.crystals.AMBAR.name,
        value: constants.values.crystals.AMBAR.value
      },
      {
        name: constants.values.crystals.AUTUNITA.name,
        value: constants.values.crystals.AUTUNITA.value
      }
    ];
  });
  game.players[playerIndex].currentTurn = true;
  return game;
};
