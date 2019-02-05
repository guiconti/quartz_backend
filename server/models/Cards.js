const constants = require('../utils/constants');

module.exports = mongoose => {
  return new mongoose.Schema({
    name: { 
      type: String, 
      required: true,
      default: ''
    },
    action: {
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
        constants.values.cards.types.ACTION,
        constants.values.cards.types.REACTION
      ]
    },
    value: {
      type: Number,
      required: true,
      default: 0
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    }
  });
};
