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
    hasToAnswerCard: {
      type: String,
      required: false,
      default: ''
    },
    answerSocket: {
      type: Object,
      required: false,
      default: {}
    },
    keptCrystal: {
      type: String,
      required: false,
      default: ''
    },
    hasAnIdiotBook: {
      type: Boolean,
      required: false,
      default: false
    },
    soldCrystals: {
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
