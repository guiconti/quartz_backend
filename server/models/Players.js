module.exports = mongoose => {
  return new mongoose.Schema({
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
    crystals: [ mongoose.Schema.Crystals ],
    cards: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Cards' } ],
    hasAnIdiotBook: {
      type: Boolean,
      required: false,
      default: false
    }
  });
};
