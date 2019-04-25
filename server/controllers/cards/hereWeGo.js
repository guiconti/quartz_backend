const io = require('../../utils/io');
const discardCard = require('../../utils/discardCard');
const nextTurn = require('../../utils/nextTurn');
const constants = require('../../utils/constants');

module.exports = (game, playerIndex, cardIndex) => {
  return new Promise((resolve, reject) => {
    let crystalsPicked = [];
    for (let i = 0; i < 3; i++) {
      let crystalPicker = '';
      for (let j = 0; j < game.cave.crystals.length; j++){
        crystalPicker += String(j).repeat(game.cave.crystals[j].amount);
      }
      let crystalIndex = crystalPicker[Math.floor(Math.random() * (crystalPicker.length - 1))];
      if (game.cave.crystals[crystalIndex].name !== constants.values.crystals.AUTUNITA.name) {
        game.cave.crystals[crystalIndex].amount--;
        game.players[playerIndex].crystals[crystalIndex].amount++;
      }
      crystalsPicked.push(game.cave.crystals[crystalIndex].name);
    }
    const message = {
      player: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex]._id
      },
      crystals: crystalsPicked
    };
    discardCard(game, playerIndex, cardIndex);
    game = nextTurn(game, playerIndex);
    game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(savedGame._id), constants.sockets.types.HERE_WE_GO, message);
      io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
      return resolve();
    });
  });
};
