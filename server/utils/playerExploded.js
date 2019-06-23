/**
 * Module to explode player
 * @module utils/playerExploded
 */

const didPlayerExploded = require('./didPlayerExploded');

module.exports = (game, playerIndex) => {
  if (!game.players[playerIndex].hasAnIdiotBook) {
    game.players[playerIndex].currentTurn = false;
    game.players[playerIndex].isRoundActive = false;
    game.players[playerIndex].hasAnIdiotBook = true;
    for (let i = 0; i < game.cave.crystals.length; i++) {
      game.cave.crystals[i].amount += game.players[playerIndex].crystals[i].amount;
      game.players[playerIndex].crystals[i].amount = 0;
    }
    return game;
  }
  game.players[playerIndex].currentTurn = false;
  game.players[playerIndex].hasAnIdiotBook = false;
  game.cave.crystals[game.cave.crystals.length - 1].amount++;
  game.players[playerIndex].crystals[game.players[playerIndex].crystals.length - 1].amount--;
  if (didPlayerExploded(game, playerIndex)) {
    game.players[playerIndex].currentTurn = false;
    game.players[playerIndex].isRoundActive = false;
    game.players[playerIndex].hasAnIdiotBook = true;
    for (let i = 0; i < game.cave.crystals.length; i++) {
      game.cave.crystals[i].amount += game.players[playerIndex].crystals[i].amount;
      game.players[playerIndex].crystals[i].amount = 0;
    }
    return game;
  }
  return game;
};
