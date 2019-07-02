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
const constants = require('../../utils/constants');
const updateSummary = require('../../utils/updateSummary');
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
  
  if (!game.players[playerIndex].currentTurn && 
    game.waitingPlayerForDefensiveResponse !== String(game.players[playerIndex]._id)
  ) {
    return res.status(400).json({
      msg: constants.messages.error.NOT_USERS_TURN
    });
  }

  const cardIndex = game.players[playerIndex].cards.findIndex(card => {
    return card.action === action;
  });

  if (cardIndex === -1 && game.players[playerIndex].hasToAnswerCard !== action) {
    return res.status(400).json({
      msg: constants.messages.error.USER_DONT_HAVE_CARD
    });
  }

  updateSummary(game, playerIndex, constants.values.summary.USED_CARD, game.players[playerIndex].cards[cardIndex]);
  
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
      console.log(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
