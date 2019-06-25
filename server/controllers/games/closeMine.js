/**
 * @api {GET} /games/:gameId/close_mine Close player's mine
 * @apiName Close mine for user
 * @apiGroup Games
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {String} msg Picked crystal info.
 * @apiSuccessExample {json} Success-Response:
    "msg": "Mine closed."
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const io = require('../../utils/io');
const nextTurn = require('../../utils/nextTurn');
const isRoundOver = require('../../utils/isRoundOver');
const startSelling =  require('../../utils/startSelling');
const constants = require('../../utils/constants');

/**
 * Close mine's user
 *
 * @param {string} req.params.gameId - Game id to retrieve info 
 * @return {object} - Returns the game in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { game, playerIndex } = req;

  if (!game.players[playerIndex].currentTurn || game.waitingPlayerForDefensiveResponse !== '') {
    return res.status(400).json({
      msg: constants.messages.error.NOT_USERS_TURN
    });
  }

  let canPickACard = false;
  for (let i = 0; i < game.players.length; i++) {
    if (!game.players[i].isRoundActive) {
      canPickACard = true;
      break;
    }
  }

  let pickedCard = null;
  if (canPickACard) {
    pickedCard = JSON.parse(JSON.stringify(game.cardsBoard.shift()));
    game.players[playerIndex].cards.push(pickedCard);
  }

  game.players[playerIndex].isRoundActive = false;
  game.players[playerIndex].currentTurn = false;
  if (isRoundOver(game)) {
    startSelling(game);
  } else {
    game = nextTurn(game, playerIndex);
  }

  game.save((err, savedGame) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    if (pickedCard) {
      const message = {
        title: 'What a brave man!',
        message: `You were brave enough to last until this far. We salute you by giving you the ${pickedCard.name} card.`
      };
      io.emit(String(game.players[playerIndex]._id), constants.sockets.types.INFORMATIVE, message);
    }
    io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
    return res.status(200).json({
      msg: constants.messages.info.MINE_CLOSED
    });
  });
};
