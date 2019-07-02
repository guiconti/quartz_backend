const constants = require('./constants');

module.exports = (game, playerIndex, type, payload = {}) => {
  switch(type) {
    case constants.values.summary.PICKED_CRYSTAL:
      for (let i = 0; i < game.summaries[playerIndex].crystals.length; i++) {
        if (game.summaries[playerIndex].crystals[i].name === payload.name) {
          game.summaries[playerIndex].crystals[i].amount++
          break;
        }
      }
      break;
    case constants.values.summary.USED_CARD:
      for (let i = 0; i < game.summaries[playerIndex].cards.length; i++) {
        console.log(game.summaries[playerIndex].cards[i].action);
        console.log(payload.action);
        console.log(game.summaries[playerIndex].cards[i].action === payload.action)
        if (game.summaries[playerIndex].cards[i].action === payload.action) {
          console.log(game.summaries[playerIndex].cards[i].amount);
          game.summaries[playerIndex].cards[i].amount++;
          console.log(game.summaries[playerIndex].cards[i].amount);
          break;
        }
      }
      break;
    case constants.values.summary.EXPLODED:
        game.summaries[playerIndex].explosions++;
      break;
    case constants.values.summary.CLOSED:
        game.summaries[playerIndex].closes++;
      break;
    case constants.values.summary.END_GAME:
      game.summaries[playerIndex].games++;
      if (payload.won)
        game.summaries[playerIndex].won++;
      break;
  }
};
