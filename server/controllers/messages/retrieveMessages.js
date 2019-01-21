/**
 * @api {GET} /messages/:parentId List messages
 * @apiName List messages
 * @apiGroup Messages
 * @apiVersion 1.0.0
 * 
 * @apiSuccess (200) {json[]} msg Messages info.
 * @apiSuccess (200) {String} _id Message id.
 * @apiSuccess (200) {String} parentId Messages parent id.
 * @apiSuccess (200) {String} owner Messages owner id.
 * @apiSuccess (200) {String} content Messages content.
 * @apiSuccess (200) {Boolean} active Room active state.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "_id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "parentId": "asdjashdj12-sandj12-dvkqo",
          "owner": {
            "_id": "012a332a-4f32-496f-bf25-d785d4df42ed",
            "username": "test"
          },
          "content": "Test message"
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
 * List message
 *
 * @param {string} req.params.parentId - Messages parent id
 * @param {string} req.query.offset - Messages list start offset
 * @param {string} req.query.limit - Message list size limit
 * @return {object} - Returns the room in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { parentId } = req.params;

  if (!validator.isValidString(parentId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_PARENT
    })
  }

  let filters = {};
  let { offset, limit } = req.query;

  if (validator.isValidString(offset)) {
    filters = { offset, ...filters };
  }
  if (validator.isValidString(limit)) {
    filters = { limit, ...filters };
  }

  database.Messages
    .find({ parent: parentId }, 'content owner')
    .populate('owner', '_id username')
    .exec((err, messages) => {
    if (err) {
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    }
    return res.status(200).json({
      msg: messages
    });
  });
};
