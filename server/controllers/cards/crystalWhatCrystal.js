const io = require('../../utils/io');
const discardCard = require('../../utils/discardCard');
const nextTurn = require('../../utils/nextTurn');
const constants = require('../../utils/constants');

module.exports = (game, playerIndex, cardIndex, info) => {
  return new Promise((resolve, reject) => {
    if (info == undefined) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_CRYSTAL
      });
    }
    let keptCrystalIndex = game.players[playerIndex].crystals.findIndex(crystal => { 
      return crystal.name === info.crystal && crystal.amount > 0; 
    });
    if (keptCrystalIndex === -1 || info.crystal === constants.values.crystals.AUTUNITA.name) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_CRYSTAL
      });
    }
    game.players[playerIndex].crystals[keptCrystalIndex].amount--;
    game.players[playerIndex].keptCrystal = game.players[playerIndex].crystals[keptCrystalIndex].name;

    const message = { 
      player: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex].user._id,
      },
      crystal: game.players[playerIndex].crystals[keptCrystalIndex].name
    };
    discardCard(game, playerIndex, cardIndex);
    game = nextTurn(game, playerIndex);
    game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(savedGame._id), constants.sockets.types.CRYSTAL_WHAT_CRYSTAL, message);
      io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
      return resolve();
    });
  });
};
