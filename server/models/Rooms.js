module.exports = mongoose => {
  return new mongoose.Schema({
    name: {
      type: String,
      required: true,
      default: ''
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    game: {
      type: String,
      required: false,
      default: ''
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    active: {
      type: Boolean,
      required: false,
      default: true
    },
    created: { type: Date, default: Date.now }
  });
};
