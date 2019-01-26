/**
 * @api {GET} /games/ List user's games
 * @apiName List games
 * @apiGroup Games
 * @apiVersion 1.0.0
 *
 * @apiParam {Boolean} active Filter by active games.
 * 
 * @apiSuccess (200) {json[]} msg Room info.
 * @apiSuccess (200) {String} _id Room id.
 * @apiSuccess (200) {String} owner Rooms owner id.
 * @apiSuccess (200) {String} game Rooms game id.
 * @apiSuccess (200) {Array} users Room users.
 * @apiSuccess (200) {Boolean} active Room active state.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "_id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "Game example",
          "players": [],
          "cave": {},
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
 * List Games
 *
 * @param {string} req.query.active - Rooms filter state
 * @return {object} - Returns the room in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let filters = { 'players.user': req.user._id };
  let { active, limit } = req.query;

  if (validator.isValidString(active)) {
    filters = { active, ...filters };
  }
  if (validator.isValidInteger(limit)) {
    limit = parseInt(limit);
  }

  database.Games
    .find(filters)
    .populate({
      path: 'players.user',
      select: 'username'
    })
    .sort({ created: 'desc'})
    .limit(limit)
    .exec((err, games) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    return res.status(200).json({
      msg: games
    });
  });
};
