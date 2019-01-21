/**
 * @api {POST} /auth/sign_up User sign up
 * @apiName Sign Up
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username Users username.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess (201) {String} id User id.
 * @apiSuccess (201) {String} username User name.
 * @apiSuccessExample {json} Success-Response:
    {
      "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "username": "example"
    }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Username not valid." }
  *
 */
const database = require('../../models/database');
const encryptor = require('../../utils/encryptor');
const generateToken = require('../../utils/generateToken');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Create a new user
 *
 * @param {object} req.body - New user info
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { username, password } = req.body;
  let { file } = req;
  if (!validator.isValidString(username)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_USERNAME
    });
  }
  if (!validator.isValidString(password)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_PASSWORD
    });
  }

  username = username.trim();
  password = encryptor(password, constants.values.PASSWORD_ENCRYPT_KEY);

  if (!password) {
    return res.status(500).json({
      msg: constants.messages.error.UNEXPECTED_RUNNING
    });
  }

  const newUser = new database.Users({ username, password });
  newUser.save((err, user) => {
    if (err) {
      if (err.code === constants.values.errorCodes.DUPLICATE_UNIQUE) {
        return res.status(400).json({
          msg: constants.messages.error.USERNAME_NOT_UNIQUE
        });
      }
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    const userData = {
      _id: user._id,
      username: user.username
    };
    const tokenData = encryptor(userData, constants.values.USER_DATA_ENCRYPT_KEY);
    res.cookie(
      constants.values.TOKEN_NAME,
      generateToken(
        tokenData,
        constants.values.TOKEN_ENCRYPT_KEY,
        constants.values.TOKEN_EXPIRATION_IN_SECONDS
      ),
      {
        expires: new Date(Date.now() + (constants.values.TOKEN_EXPIRATION_IN_SECONDS * 1000))
      }
    );

    return res.status(201).json({
      msg: userData
    });
  });
};
