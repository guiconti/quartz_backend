const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Player = require('./Player');
const Cave = require('./Player');
const Player = require('./Player');

const GameSchema = new Schema({
  name: { type: String, required: true, default: '' },
  players: [ Player ],
  cave: Cave,
  cardsBoard: [ Card ],
  cardsPile: [ Card ],
  cardsDiscarded: [ Card ]
});

mongoose.model('Games', GameSchema);
