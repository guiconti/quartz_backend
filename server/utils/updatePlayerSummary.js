const generateSummaries = require('./generateSummaries');

module.exports = (game, playerIndex) => {
  if (!game.players[playerIndex].user.summary) {
    game.players[playerIndex].user.summary = generateSummaries();
  }
  for (let i = 0; i < game.summaries[playerIndex].crystals.length; i++) {
    game.players[playerIndex].user.summary.crystals[i].amount += game.summaries[playerIndex].crystals[i].amount;
  }
  for (let i = 0; i < game.summaries[playerIndex].cards.length; i++) {
    game.players[playerIndex].user.summary.cards[i].amount += game.summaries[playerIndex].cards[i].amount;
  }
  game.players[playerIndex].user.summary.explosions += game.summaries[playerIndex].explosions;
  game.players[playerIndex].user.summary.closes += game.summaries[playerIndex].closes;
  game.players[playerIndex].user.summary.money += game.summaries[playerIndex].money;
  game.players[playerIndex].user.summary.games += game.summaries[playerIndex].games;
  game.players[playerIndex].user.summary.wins += game.summaries[playerIndex].wins;
};
