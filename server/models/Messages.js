module.exports = mongoose => {
  return new mongoose.Schema({
    parent: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Rooms' 
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Users' 
    },
    content: {
      type: String,
      required: true,
      default: ''
    }
  });
};
