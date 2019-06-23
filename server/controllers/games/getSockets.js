const io = require('../../utils/io');
const constants = require('../../utils/constants');

/**
 * Retrieve user's missing sockets
 *
 * @return {object} - Returns the game in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { game, playerIndex } = req;

  if (game.players[playerIndex].answerSocket.socketType) {
    io.emit(String(game.players[playerIndex]._id),
      game.players[playerIndex].answerSocket.socketType,
      game.players[playerIndex].answerSocket.message
    );
  }

  return res.status(200).json({
    msg: constants.messages.info.SOCKETS_SENT
  });
};
