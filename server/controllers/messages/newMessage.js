/**
 * @api {POST} /messages/ Create new message
 * @apiName Create message
 * @apiGroup Messages
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json} msg Room info.
 * @apiSuccess (200) {String} _id Message id.
 * @apiSuccess (200) {String} owner Messages owner id.
 * @apiSuccess (200) {String} content Messages content.
 * @apiSuccessExample {json} Success-Response:
    "msg": {
      "_id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "parentId": "asdjashdj12-sandj12-dvkqo",
      "owner": {
        "_id": "012a332a-4f32-496f-bf25-d785d4df42ed",
        "username": "test"
      },
      "content": "Test message"
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
 * Create a message
 *
 * @param {string} req.body.parentId - Parent id
 * @param {string} req.body.content - Messages content
 * @return {object} - Returns the message in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { parent, content } = req.body;
  const owner = req.user.id;

  if (!validator.isValidString(parent)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_PARENT
    });
  }
  if (!validator.isValidString(content)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_CONTENT
    });
  }

  content = content.trim();

  const newMessage = new database.Messages({ parent, owner, content });

  newMessage.save((err, message) => {
    if (err || !message) {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }

    return res.status(200).json({
      msg: message
    });
  });
};
