/**
 * Module to generate a new player
 * @module utils/generatePlayer
 */

const constants = require('./constants');

module.exports = game => {
  let summaries = [];
  for (let i = 0; i < game.players.length; i++) {
    summaries[i].crystals = [
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
    summaries[i].cards = JSON.parse(JSON.stringify(constants.values.cards.list));
    summaries[i].cards.forEach(card => {
      card.amount = 0;
    });
  }
  return summaries;
};
