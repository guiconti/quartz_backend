module.exports = (game, playerIndex, cardIndex) => {
  game.cardsDiscarded.push(JSON.parse(JSON.stringify(game.players[playerIndex].cards[cardIndex])));
  game.players[playerIndex].cards.splice(cardIndex, 1);
};