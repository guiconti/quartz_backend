const io = require('../../utils/io');
const nextTurn = require('../../utils/nextTurn');
const discardCard = require('../../utils/discardCard');
const addPlayLog = require('../../utils/addPlayLog');
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
      player => String(player.user._id) === info.from 
        && player.isRoundActive
        && String(player._id) !== String(game.players[playerIndex]._id)
    );

    if (targetedPlayerIndex === -1) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_TARGET
      });
    }

    let givenCrystalIndex = game.players[playerIndex].crystals.findIndex(crystal => { 
      return crystal.name === info.given && crystal.amount > 0; 
    });

    if (givenCrystalIndex === -1 || info.given === constants.values.crystals.AUTUNITA.name) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_CRYSTALS_TO_KEEP
      });
    }

    let takenCrystalIndex = game.players[targetedPlayerIndex].crystals.findIndex(crystal => { 
      return crystal.name === info.taken && crystal.amount > 0; 
    });

    if (takenCrystalIndex === -1 || info.taken === constants.values.crystals.AUTUNITA.name) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_CRYSTALS_TO_KEEP
      });
    }

    game.players[playerIndex].crystals[givenCrystalIndex].amount--;
    game.players[playerIndex].crystals[takenCrystalIndex].amount++;
    game.players[targetedPlayerIndex].crystals[givenCrystalIndex].amount++;
    game.players[targetedPlayerIndex].crystals[takenCrystalIndex].amount--;

    const message = {
      player: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex]._id
      },
      from: {
        username: game.players[targetedPlayerIndex].user.username,
        _id: game.players[targetedPlayerIndex]._id 
      },
      crystals: {
        given: info.given,
        taken: info.taken
      }
    };
    discardCard(game, playerIndex, cardIndex);
    game = nextTurn(game, playerIndex);
    game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(savedGame._id), constants.sockets.types.COME_CLOSER, message);
      addPlayLog(game, `${game.players[playerIndex].user.username} used Come closer on ${game.players[targetedPlayerIndex].user.username}
        giving a/an ${info.given} and taking a/an ${info.taken}`);
      io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
      return resolve();
    });
  });
};
