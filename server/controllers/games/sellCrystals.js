/**
 * @api {GET} /games/:gameId/sell Sell player's crystals
 * @apiName Sell player's crystals
 * @apiGroup Games
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {String} msg Money won
 * @apiSuccessExample {json} Success-Response:
    "msg": "49"
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const io = require('../../utils/io');
const performSelling = require('../../utils/performSelling');
const isSellingOver = require('../../utils/isSellingOver');
const nextRound = require('../../utils/nextRound');
const addPlayLog = require('../../utils/addPlayLog');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Sell player's crystals
 *
 * @param {string} req.params.gameId - Game id to retrieve info 
 * @return {object} - Returns the game in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { game, playerIndex } = req;
  let { keepCrystals, combo } = req.body;

  if (!game.isSelling) {
    return res.status(400).json({
      msg: constants.messages.error.SELLING_NOT_AVAILABLE
    })
  }
  if (game.players[playerIndex].soldCrystals) {
    return res.status(400).json({
      msg: constants.messages.error.ALREADY_SOLD
    });
  }
  if (!validator.isValidArray(keepCrystals)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_CRYSTALS_TO_KEEP
    });
  }
  if (!validator.isValidSelling(game, playerIndex, keepCrystals, combo)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_SELLING
    });
  }
  let moneyWon = game.players[playerIndex].money;
  game = performSelling(game, playerIndex, keepCrystals, combo);
  moneyWon = game.players[playerIndex].money - moneyWon;
  if (isSellingOver(game)) {
    game = nextRound(game);
  }

  game.save((err, savedGame) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
    const message = {
      title: 'Day of work summary',
      message: `You received ${moneyWon} coins for this day of work.`
    };
    io.emit(String(game.players[playerIndex]._id), constants.sockets.types.INFORMATIVE, message);
    addPlayLog(game, `${game.players[playerIndex].user.username} received ${moneyWon} coins for this day of work`);
    if (!game.active) {
      //  Save summary
      game.players.forEach(player => {
        player.user.save((err, userSaved) => {});
      });
    }
    return res.status(200).json({
      msg: moneyWon
    });
  });
};
