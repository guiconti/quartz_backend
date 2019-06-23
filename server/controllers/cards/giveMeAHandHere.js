const io = require('../../utils/io');
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
      player => String(player.user._id) === info.target 
        && player.isRoundActive
        && String(player._id) !== String(game.players[playerIndex]._id)
    );

    if (targetedPlayerIndex === -1) {
      return reject({
        status: 400,
        msg: constants.messages.error.INVALID_TARGET
      });
    }

    let crystalsPicked = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < constants.values.cards.GIVE_ME_A_HAND_HERE_CRYSTALS_AMOUNT; i++) {
      let crystalPicker = '';
      for (let j = 0; j < game.cave.crystals.length; j++){
        crystalPicker += String(j).repeat(game.cave.crystals[j].amount 
          - crystalsPicked[j]);
      }
      let crystalIndex = crystalPicker[Math.floor(Math.random() * (crystalPicker.length - 1))];
      crystalsPicked[crystalIndex]++;
    }

    const message = {
      player: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex]._id
      },
      target: {
        username: game.players[targetedPlayerIndex].user.username,
        _id: game.players[targetedPlayerIndex]._id
      },
      crystals: crystalsPicked
    };
    discardCard(game, playerIndex, cardIndex);
    game.players[playerIndex].hasToAnswerCard = constants.sockets.types.GIVE_ME_A_HAND_HERE_ANSWER;
    game.players[playerIndex].answerSocket = {
      message,
      socketType: constants.sockets.types.GIVE_ME_A_HAND_HERE_ANSWER,
    };
    game.cache = [targetedPlayerIndex];
    game.cache = game.cache.concat(crystalsPicked);
    return game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(game.players[playerIndex]._id), constants.sockets.types.GIVE_ME_A_HAND_HERE_ANSWER, message);
      return resolve();
    });
  });
};
