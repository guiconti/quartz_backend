const io = require('../../utils/io');
const discardCard = require('../../utils/discardCard');
const constants = require('../../utils/constants');

module.exports = (game, playerIndex, cardIndex) => {
  return new Promise((resolve, reject) => {
    let crystalsPicked = [];
    let crystalsPickedAux = [];
    for (let i = 0; i < constants.values.cards.EUREKA_CRYSTALS_AMOUNT; i++) {
      let crystalPicker = '';
      for (let j = 0; j < game.cave.crystals.length; j++){
        crystalPicker += String(j).repeat(game.cave.crystals[j].amount 
          - (crystalsPickedAux[j] ? crystalsPickedAux[j] : 0));
      }
      let crystalIndex = crystalPicker[Math.floor(Math.random() * (crystalPicker.length - 1))];
      crystalsPickedAux[crystalIndex]++;
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
    game.players[playerIndex].hasToAnswerCard = constants.sockets.types.EUREKA;
    game.cache = crystalsPicked;
    game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(savedGame._id), constants.sockets.types.EUREKA, message);
      io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
      return resolve();
    });
  });
};
