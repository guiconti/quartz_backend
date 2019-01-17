module.exports = mongoose => {
  return new mongoose.Schema({
    name: { type: String, required: true, default: '' },
    players: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Players' } ],
    cave: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Caves' 
    },
    cardsBoard: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Cards' }],
    cardsPile: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Cards' } ],
    cardsDiscarded: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Cards' } ]
  });
};
