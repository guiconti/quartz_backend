const constants = require('../utils/constants');

module.exports = mongoose => {
  return new mongoose.Schema({
    name: { 
      type: String, 
      required: true,
      enum: [
        constants.values.crystals.QUARTZO.name,
        constants.values.crystals.RUBELITA.name,
        constants.values.crystals.ESMERALDA.name,
        constants.values.crystals.SAFIRA.name,
        constants.values.crystals.RUBI.name,
        constants.values.crystals.AMBAR.name,
        constants.values.crystals.AUTUNITA.name
      ],
      default: constants.values.crystals.QUARTZO.name
    },
    value: {
      type: Number,
      required: true,
      enum: [
          constants.values.crystals.QUARTZO.value,
          constants.values.crystals.RUBELITA.value,
          constants.values.crystals.ESMERALDA.value,
          constants.values.crystals.SAFIRA.value,
          constants.values.crystals.RUBI.value,
          constants.values.crystals.AMBAR.value,
          constants.values.crystals.AUTUNITA.value
      ],
      default: constants.values.crystals.QUARTZO.value
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    }
  });
};
