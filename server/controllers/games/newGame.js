/**
 * @api {POST} /games/ Create new game
 * @apiName Create game
 * @apiGroup Games
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json} msg Game info.
 * @apiSuccess (200) {String} _id Game id.
 * @apiSuccess (200) {String} name Games name.
 * @apiSuccess (200) {Array} players Games players.
 * @apiSuccess (200) {Object} cave Games cave.
 * @apiSuccess (200) {Array} cardsBoard Games cards on board.
 * @apiSuccess (200) {Array} cardsPile Games cards on pile.
 * @apiSuccess (200) {Array} cardsDiscarded Games cards discarded.
 * @apiSuccessExample {json} Success-Response:
    "msg": {
      "_id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "name": "Game test",
      "players": [{
        "_id": "012a332a-4f32-496f-bf25-d785d4df42ed",
        "username": "test"
      }],
      "cave": {},
      "cardsBoard": [],
      "cardsPile": [],
      "cardsDiscarded": []
    }
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const database = require('../../models/database');
const generatePlayer = require('../../utils/generatePlayer');
const generateCave = require('../../utils/generateCave');
const generateCardsPile = require('../../utils/generateCardsPile');
const generateCardsBoard = require('../../utils/generateCardsBoard');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');
const io = require('../../utils/io');

/**
 * Create a game
 *
 * @param {string} req.body.roomId - Games room id
 * @return {object} - Returns the message in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { roomId } = req.body;

  if (!validator.isValidString(roomId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_ROOM
    });
  }

  database.Rooms.findById(roomId)
    .populate('owner', 'username')
    .populate('users', 'username')
    .exec((err, room) => {
      if (err) {
        return res.status(500).json({
          msg: constants.messages.error.UNEXPECTED_DB
        });
      }
      if (String(room.owner._id) !== String(req.user._id)) {
        return res.status(403).json({
          msg: constants.messages.error.NOT_OWNER
        });
      }
      if (room.users.length <= 1 || !room.active) {
        return res.status(400).json({
          msg: constants.messages.error.ROOM_NOT_ENABLE
        });
      }

      let cardsPile = generateCardsPile();

      let playersData = [];
      room.users.forEach(user => {
        playersData.push(generatePlayer(user._id, cardsPile));
      });
      playersData[Math.floor(Math.random() * (playersData.length - 1))].currentTurn = true;

      let gameData = {
        name: room.name,
        players: playersData,
        cave: generateCave(),
        cardsBoard: generateCardsBoard(cardsPile, playersData.length),
        cardsPile: cardsPile,
        cardsDiscarded: []
      };
      database.Games.create(gameData, (err, game) => {
        if (err) {
          return res.status(500).json({
            msg: constants.messages.error.UNEXPECTED_DB
          });
        }
        io.emit(roomId, constants.sockets.types.START_GAME, game);
        io.emit(constants.sockets.types.JOIN_LOBBY, constants.sockets.types.NEW_GAME, game);
        room.active = false;
        room.save();
        return res.status(200).json({
          msg: game
        });
      });
    });
};
