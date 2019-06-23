const io = require('../../utils/io');
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

    if (info.pickedCrystals.reduce((a, b) => a + b) > constants.THESE_DONT_BELONG_TO_YOU_CRYSTALS_AMOUNT) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_CRYSTAL
      });
    }

    let targetHaveCounter = false;
    for (let i = 0; i < game.players[targetedPlayerIndex].cards.length; i++) {
      if (game.players[targetedPlayerIndex].cards[i].action === constants.values.cards.THESE_DONT_BELONG_TO_YOU_REACTION) {
        targetHaveCounter = true;
        break;
      }
    }

    if (!targetHaveCounter) {
      let crystalsTook = '';
      for (let i = 0; i < info.pickedCrystals.length; i++) {
        if (info.pickedCrystals[i] < 0
          || game.players[targetedPlayerIndex].crystals[i].amount < info.pickedCrystals[i]) {
          return reject({
            status: 400,
            msg: constants.messages.error.INVALID_CRYSTAL
          }); 
        }
        game.players[targetedPlayerIndex].crystals[i].amount -= info.pickedCrystals[i];
        game.players[playerIndex].crystals[i].amount += info.pickedCrystals[i];
        if (info.pickedCrystals[i] > 0) {
          crystalsTook += `${info.pickedCrystals[i]} - ${game.players[playerIndex].crystals[i].name} `
        } 
      }
      const message = {
        player: {
          username: game.players[playerIndex].user.username,
          _id: game.players[playerIndex]._id
        },
        from: {
          username: game.players[targetedPlayerIndex].user.username,
          _id: game.players[targetedPlayerIndex]._id 
        },
        took: crystalsTook
      };
      discardCard(game, playerIndex, cardIndex);
      game = nextTurn(game, playerIndex);
      game.save((err, savedGame) => {
        if (err) {
          return reject(err);
        }
        
        io.emit(String(savedGame._id), constants.sockets.types.THESE_DONT_BELONG_TO_YOU, message);
        io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
        return resolve();
      });
    }

    return resolve();

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
      io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
      return resolve();
    });
  });
};
