module.exports = mongoose => {
  return new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    money: {
      type: Number,
      required: false,
      default: 0
    },
    crystals: [ mongoose.Schema.Crystals ],
    cards: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Cards' } ],
    hasAnIdiotBook: {
      type: Boolean,
      required: false,
      default: false
    }
  });
};
