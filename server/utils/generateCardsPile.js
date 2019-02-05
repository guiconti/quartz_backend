/**
 * Module to generate a new card pile
 * @module utils/generateCardsPile
 */

const constants = require('./constants');

module.exports = () => {
  return constants.values.cards.list;
};
