const io = require('../../utils/io');
const didPlayerExploded = require('../../utils/didPlayerExploded');
const playerExploded = require('../../utils/playerExploded');
const discardCard = require('../../utils/discardCard');
const nextTurn = require('../../utils/nextTurn');
const constants = require('../../utils/constants');

module.exports = (game, playerIndex, cardIndex, info) => {
  return new Promise((resolve, reject) => {
    if (info == undefined) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_TARGET
      });
    }

    if (game.waitingPlayerForDefensiveResponse !== String(game.players[playerIndex]._id) ||
      game.players[playerIndex].hasToAnswerCard !== constants.sockets.types.NOPE_I_AM_ON_A_BREAK) {
        return reject({
          status: 400,
          msg: constants.messages.error.INVALID_USER
        });
    }

    game.players[playerIndex].hasToAnswerCard = '';
    game.players[playerIndex].answerSocket = {};
    game.waitingPlayerForDefensiveResponse = '';

    if (!info.used) {
      let alreadyTookCrystal = false;
      let alreadyGaveCrystal = false;
      let crystalsTook = 'no crystals';
      let crystalsGiven = 'no crystals';

      for (let i = 0; i < game.players[playerIndex].crystals.length; i++) {
        if (!alreadyTookCrystal && game.cache[game.cache.length - 2][i] > 0 && i < game.players[game.cache[0]].crystals.length - 1) {
          alreadyTookCrystal = true;
          game.players[game.cache[0]].crystals[i].amount += game.cache[game.cache.length - 2][i];
          crystalsTook = `${game.cache[game.cache.length - 2][i]} -${game.players[playerIndex].crystals[i].name}`;
        }

        if (!alreadyGaveCrystal && game.cache[game.cache.length - 1][i] > 0) {
          alreadyGaveCrystal = true;
          game.players[playerIndex].crystals[i].amount += game.cache[game.cache.length - 1][i];
          crystalsGiven = `${game.cache[game.cache.length - 1][i]} -${game.players[playerIndex].crystals[i].name}`;
        }
      }

      if (didPlayerExploded(game, playerIndex)) {
        game = playerExploded(game, playerIndex);
      }

      game = nextTurn(game, game.cache[0]);
      const message = {
        player: {
          username: game.players[game.cache[0]].user.username,
          _id: game.players[game.cache[0]]._id
        },
        target: {
          username: game.players[playerIndex].user.username,
          _id: game.players[playerIndex]._id
        },
        took: crystalsTook,
        given: crystalsGiven,
      };
      return game.save((err, savedGame) => {
        if (err) {
          return reject(err);
        }
        
        io.emit(String(savedGame._id), constants.sockets.types.GIVE_ME_A_HAND_HERE, message);
        io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
        return resolve();
      });
    }

    discardCard(game, playerIndex, cardIndex);
    game = nextTurn(game, game.cache[0]);

    const message = {
      player: {
        username: game.players[game.cache[0]].user.username,
        _id: game.players[game.cache[0]]._id
      },
      target: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex]._id
      },
      counter: true
    };
    return game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(savedGame._id), constants.sockets.types.GIVE_ME_A_HAND_HERE, message);
      io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
      return resolve();
    });
  });
};
