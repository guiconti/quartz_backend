/**
 * Module to explode player
 * @module utils/playerExploded
 */

const updateSummary = require('./updateSummary');
const getGif = require('./getGif');
const io = require('./io');
const constants = require('./constants');

module.exports = async (game, playerIndex) => {
  game.players[playerIndex].currentTurn = false;
  game.players[playerIndex].isRoundActive = false;
  game.players[playerIndex].hasAnIdiotBook = true;
  for (let i = 0; i < game.cave.crystals.length; i++) {
    game.cave.crystals[i].amount += game.players[playerIndex].crystals[i].amount;
    game.players[playerIndex].crystals[i].amount = 0;
  }
  updateSummary(game, playerIndex, constants.values.summary.EXPLODED);
  let gifUrl = await getGif(constants.urls.GIPHY + constants.values.GIPHY_API_KEY + constants.urls.EXPLOSION_SUFFIX)
    .catch(err => {
      return false;
    });
  if (gifUrl) {
    const message = {
      title: `${game.players[playerIndex].user.username} exploded!`,
      url: gifUrl
    };
    io.emit(String(game._id), constants.sockets.types.INFORMATIVE, message);
  }
  return game;
};
