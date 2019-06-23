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

    for (let i = 0; i < info.pickedCrystals.length; i++) {
      if (info.pickedCrystals[i] < 0
        || game.players[targetedPlayerIndex].crystals[i].amount < info.pickedCrystals[i]) {
        return reject({
          status: 400,
          msg: constants.messages.error.INVALID_CRYSTAL
        }); 
      }
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
        took: crystalsTook,
        counter: false,
      };
      discardCard(game, playerIndex, cardIndex);
      game = nextTurn(game, playerIndex);
      return game.save((err, savedGame) => {
        if (err) {
          return reject(err);
        }
        
        io.emit(String(savedGame._id), constants.sockets.types.THESE_DONT_BELONG_TO_YOU, message);
        io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
        return resolve();
      });
    }

    discardCard(game, playerIndex, cardIndex);
    let crystalsTook = '';
    for (let i = 0; i < info.pickedCrystals.length; i++) {
      if (info.pickedCrystals[i] > 0) {
        crystalsTook += `${info.pickedCrystals[i]} - ${game.players[playerIndex].crystals[i].name} `
      } 
    }
    game.players[targetedPlayerIndex].hasToAnswerCard = constants.values.cards.THESE_DONT_BELONG_TO_YOU_REACTION;
    game.waitingPlayerForDefensiveResponse = game.players[targetedPlayerIndex]._id;
    game.cache = [playerIndex];
    game.cache = game.cache.concat(info.pickedCrystals);
    const message = {
      attacker: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex].user._id
      },
      crystalsTook
    };
    game.players[targetedPlayerIndex].answerSocket = {
      message,
      socketType: constants.sockets.types.THIEVERY_UNACCEPTABLE
    };
    return game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(game.players[targetedPlayerIndex]._id), constants.sockets.types.THIEVERY_UNACCEPTABLE, message);
      return resolve();
    });
  });
};
