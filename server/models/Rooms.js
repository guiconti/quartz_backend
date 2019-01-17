module.exports = mongoose => {
  return new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      default: '' 
    },
    owner: {
      type: String,
      required: true
    },
    game: {
      type: String,
      required: false,
      default: ''
    },
    users: [ mongoose.Schema.Users ],
    active: {
      type: Boolean,
      required: false,
      default: true
    }
  });
};
