/**
 * @api {POST} /rooms/ Create new room
 * @apiName Create room
 * @apiGroup Rooms
 * @apiVersion 1.0.0
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
          "users": ["391231903-asd901231"],
          "active": true
        }
    ]
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Create a room
 *
 * @param {string} req.body.name - Room name
 * @return {object} - Returns the room in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { name } = req.body;
  const owner = req.user._id;
  const users = [
    req.user._id
  ];

  if (!validator.isValidString(name)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NAME
    });
  }

  name = name.trim();
 
  const newRoom = new database.Rooms({ name, owner, users });

  newRoom.save((err, room) => {
    if (err || !room) {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }

    return res.status(200).json({
      msg: room
    });
  });
};
