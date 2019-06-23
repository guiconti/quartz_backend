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
const constants = require('../../utils/constants');

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
  let { given, taken } = req.body;

  if (!game.players[playerIndex].hasToAnswerCard === constants.sockets.types.EUREKA) {
    return res.status(400).json({
      msg: constants.messages.error.NOT_USERS_TURN
    });
  }

  let playersCrystalIndex = game.players[playerIndex].crystals.findIndex(crystal => {
    return crystal.name === given && crystal.amount > 0 && given !== constants.values.crystals.AUTUNITA.name;
  });

  if (playersCrystalIndex === -1) {
    return res.status(400).json({
      msg: constants.messages.error.CRYSTALS_SENT_INVALID
    });
  }

  let pickedCrystalIndex = game.cache.findIndex(crystal => {
    return crystal === taken;
  });

  if (pickedCrystalIndex === -1) {
    return res.status(400).json({
      msg: constants.messages.error.CRYSTALS_SENT_INVALID
    });
  }

  for (let i = 0; i < game.players[playerIndex].crystals.length; i++) {
    if (game.players[playerIndex].crystals[i].name === given) {
      game.players[playerIndex].crystals[i].amount--;
    } else if (game.players[playerIndex].crystals[i].name === taken 
        && taken !== constants.values.crystals.AUTUNITA.name) {
      game.players[playerIndex].crystals[i].amount++;
    }
  }

  for (let i = 0; i < game.cave.crystals.length; i++) {
    if (game.cave.crystals[i].name === given) {
      game.cave.crystals[i].amount++;
    } else if (game.cave.crystals[i].name === taken
        && taken !== constants.values.crystals.AUTUNITA.name) {
      game.cave.crystals[i].amount--;
    }
  }

  game.players[playerIndex].hasToAnswerCard = '';
  game.players[playerIndex].answerSocket = {};
  game = nextTurn(game, playerIndex);

  game.save((err, savedGame) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }

    const message = {
      player: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex]._id
      },
      given: given,
      taken: taken
    };
    io.emit(String(savedGame._id), constants.sockets.types.EUREKA_ANSWER, message);
    io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
    return res.status(200).json({
      msg: constants.messages.info.CRYSTAL_PICKED
    });
  });
};
