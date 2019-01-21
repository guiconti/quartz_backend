/**
 * @api {POST} /auth/sign_in User login
 * @apiName SignIn
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username Users username.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess (200) {String} msg Login confirmation message.
 * @apiSuccessExample {json} Success-Response:
    { "msg": "User logged." }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "This user/password does not correspond to a valid user." }
  *
 */
const database = require('../../models/database');
const encryptor = require('../../utils/encryptor');
const decryptor = require('../../utils/decryptor');
const generateToken = require('../../utils/generateToken');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Log in an user
 *
 * @param {object} req.body - User info
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { username, password } = req.body;
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

  database.Users
    .findOne({ username })
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({
          msg: constants.messages.error.UNEXPECTED_DB
        });
      }
      if (!user) {
        return res.status(400).json({
          msg: constants.messages.error.INVALID_USER
        });
      }

      const decryptedPassword = decryptor(user.password, constants.values.PASSWORD_ENCRYPT_KEY);
      if (!decryptedPassword) {
        return res.status(500).json({
          msg: constants.messages.error.UNEXPECTED_RUNNING
        });
      } else if (password !== decryptedPassword.toString()) {
        return res.status(400).json({
          msg: constants.messages.error.INVALID_USER
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
      return res.status(200).json({
        msg: userData
      });
    });
};
