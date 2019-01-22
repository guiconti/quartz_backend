/**
 * Module to generate a new cave
 * @module utils/generateCave
 */

const constants = require('./constants');

module.exports = () => {
  return {
    crystals: [
      {
        name: constants.values.crystals.QUARTZO.name,
        value: constants.values.crystals.QUARTZO.value,
        amount: constants.values.crystals.QUARTZO.amount
      },
      {
        name: constants.values.crystals.RUBELITA.name,
        value: constants.values.crystals.RUBELITA.value,
        amount: constants.values.crystals.RUBELITA.amount
      },
      {
        name: constants.values.crystals.ESMERALDA.name,
        value: constants.values.crystals.ESMERALDA.value,
        amount: constants.values.crystals.ESMERALDA.amount
      },
      {
        name: constants.values.crystals.SAFIRA.name,
        value: constants.values.crystals.SAFIRA.value,
        amount: constants.values.crystals.SAFIRA.amount
      },
      {
        name: constants.values.crystals.RUBI.name,
        value: constants.values.crystals.RUBI.value,
        amount: constants.values.crystals.RUBI.amount
      },
      {
        name: constants.values.crystals.AMBAR.name,
        value: constants.values.crystals.AMBAR.value,
        amount: constants.values.crystals.AMBAR.amount
      },
      {
        name: constants.values.crystals.AUTUNITA.name,
        value: constants.values.crystals.AUTUNITA.value,
        amount: constants.values.crystals.AUTUNITA.amount
      }
    ]
  };
};
