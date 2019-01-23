/**
 * @api {GET} /games/:gameId Retrieve game by its id
 * @apiName Retrieve game
 * @apiGroup Games
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json} msg Games info.
 * @apiSuccess (200) {String} _id Games id.
 * @apiSuccess (200) {String} name Games name.
 * @apiSuccess (200) {Array} players Games players.
 * @apiSuccess (200) {Object} cave Games cave
 * @apiSuccess (200) {Array} cardsBoard Games cards on board.
 * @apiSuccess (200) {Array} cardsPile Games cards on pile.
 * @apiSuccess (200) {Array} cardsDiscarded Games cards discarded..
 * @apiSuccessExample {json} Success-Response:
    "msg": {
        "name": "Testando",
        "players": [
            {
                "money": 0,
                "cards": [],
                "hasAnIdiotBook": false,
                "currentTurn": true,
                "_id": "5c4745175ce07d1ff79d4ba5",
                "user": {
                    "_id": "5c464ee1ae18af00d0d6ea7e",
                    "username": "Fuleco"
                },
                "crystals": [
                    {
                        "name": "Quartzo",
                        "value": 1,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4bac"
                    },
                    {
                        "name": "Rubelita",
                        "value": 2,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4bab"
                    },
                    {
                        "name": "Esmeralda",
                        "value": 3,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4baa"
                    },
                    {
                        "name": "Safira",
                        "value": 4,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4ba9"
                    },
                    {
                        "name": "Rubi",
                        "value": 6,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4ba8"
                    },
                    {
                        "name": "Âmbar",
                        "value": 8,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4ba7"
                    },
                    {
                        "name": "Autunita",
                        "value": 0,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4ba6"
                    }
                ],
                "__v": 0
            },
            {
                "money": 0,
                "cards": [],
                "hasAnIdiotBook": false,
                "currentTurn": false,
                "_id": "5c4745175ce07d1ff79d4bad",
                "user": {
                    "_id": "5c465456e016660483ae972b",
                    "username": "Barnabeu"
                },
                "crystals": [
                    {
                        "name": "Quartzo",
                        "value": 1,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4bb4"
                    },
                    {
                        "name": "Rubelita",
                        "value": 2,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4bb3"
                    },
                    {
                        "name": "Esmeralda",
                        "value": 3,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4bb2"
                    },
                    {
                        "name": "Safira",
                        "value": 4,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4bb1"
                    },
                    {
                        "name": "Rubi",
                        "value": 6,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4bb0"
                    },
                    {
                        "name": "Âmbar",
                        "value": 8,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4baf"
                    },
                    {
                        "name": "Autunita",
                        "value": 0,
                        "amount": 0,
                        "_id": "5c4745175ce07d1ff79d4bae"
                    }
                ],
                "__v": 0
            }
        ],
        "_id": "5c4745175ce07d1ff79d4bb5",
        "cave": {
            "_id": "5c4745175ce07d1ff79d4b9d",
            "crystals": [
                {
                    "name": "Quartzo",
                    "value": 1,
                    "amount": 15,
                    "_id": "5c4745175ce07d1ff79d4ba4"
                },
                {
                    "name": "Rubelita",
                    "value": 2,
                    "amount": 12,
                    "_id": "5c4745175ce07d1ff79d4ba3"
                },
                {
                    "name": "Esmeralda",
                    "value": 3,
                    "amount": 10,
                    "_id": "5c4745175ce07d1ff79d4ba2"
                },
                {
                    "name": "Safira",
                    "value": 4,
                    "amount": 7,
                    "_id": "5c4745175ce07d1ff79d4ba1"
                },
                {
                    "name": "Rubi",
                    "value": 6,
                    "amount": 4,
                    "_id": "5c4745175ce07d1ff79d4ba0"
                },
                {
                    "name": "Âmbar",
                    "value": 8,
                    "amount": 2,
                    "_id": "5c4745175ce07d1ff79d4b9f"
                },
                {
                    "name": "Autunita",
                    "value": 0,
                    "amount": 18,
                    "_id": "5c4745175ce07d1ff79d4b9e"
                }
            ],
            "__v": 0
        },
        "cardsBoard": [],
        "cardsPile": [],
        "cardsDiscarded": [],
        "__v": 0
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
 * Retrieve a game by its id
 *
 * @param {string} req.params.gameId - Game id to retrieve info 
 * @return {object} - Returns the game in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  const { gameId } = req.params;

  if (!validator.isValidString(gameId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_GAME
    });
  }

  database.Games
    .findById(gameId)
    .populate({
      path: 'players',
      populate: {
        path: 'user',
        select: 'username'
      }
    })
    .exec((err, game) => {
      if (err) {
        return res.status(500).json({
          msg: constants.messages.error.UNEXPECTED_DB
        });
      }
      if (!game) {
        return res.status(400).json({
          msg: constants.messages.error.INVALID_GAME
        });
      }
      return res.status(200).json({
        msg: game
      });
    })
};
