module.exports = mongoose => {
  return new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    money: {
      type: Number,
      required: false,
      default: 0
    },
    crystals: [ mongoose.Schema.Crystals ],
    cards: [ mongoose.Schema.Cards ],
    hasAnIdiotBook: {
      type: Boolean,
      required: false,
      default: false
    },
    currentTurn: {
      type: Boolean,
      required: false,
      default: false
    },
    isRoundActive: {
      type: Boolean,
      required: false,
      default: true
    }
  });
};
