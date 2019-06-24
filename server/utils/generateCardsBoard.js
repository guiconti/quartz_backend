/**
 * Module to generate starting cards at board
 * @module utils/generateCardsBoard
 */

const constants = require('./constants');

module.exports = (cardsPile, playersAmount) => {
  let cardsBoard = [];
  for (let i = 0; i < playersAmount - 1; i++) {
    let shuffleCards = cardsPile.reduce((previousValue, currentValue, currentIndex) => {
      return previousValue + String(constants.shuffleDictionary[currentIndex]).repeat(currentValue.amount);
    }, '');
    let newBoardCardIndex = shuffleCards[Math.floor(Math.random() * (shuffleCards.length - 1))];
    newBoardCardIndex = constants.shuffleDictionary.findIndex(item => item == newBoardCardIndex);
    cardsBoard.push(JSON.parse(JSON.stringify(cardsPile[newBoardCardIndex])));
    cardsPile[newBoardCardIndex].amount--;
  }
  return cardsBoard;
};
