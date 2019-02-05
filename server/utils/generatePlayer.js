/**
 * Module to generate a new player
 * @module utils/generatePlayer
 */

const constants = require('./constants');

module.exports = (userId, cardsPile) => {
  let playerCards = [];
  for (let i = 0; i < constants.values.cards.AMOUNT_PER_PLAYER; i++) {
    let shuffleCards = cardsPile.reduce((previousValue, currentValue, currentIndex) => {
      return previousValue + String(currentIndex).repeat(currentValue.amount);
    }, '');
    let newPlayerCardIndex = shuffleCards[Math.floor(Math.random() * (shuffleCards.length - 1))];
    playerCards.push(JSON.parse(JSON.stringify(cardsPile[newPlayerCardIndex])));
    cardsPile[newPlayerCardIndex].amount--;
  }
  return {
    user: userId,
    crystals: [
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
    ],
    cards: playerCards
  };
};
