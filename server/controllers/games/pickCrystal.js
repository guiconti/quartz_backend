/**
 * @api {GET} /games/:gameId/crystal Pick a crystal
 * @apiName Pick a crystal for the user
 * @apiGroup Games
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {String} msg Picked crystal info.
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
const startSelling = require('../../utils/startSelling');
const updateSummary = require('../../utils/updateSummary');
const addPlayLog = require('../../utils/addPlayLog');
const constants = require('../../utils/constants');

/**
 * Retrieve a crystal for user
 *
 * @param {string} req.params.gameId - Game id to retrieve info 
 * @return {object} - Returns the game in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = async (req, res) => {
  let { game, playerIndex } = req;

  if (!game.players[playerIndex].currentTurn
    || game.waitingPlayerForDefensiveResponse !== ''
    || game.players[playerIndex].hasToAnswerCard !== '') {
    return res.status(400).json({
      msg: constants.messages.error.NOT_USERS_TURN
    });
  }
  let crystalPicker = '';
  for (let i = 0; i < game.cave.crystals.length; i++){
    crystalPicker += String(i).repeat(game.cave.crystals[i].amount);
  }
  let crystalIndex = crystalPicker[Math.floor(Math.random() * (crystalPicker.length - 1))];
  game.cave.crystals[crystalIndex].amount--;
  game.players[playerIndex].crystals[crystalIndex].amount++;
  const crystalPicked = {
    player: {
      username: game.players[playerIndex].user.username,
      _id: game.players[playerIndex]._id
    },
    crystal: game.cave.crystals[crystalIndex].name
  };
  updateSummary(game, playerIndex, constants.values.summary.PICKED_CRYSTAL, game.cave.crystals[crystalIndex]);
  let sentExplosionMessage = false;
  if (didPlayerExploded(game, playerIndex)) {
    game = await playerExploded(game, playerIndex);
    sentExplosionMessage = true;
    if (isRoundOver(game)) {
      startSelling(game);
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
    
    if (!sentExplosionMessage)
      io.emit(String(savedGame._id), constants.sockets.types.CRYSTAL_PICKED, crystalPicked);
    addPlayLog(game, `${game.players[playerIndex].user.username} picked a/an ${crystalPicked.crystal}`);
    io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
    return res.status(200).json({
      msg: constants.messages.info.CRYSTAL_PICKED
    });
  });
};
