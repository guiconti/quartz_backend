const io = require('../../utils/io');
const didPlayerExploded = require('../../utils/didPlayerExploded');
const playerExploded = require('../../utils/playerExploded');
const nextTurn = require('../../utils/nextTurn');
const discardCard = require('../../utils/discardCard');
const constants = require('../../utils/constants');

module.exports = (game, playerIndex, cardIndex, info) => {
  return new Promise((resolve, reject) => {
    if (info == undefined) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_TARGET
      });
    }

    let targetedPlayerIndex = game.players.findIndex(
      player => String(player.user._id) === info.target && player.isRoundActive
    );

    if (targetedPlayerIndex === -1) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_TARGET
      });
    }

    if (game.players[playerIndex].crystals[game.players[playerIndex].crystals.length - 1].amount <= 0) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_CRYSTAL
      });
    }

    let targetHaveCounter = false;
    for (let i = 0; i < game.players[targetedPlayerIndex].cards.length; i++) {
      if (game.players[targetedPlayerIndex].cards[i].action === constants.values.cards.THIS_ISNT_MINE_REACTION) {
        targetHaveCounter = true;
        break;
      }
    }

    game.players[playerIndex].crystals[game.players[playerIndex].crystals.length - 1].amount--;
    discardCard(game, playerIndex, cardIndex);
    if (!targetHaveCounter) {
      game.players[targetedPlayerIndex].crystals[game.players[targetedPlayerIndex].crystals.length - 1].amount++;
      if (didPlayerExploded(game, targetedPlayerIndex)) {
        game = playerExploded(game, targetedPlayerIndex);
      }
      const message = {
        player: {
          username: game.players[playerIndex].user.username,
          _id: game.players[playerIndex].user._id
        },
        target: {
          username: game.players[targetedPlayerIndex].user.username,
          _id: game.players[targetedPlayerIndex]._id 
        }
      };
      game = nextTurn(game, playerIndex);
      return game.save((err, savedGame) => {
          if (err) {
            return reject(err);
          }
          io.emit(String(savedGame._id), constants.sockets.types.THIS_ISNT_MINE, message);
          io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
          return resolve();
        });
    }
    game.players[targetedPlayerIndex].hasToAnswerCard = constants.values.cards.THIS_ISNT_MINE_REACTION;
    game.waitingPlayerForDefensiveResponse = game.players[targetedPlayerIndex]._id;
    game.cache = [0];
    const message = {
      player: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex].user._id
      },
      target: {
        username: game.players[targetedPlayerIndex].user.username,
        _id: game.players[targetedPlayerIndex]._id 
      }
    };
    game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      io.emit(String(game.players[targetedPlayerIndex]._id), constants.sockets.types.THIS_ISNT_MINE_EITHER, message);
      return resolve();
    });
  });
};
