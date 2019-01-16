const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../utils/constants');

const CardSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    default: ''
  },
  description: { 
    type: String, 
    required: true,
    default: ''
  },
  type: {
    type: String,
    required: true,
    enum: [
      constants.values.cards.types.OFFENSIVE,
      constants.values.cards.types.DEFENSIVE
    ]
  },
  value: {
    type: Number,
    required: true,
    default: 0
  }
});

mongoose.model('Cards', CardSchema);
