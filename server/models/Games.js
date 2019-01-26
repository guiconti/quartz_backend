module.exports = mongoose => {
  return new mongoose.Schema({
    name: { type: String, required: true, default: '' },
    players: [ mongoose.Schema.Players ],
    cave: mongoose.Schema.Caves,
    cardsBoard: [ mongoose.Schema.Cards ],
    cardsPile: [ mongoose.Schema.Cards ],
    cardsDiscarded: [ mongoose.Schema.Cards ]
  });
};
