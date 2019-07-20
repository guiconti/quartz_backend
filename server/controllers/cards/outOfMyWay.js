const io = require('../../utils/io');
const discardCard = require('../../utils/discardCard');
const nextTurn = require('../../utils/nextTurn');
const addPlayLog = require('../../utils/addPlayLog');
const constants = require('../../utils/constants');

module.exports = (game, playerIndex, cardIndex) => {
  return new Promise((resolve, reject) => {
    let crystalsLost = [];
    let messageCrystalsLost = '';
    for (let i = 0; i < game.players.length; i++) {
      if (i !== playerIndex) {
        let crystalPicker = '';
        let pickedCrystalIndex;
        let crystalLost = {
          player: {
            username: game.players[i].user.username,
            _id: game.players[i].user._id,
          },
          crystal: 'None',
        };
        for (let j = 0; j < game.players[i].crystals.length - 1; j++) {
          crystalPicker += String(j).repeat(game.players[i].crystals[j].amount); 
        }
        if (crystalPicker.length > 0) {
          pickedCrystalIndex = crystalPicker[Math.floor(Math.random() * (crystalPicker.length - 1))];
          game.players[i].crystals[pickedCrystalIndex].amount--;
          game.cave.crystals[pickedCrystalIndex].amount++;
          crystalLost.crystal = game.players[i].crystals[pickedCrystalIndex].name;
          messageCrystalsLost += ` ${game.players[i].user.username} lose a/an ${game.players[i].crystals[pickedCrystalIndex].name}`;
        }
        crystalsLost.push(crystalLost);
      }
    }

    const message = { 
      player: {
        username: game.players[playerIndex].user.username,
        _id: game.players[playerIndex].user._id,
      },
      crystalsLost 
    };
    discardCard(game, playerIndex, cardIndex);
    game = nextTurn(game, playerIndex);
    game.save((err, savedGame) => {
      if (err) {
        return reject(err);
      }
      
      io.emit(String(savedGame._id), constants.sockets.types.OUT_OF_MY_WAY, message);
      addPlayLog(game, `${game.players[playerIndex].user.username} used Out of my way making${messageCrystalsLost}`);
      io.emit(String(savedGame._id), constants.sockets.types.UPDATE_GAME, savedGame);
      return resolve();
    });
  });
};
