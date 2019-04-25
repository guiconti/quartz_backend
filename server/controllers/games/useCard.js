/**
 * @api {PATCH} /games/:gameId/crystal Use a crystal
 * @apiName Use a card
 * @apiGroup Games
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {String} msg Card used.
 * @apiSuccessExample {json} Success-Response:
    "msg": "Crystal picked."
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const io = require('../../utils/io');
const nextTurn = require('../../utils/nextTurn');
const didPlayerExploded = require('../../utils/didPlayerExploded');
const playerExploded = require('../../utils/playerExploded');
const isRoundOver = require('../../utils/isRoundOver');
const constants = require('../../utils/constants');

const retrieveControllers = require('../../utils/retrieveControllers');
const cards = retrieveControllers('cards');

/**
 * Retrieve a crystal for user
 *
 * @param {string} req.params.gameId - Game id to retrieve info 
 * @return {object} - Returns the game in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { game, playerIndex } = req;
  let { action, info } = req.body;

  if (!game.players[playerIndex].currentTurn) {
    return res.status(400).json({
      msg: constants.messages.error.NOT_USERS_TURN
    });
  }

  const cardIndex = game.players[playerIndex].cards.findIndex(card => {
    return card.action === action;
  });

  if (cardIndex === -1) {
    return res.status(400).json({
      msg: constants.messages.error.USER_DONT_HAVE_CARD
    });
  }
  
  return cards[action](game, playerIndex, cardIndex, info)
    .then(() => {
      return res.status(200).json({
        msg: constants.messages.info.CARD_USED
      });
    })
    .catch(err => {
      if (err.status !== undefined) {
        console.log('err :', err);
        return res.status(err.status).json({
          msg: err.msg
        });
      }
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });

  if (didPlayerExploded(game, playerIndex)) {
    game = playerExploded(game, playerIndex);
    if (isRoundOver(game)) {
      game.isSelling = true;
    } else {
      game = nextTurn(game, playerIndex);
    }
  } else {
    game = nextTurn(game, playerIndex);
  }

  game.save((err, savedGame) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    
    io.emit(String(savedGame._id), constants.sockets.types.CRYSTAL_PICKED, crystalPicked);
    io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
    return res.status(200).json({
      msg: constants.messages.info.CRYSTAL_PICKED
    });
  });
};
