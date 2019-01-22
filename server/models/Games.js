module.exports = mongoose => {
  return new mongoose.Schema({
    name: { type: String, required: true, default: '' },
    players: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Players' } ],
    cave: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Caves' 
    },
    cardsBoard: [ mongoose.Schema.Cards ],
    cardsPile: [ mongoose.Schema.Cards ],
    cardsDiscarded: [ mongoose.Schema.Cards ]
  });
};
