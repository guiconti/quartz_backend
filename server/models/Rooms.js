module.exports = mongoose => {
  return new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      default: '' 
    },
    users: [ mongoose.Schema.Users ]
  });
};
