/**
 * Module to random pick a card from pile
 * @module utils/pickCard
 */

const constants = require('./constants');

module.exports = cardsPile => {
  let shuffleCards = cardsPile.reduce((previousValue, currentValue, currentIndex) => {
    return previousValue + String(constants.shuffleDictionary[currentIndex]).repeat(currentValue.amount);
  }, '');
  let cardIndex = shuffleCards[Math.floor(Math.random() * (shuffleCards.length - 1))];
  cardIndex = constants.shuffleDictionary.findIndex(item => item == cardIndex);
  cardsPile[cardIndex].amount--;
  return JSON.parse(JSON.stringify(cardsPile[cardIndex]));
};
