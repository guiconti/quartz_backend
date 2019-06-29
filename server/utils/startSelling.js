/**
 * Module to start selling phase
 * @module utils/startSelling
 */

const push = require('./push');
const constants = require('./constants');

module.exports = game => {
  game.isSelling = true;
  const payload = {
    title: constants.messages.push.selling.title,
    body: constants.messages.push.selling.body,
    icon: '/static/icon-192x192.png',
    data: {
      url: `https://quartz.tiimus.com/games/${String(game._id)}`
    }
  };
  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].keptCrystal && game.players[i].keptCrystal !== '') {
      for (let j = 0; j < game.players[i].crystals.length; j++) {
        if (game.players[i].crystals[j].name === game.players[i].keptCrystal) {
          game.players[i].crystals[j].amount++;
          game.players[i].keptCrystal = '';
          break;
        }
      }
    }
    push(game, i, payload);
  }
};
