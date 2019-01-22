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
      const initialCrystals = [
        {
          name: constants.values.crystals.QUARTZO.name,
          value: constants.values.crystals.QUARTZO.value
        },
        {
          name: constants.values.crystals.RUBELITA.name,
          value: constants.values.crystals.RUBELITA.value
        },
        {
          name: constants.values.crystals.ESMERALDA.name,
          value: constants.values.crystals.ESMERALDA.value
        },
        {
          name: constants.values.crystals.SAFIRA.name,
          value: constants.values.crystals.SAFIRA.value
        },
        {
          name: constants.values.crystals.RUBI.name,
          value: constants.values.crystals.RUBI.value
        },
        {
          name: constants.values.crystals.AMBAR.name,
          value: constants.values.crystals.AMBAR.value
        },
        {
          name: constants.values.crystals.AUTUNITA.name,
          value: constants.values.crystals.AUTUNITA.value
        }
      ];
      let caveData = {
        crystals: [
          {
            name: constants.values.crystals.QUARTZO.name,
            value: constants.values.crystals.QUARTZO.value,
            amount: constants.values.crystals.QUARTZO.amount
          },
          {
            name: constants.values.crystals.RUBELITA.name,
            value: constants.values.crystals.RUBELITA.value,
            amount: constants.values.crystals.RUBELITA.amount
          },
          {
            name: constants.values.crystals.ESMERALDA.name,
            value: constants.values.crystals.ESMERALDA.value,
            amount: constants.values.crystals.ESMERALDA.amount
          },
          {
            name: constants.values.crystals.SAFIRA.name,
            value: constants.values.crystals.SAFIRA.value,
            amount: constants.values.crystals.SAFIRA.amount
          },
          {
            name: constants.values.crystals.RUBI.name,
            value: constants.values.crystals.RUBI.value,
            amount: constants.values.crystals.RUBI.amount
          },
          {
            name: constants.values.crystals.AMBAR.name,
            value: constants.values.crystals.AMBAR.value,
            amount: constants.values.crystals.AMBAR.amount
          },
          {
            name: constants.values.crystals.AUTUNITA.name,
            value: constants.values.crystals.AUTUNITA.value,
            amount: constants.values.crystals.AUTUNITA.amount
          }
        ]
      };

      database.Caves.create(caveData, (err, cave) => {
        if (err) {
          return res.status(500).json({
            msg: constants.messages.error.UNEXPECTED_DB
          });
        }
        let playersData = [];
        room.users.forEach(user => {
          let userData = {
            user: user.id,
            crystals: initialCrystals
          };
          playersData.push(userData);
        });

        database.Players.insertMany(playersData, (err, players) => {
          if (err) {
            return res.status(500).json({
              msg: constants.messages.error.UNEXPECTED_DB
            });
          }
          let gameData = {
            name: room.name,
            players: players,
            cave: cave,
            cardsBoard: [],
            cardsPile: [],
            cardsDiscarded: []
          };
          database.Games.create(gameData, (err, game) => {
            if (err) {
              return res.status(500).json({
                msg: constants.messages.error.UNEXPECTED_DB
              });
            }
            io.emit(roomId, constants.sockets.types.START_GAME, game);
            return res.status(200).json({
              msg: game
            });
          });
        });
      });
    });
};
