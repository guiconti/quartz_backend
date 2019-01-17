/**
 * @api {PATCH} /rooms/:roomId Join room
 * @apiName Join room
 * @apiGroup Rooms
 * @apiVersion 1.0.0
 *
 * @apiParam {String} roomId Room to join
 *
 * @apiSuccess (200) {json} msg Room info.
 * @apiSuccess (200) {String} id Room id.
 * @apiSuccess (200) {String} owner Rooms owner id.
 * @apiSuccess (200) {String} game Rooms game id.
 * @apiSuccess (200) {Array} users Room users.
 * @apiSuccess (200) {Boolean} active Room active state.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "Room example",
          "owner": "012a332a-4f32-496f-bf25-d785d4df42ed",
          "game": "",
          "users": ["391231903-asd901231", "391231913-asd901231"],
          "active": true
        }
    ]
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const database = require('../../models/database');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Add user to a room
 *
 * @param {string} req.params.roomId - Room id to join
 * @param {string} req.user - User to join room
 * @return {object} - Returns the room in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { roomId } = req.params;

  if (!validator.isValidString(roomId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_ROOM
    });
  }

  database.Rooms
  .findById(roomId)
  .exec((err, room) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    if (!room) {
      return res.status(404).json({
        msg: constants.messages.error.ROOM_NOT_FOUND
      });
    }
    if (!room.active || room.users.length >= constants.values.MAX_ROOM_USERS) {
      return res.status(400).json({
        msg: constants.messages.error.INACTIVE_ROOM
      });
    }
    room.users.addToSet(req.user.id);
    room
      .save((err, savedRoom) => {
        if (err) {
          return res.status(500).json({
            msg: constants.messages.error.UNEXPECTED_DB
          });
        }
        return res.status(200).json({
          msg: savedRoom
        });
      });
  });
};
