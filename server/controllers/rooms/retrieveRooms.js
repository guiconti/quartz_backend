/**
 * @api {GET} /rooms/ List rooms
 * @apiName List rooms
 * @apiGroup Rooms
 * @apiVersion 1.0.0
 *
 * @apiParam {Boolean} active Filter by active rooms.
 * 
 * @apiSuccess (200) {json[]} msg Room info.
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
          "game": "012a362a-4f31-496f-bf25-d785d4df42ed",
          "users": ["391231903-asd901231"],
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
 * List rooms
 *
 * @param {string} req.query.active - Rooms filter state
 * @return {object} - Returns the room in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let filters = {};
  let { active } = req.query;

  if (validator.isValidString(active)) {
    filters = { active, ...filters };
  }

  database.Rooms
    .find(filters)
    .populate('owner', 'username')
    .populate('users', 'username')
    .exec((err, rooms) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    return res.status(200).json({
      msg: rooms
    });
  });
};