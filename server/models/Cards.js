const constants = require('../utils/constants');

module.exports = mongoose => {
  return new mongoose.Schema({
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
};
