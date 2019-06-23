const io = require('../../utils/io');
const didPlayerExploded = require('../../utils/didPlayerExploded');
const playerExploded = require('../../utils/playerExploded');
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

    if (!game.players[playerIndex].hasToAnswerCard === constants.sockets.types.GIVE_ME_A_HAND_HERE_ANSWER) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_USER
      });
    }

    const givenAmount = info.given.reduce((a, b) => a + b);
    const takenAmount = info.taken.reduce((a, b) => a + b);
    if (takenAmount + givenAmount > constants.values.cards.GIVE_ME_A_HAND_HERE_CRYSTALS_AMOUNT ||
      takenAmount > constants.values.cards.GIVE_ME_A_HAND_HERE_TAKE_CRYSTALS_AMOUNT ||
      givenAmount > constants.values.cards.GIVE_ME_A_HAND_HERE_GIVE_CRYSTALS_AMOUNT) 
    {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_CRYSTAL
      });
    }

    for (let i = 0; i < game.players[playerIndex].crystals.length; i++) {
      if (info.taken[i] < 0
        || info.taken[i] > constants.values.cards.GIVE_ME_A_HAND_HERE_TAKE_CRYSTALS_AMOUNT
        || (info.taken[i] + info.given[i]) !== game.cache[i + 1]) {
        return reject({
          status: 400,
          msg: constants.messages.error.INVALID_CRYSTAL
        });
      }

      if (info.given[i] < 0 || info.given[i] > constants.values.cards.GIVE_ME_A_HAND_HERE_GIVE_CRYSTALS_AMOUNT) {
        return reject({
          status: 400,
          msg: constants.messages.error.INVALID_CRYSTAL
        });
      }
    }

    const targetHaveCounter = game.players[game.cache[0]].cards.findIndex(card => {
      return card.action === constants.values.cards.GIVE_ME_A_HAND_HERE_REACTION;
    });

    game.players[playerIndex].hasToAnswerCard = '';
    game.players[playerIndex].answerSocket = {};

    if (targetHaveCounter === -1) {
      let alreadyTookCrystal = false;
      let alreadyGaveCrystal = false;
      let crystalsTook = 'no crystals';
      let crystalsGiven = 'no crystals';

      for (let i = 0; i < game.players[playerIndex].crystals.length; i++) {
        if (!alreadyTookCrystal && info.taken[i] > 0 && i < game.players[playerIndex].crystals.length - 1) {
          alreadyTookCrystal = true;
          game.players[playerIndex].crystals[i].amount += info.taken[i];
          crystalsTook = `${info.taken[i]} -${game.players[playerIndex].crystals[i].name}`;
        }

        if (!alreadyGaveCrystal && info.given[i] > 0) {
          alreadyGaveCrystal = true;
          game.players[game.cache[0]].crystals[i].amount += info.given[i];
          crystalsGiven = `${info.given[i]} -${game.players[playerIndex].crystals[i].name}`;
        }
      }

      if (didPlayerExploded(game, game.cache[0])) {
        game = playerExploded(game, game.cache[0]);
      }

      game = nextTurn(game, playerIndex);
      const message = {
        player: {
          username: game.players[playerIndex].user.username,
          _id: game.players[playerIndex]._id
        },
        target: {
          username: game.players[game.cache[0]].user.username,
          _id: game.players[game.cache[0]]._id
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

    const targetedPlayerIndex = game.cache[0];
    game.players[targetedPlayerIndex].hasToAnswerCard = constants.sockets.types.NOPE_I_AM_ON_A_BREAK;
    game.waitingPlayerForDefensiveResponse = game.players[targetedPlayerIndex]._id;
    game.cache = [playerIndex].concat(game.cache.slice(1, game.cache.length)).concat([info.taken, info.given]);
    const message = {
      player: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex]._id
      }
    };
    game.players[targetedPlayerIndex].answerSocket = {
      message,
      socketType: constants.sockets.types.NOPE_I_AM_ON_A_BREAK,
    };
    return game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(game.players[targetedPlayerIndex]._id), constants.sockets.types.NOPE_I_AM_ON_A_BREAK, message);
      return resolve();
    });
  });
};
