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

    if (game.waitingPlayerForDefensiveResponse !== String(game.players[playerIndex]._id) ||
      game.players[playerIndex].hasToAnswerCard !== constants.values.cards.THESE_DONT_BELONG_TO_YOU_REACTION) {
        return reject({
          status: 400,
          msg: constants.messages.error.INVALID_USER
        });
    }

    if (!info.used) {
      game.waitingPlayerForDefensiveResponse = '';
      game.players[playerIndex].hasToAnswerCard = '';
      game.players[playerIndex].answerSocket = {};
      let crystalsTook = '';
      for (let i = 1; i < game.cache.length; i++) {
        game.players[playerIndex].crystals[i - 1].amount -= game.cache[i];
        game.players[game.cache[0]].crystals[i - 1].amount += game.cache[i];
        if (game.cache[i] > 0) {
          crystalsTook += `${game.cache[i]} - ${game.players[playerIndex].crystals[i - 1].name} `
        } 
      }
      const message = {
        player: {
          username: game.players[game.cache[0]].user.username,
          _id: game.players[game.cache[0]]._id
        },
        from: {
          username: game.players[playerIndex].user.username,
          _id: game.players[playerIndex]._id 
        },
        took: crystalsTook,
        counter: false,
      };
      game = nextTurn(game, game.cache[0]);
      return game.save((err, savedGame) => {
        if (err) {
          return reject(err);
        }
        
        io.emit(String(savedGame._id), constants.sockets.types.THESE_DONT_BELONG_TO_YOU, message);
        addPlayLog(game, `${game.players[game.cache[0]].user.username} used These don't belong to you and took 
          ${crystalsTook} from ${game.players[playerIndex].user.username}`);
        io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
        return resolve();
      });
    }

    if (info.pickedCrystals.reduce((a, b) => a + b) > constants.THESE_DONT_BELONG_TO_YOU_REACTION_CRYSTALS_AMOUNT) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_CRYSTAL
      });
    }

    for (let i = 0; i < info.pickedCrystals.length; i++) {
      if (info.pickedCrystals[i] < 0
        || game.players[game.cache[0]].crystals[i].amount < info.pickedCrystals[i]) {
        return reject({
          status: 400,
          msg: constants.messages.error.INVALID_CRYSTAL
        }); 
      }
    }

    game.waitingPlayerForDefensiveResponse = '';
    game.players[playerIndex].hasToAnswerCard = '';
    game.players[playerIndex].answerSocket = {};
    let crystalsTook = '';
    for (let i = 0; i < info.pickedCrystals.length; i++) {
      game.players[game.cache[0]].crystals[i].amount -= info.pickedCrystals[i];
      game.players[playerIndex].crystals[i].amount += info.pickedCrystals[i];
      if (info.pickedCrystals[i] > 0) {
        crystalsTook += `${info.pickedCrystals[i]} - ${game.players[playerIndex].crystals[i].name} `
      } 
    }

    discardCard(game, playerIndex, cardIndex);
    game = nextTurn(game, game.cache[0]);
    const message = {
      player: {
        username: game.players[game.cache[0]].user.username,
        _id: game.players[game.cache[0]]._id
      },
      from: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex]._id 
      },
      took: crystalsTook,
      counter: true,
    };
    return game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(savedGame._id), constants.sockets.types.THESE_DONT_BELONG_TO_YOU, message);
      addPlayLog(game, `${game.players[game.cache[0]].user.username} used These don't belong to you but countered by 
        ${game.players[playerIndex].user.username} and lost ${crystalsTook}`);
      io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
      return resolve();
    });
  });
};
