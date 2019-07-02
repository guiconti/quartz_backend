module.exports = mongoose => {
  return new mongoose.Schema({
    crystals: [ mongoose.Schema.Crystals ],
    cards: [ mongoose.Schema.Cards ],
    explosions: {
      type: Number,
      required: false,
      default: 0
    },
    closes: {
      type: Number,
      required: false,
      default: 0
    },
    money: {
      type: Number,
      required: false,
      default: 0,
    },
    games: {
      type: Number,
      required: false,
      default: 0,
    },
    wins: {
      type: Number,
      required: false,
      default: 0
    },
  });
};
