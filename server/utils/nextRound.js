/**
 * Module to setup next round
 * @module utils/nextRound
 */

const generateCave = require('./generateCave');
const generateCardsBoard = require('./generateCardsBoard');
const pickCard = require('./pickCard');
const constants = require('./constants');

module.exports = game => {
  game.cave = generateCave();
  game.cardsDiscarded = game.cardsDiscarded.concat(JSON.parse(JSON.stringify(game.cardsBoard)));
  game.cardsBoard = generateCardsBoard(game.cardsPile, game.players.length);
  let amountOfRemainingCards = game.cardsPile.reduce((a, b) => a + b.amount, 0);
  if (amountOfRemainingCards < game.players.length + game.players.length - 1) {
    for (let i = 0; i < game.cardsDiscarded.length; i++) {
      cardIndex = game.cardsPile.findIndex(card => {
        return card.action === game.cardsDiscarded.action;
      });
      game.cardsPile[cardIndex].amount++;
    }
    game.cardsDiscarded = [];
  }
  game.players.forEach(player => {
    player.isRoundActive = true;
    player.currentTurn = false;
    player.soldCrystals = false;
    player.cards.push(pickCard(game.cardsPile));
    for (let i = 0; i < game.cave.crystals.length - 1; i++) {
      game.cave.crystals[i].amount -= player.crystals[i].amount;
    }
  });
  if (game.round >= constants.values.MAX_ROUNDS) {
    game.active = false;
    for (let i = 0; i < game.players.length; i++) {
      if (game.players[i].hasAnIdiotBook) {
        game.players[i].hasAnIdiotBook = false;
        game.players[i].money += constants.values.IDIOT_BOOK_VALUE;
      }
    }
    return game;
  }
  
  game.players[Math.floor(Math.random() * (game.players.length - 1))].currentTurn = true;
  game.round++;
  game.isSelling = false;
  return game;
};
