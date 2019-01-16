const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Crystal = require('./Crystal');
const Card = require('./Card');

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: ''
  },
  money: {
    type: Number,
    required: false,
    default: 0
  },
  crystals: [ Crystal ],
  cards: [ Card ]
});

mongoose.model('Player', PlayerSchema);
