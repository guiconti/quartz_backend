/**
 * @api {GET} /games/:gameId Retrieve game by its id
 * @apiName Retrieve game
 * @apiGroup Games
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json[]} msg Projects list.
 * @apiSuccess (200) {String} id Project id.
 * @apiSuccess (200) {String} name Project name.
 * @apiSuccess (200) {String} description Project description.
 * @apiSuccess (200) {String} image Project image.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "Project example",
          "description": "Project description example",
          "image": "http://image.com/image.png"
        }
    ]
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const logger = require('../../../tools/logger');
const io = require('../../utils/io').instance;
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Retrieve a game by its id
 *
 * @param {string} req.params.gameId - Game id to retrieve info 
 * @return {object} - Returns the game in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  return res.status(200).json({});
};
