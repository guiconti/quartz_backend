module.exports = mongoose => {
  return new mongoose.Schema({
    name: { type: String, required: true, default: '' },
    players: [ mongoose.Schema.Players ],
    cave: mongoose.Schema.Caves,
    cardsBoard: [ mongoose.Schema.Cards ],
    cardsPile: [ mongoose.Schema.Cards ],
    cardsDiscarded: [ mongoose.Schema.Cards ],
    isSelling: {
      type: Boolean,
      required: false,
      default: false
    },
    cache: {
      type: Array,
      required: false,
      default: []
    },
    round: {
      type: Number,
      required: false,
      default: 1
    },
    active: {
      type: Boolean,
      required: false,
      default: true
    },
    created: { type: Date, default: Date.now }
  });
};
