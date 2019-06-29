/**
 * Middleware to restrict user game authentication
 * @module controllers/gameMiddleware
 *
 */

const tokenDecryptor = require('../utils/tokenDecryptor');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const database = require('../models/database');

/**
 * Check if user`s token is valid for this game
 *
 * @param {string} req.headers.cookies- User`s API Key
 * @param {string} req.params.gameId - Games`s ID
 * @return {callback} - Calls the API
 * @throws {json} - Throws a message with the error info
 */
module.exports = (req, res, next) => {
  if (!req.cookies || !validator.isValidString(req.cookies.session)) {
    return res.status(401).json({
      msg: constants.messages.error.INVALID_LOGIN
    });
  }

  let user = tokenDecryptor(req.cookies.session, constants.values.TOKEN_ENCRYPT_KEY);

  if (!user) {
    return res.status(401).json({
      msg: constants.messages.error.INVALID_LOGIN
    });
  }

  const { gameId } = req.params;

  return database.Games
    .findById(gameId)
    .populate({
      path: 'players.user',
      select: 'username notificationSettings'
    })
    .exec((err, game) => {
      if (err) {
        return res.status(500).json({
          msg: constants.messages.error.UNEXPECTED_DB
        });
      }
      if (!game) {
        return res.status(400).json({
          msg: constants.messages.error.INVALID_GAME
        });
      }
      let playerIndex = -1;
      for (let i = 0; i < game.players.length; i++) {
        if (String(game.players[i].user._id) === String(user._id)) {
          playerIndex = i;
          break;
        }
      }

      if (playerIndex < 0) {
        return res.status(401).json({
          msg: constants.messages.error.USER_NOT_PLAYING
        });
      }
      
      req.game = game;
      req.user = user;
      req.playerIndex = playerIndex;
      return next();
    });
};
