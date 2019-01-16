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
    cards: [ mongoose.Schema.Cards ],
    hasAnIdiotBook: {
      type: Boolean,
      required: false,
      default: false
    }
  });
};
