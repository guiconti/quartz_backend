/**
 * Module to random pick a card from pile
 * @module utils/pickCard
 */

module.exports = cardsPile => {
  let shuffleCards = cardsPile.reduce((previousValue, currentValue, currentIndex) => {
    return previousValue + String(currentIndex).repeat(currentValue.amount);
  }, '');
  let cardIndex = shuffleCards[Math.floor(Math.random() * (shuffleCards.length - 1))];
  cardsPile[cardIndex].amount--;
  return JSON.parse(JSON.stringify(cardsPile[cardIndex]));
};
