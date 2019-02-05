/**
 * Module to generate starting cards at board
 * @module utils/generateCardsBoard
 */

const constants = require('./constants');

module.exports = (cardsPile, playersAmount) => {
  let cardsBoard = [];
  for (let i = 0; i < playersAmount; i++) {
    let newBoardCardIndex = Math.floor(Math.round() * (cardsPile.length - 1));
    cardsBoard.push(cardsPile(newBoardCardIndex));
    cardsPile.splice(newBoardCardIndex, 1);
  }
  return cardsBoard;
};
