/**
 * @api {POST} /user/notification Set notification
 * @apiName Set notification info
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json} msg User info.
 * @apiSuccess (200) {String} _id User id.
 * @apiSuccess (200) {String} username User name.
 * @apiSuccessExample {json} Success-Response:
    "msg": "Done"
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const validator = require('../../utils/validator');
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
  let { endpoint, keys } =  req.body;
  let { user } = req;

  if (!validator.isValidString(endpoint)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NOTIFICATION_SETTINGS
    });
  }
  if (!validator.isValidString(keys.auth)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NOTIFICATION_SETTINGS
    });
  }
  if (!validator.isValidString(keys.p256dh)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NOTIFICATION_SETTINGS
    });
  }

  for (let i = 0; user.notificationSettings.length; i++) {
    if (user.notificationSettings[i].keys.auth === auth) {
      return res.status(200).json({});
    }
  }

  user.notificationSettings.push({
    endpoint,
    keys
  });

  user.save((err, savedGame) => {
    if (err) {
      return reject(err);
    }
    
    return res.status(200).json({});
  });
};
