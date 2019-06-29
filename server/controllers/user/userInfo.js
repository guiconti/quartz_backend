/**
 * @api {GET} /user Retrieve logged user info
 * @apiName Retrieve logged user info
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json} msg User info.
 * @apiSuccess (200) {String} _id User id.
 * @apiSuccess (200) {String} username User name.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "_id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "username": "example"
        }
    ]
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const database = require('../../models/database');
const constants = require('../../utils/constants');

/**
 * Retrieve user logged user info
 *
 * @param {string} req.user.id - User id to retrieve info 
 * @return {object} - Returns the game in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  database.Users
    .findById(req.user.id, '_id username notificationSettings')
    .exec((err, user) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    return res.status(200).json({
      msg: user
    });
  });
};
