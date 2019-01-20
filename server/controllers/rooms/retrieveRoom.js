/**
 * @api {GET} /rooms/:roomId Retrieve room info
 * @apiName Retrieve room info
 * @apiGroup Rooms
 * @apiVersion 1.0.0
 *
 * @apiParam {Boolean} active Filter by active rooms.
 * 
 * @apiSuccess (200) {json} msg Room info.
 * @apiSuccess (200) {String} _id Room id.
 * @apiSuccess (200) {String} owner Rooms owner id.
 * @apiSuccess (200) {String} game Rooms game id.
 * @apiSuccess (200) {Array} users Room users.
 * @apiSuccess (200) {Boolean} active Room active state.
 * @apiSuccessExample {json} Success-Response:
    "msg": {
      "_id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "name": "Room example",
      "owner": "012a332a-4f32-496f-bf25-d785d4df42ed",
      "game": "012a362a-4f31-496f-bf25-d785d4df42ed",
      "users": [{
        "_id": "391231903-asd901231",
        "username": "example",
      }],
      "active": true
    }
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const database = require('../../models/database');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * List rooms
 *
 * @param {string} req.query.active - Rooms filter state
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
    .populate('owner', 'username')
    .populate('users', 'username')
    .exec((err, room) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    return res.status(200).json({
      msg: room
    });
  });
};
