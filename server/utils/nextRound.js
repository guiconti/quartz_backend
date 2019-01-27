/**
 * Module to setup next round
 * @module utils/nextRound
 */

const generateCave = require('./generateCave');
const constants = require('./constants');

module.exports = game => {
  game.cave = generateCave();
  game.players.forEach(player => {
    player.isRoundActive = true;
    player.currentTurn = false;
    player.soldCrystals = false;
    for (let i = 0; i < game.cave.crystals.length - 1; i++) {
      game.cave.crystals[i].amount -= player.crystals[i].amount;
    }
  });
  game.players[Math.floor(Math.random() * (game.players.length - 1))].currentTurn = true;
  game.round++;
  game.isSelling = false;
  return game;
};
