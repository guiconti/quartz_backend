/**
 * Module of validation functions
 * @module utils/validator
 */

const constants = require('./constants');

/**
 * Validate if the input is a valid not empty string
 *
 * @param {string} stringToValidate - String to be validated
 * @return {boolean} - True case the string is valid and false if it is not
 */
exports.isValidString = stringToValidate => {
  return typeof stringToValidate === 'string' && stringToValidate.trim().length > 0;
};

/**
 * Validate if the input is a valid uuid
 *
 * @param {string} uuidToValidate - UUID to be validated
 * @return {boolean} - True case the uuid is valid and false if it is not
 */
exports.isValidUuid = uuidToValidate => {
  return constants.regex.uuid.test(uuidToValidate);
};

/**
 * Validate if the input is a valid email
 *
 * @param {string} emailToValidate - Email to be validated
 * @return {boolean} - True case the uuid is valid and false if it is not
 */
exports.isValidEmail = emailToValidate => {
  return constants.regex.email.test(emailToValidate);
};

/**
 * Valide if the input is a valid JSON
 * @param {string} JSONToValidate - JSON to be validated
 * @return {boolean} - True case the JSON is valid and false if it is not
 *
 */
exports.isValidJSON = JSONToValidate => {
  try {
    JSON.parse(JSONToValidate);
  } catch (err) {
    return false;
  }
  return true;
};

/**
 * Validate if the input is a valid integer
 *
 * @param {string} integerToValidate - Integer to be validated
 * @return {boolean} - True case the string is valid and false if it is not
 */
exports.isValidInteger = integerToValidate => {
  return (
    constants.regex.integer.test(integerToValidate) &&
    parseInt(integerToValidate) <= Number.MAX_SAFE_INTEGER &&
    parseInt(integerToValidate) >= Number.MIN_SAFE_INTEGER
  );
};

/**
 * Validate if the input is a valid array
 *
 * @param {array} arrayToValidate - Array to be validated
 * @return {boolean} - True case the array is valid and false if it is not
 */
exports.isValidArray = arrayToValidate => {
  return (
    arrayToValidate && 
    arrayToValidate instanceof Array && 
    arrayToValidate.length > 0
  );
};

/**
 * Validate if the file is a valid image
 *
 * @param {array} fileToValidate - File to be validated
 * @return {boolean} - True case the file is valid and false if it is not
 */
exports.isValidImage = fileToValidate => {
  return constants.regex.image.test(fileToValidate.mimetype);
};

/**
 * Validate if the parameters compose a valid selling option
 *
 * @param {object} game - Game to be validated
 * @param {integer} playerIndex - Player to be validated
 * @param {array} keepCrystals - Keep crystals option to be validated
 * @param {object} combo - Combo to be validated
 * @return {boolean} - True case the file is valid and false if it is not
 */
exports.isValidSelling = (game, playerIndex, keepCrystals, combo) => {
  if (combo.type === constants.values.combos.types.THREE_MULTIPLY_ONE || 
    combo.type === constants.values.combos.types.FOUR_MULTIPLY_TWO) {
    if (!combo.conversion)
      return false;
    if (typeof combo.conversion.from !== 'string')
      return false;
    let fromExists = false;
    for (let i = 0; i < Object.keys(constants.values.crystals).length - 1; i++) {
      if (Object.keys(constants.values.crystals)[i] === combo.conversion.from.toUpperCase()) {
        fromExists = true;
        break;
      }
    }
    if (!fromExists)
      return false;
  }
  if (keepCrystals.length !== Object.keys(constants.values.crystals).length - 1) {
    return false;
  }
  for (let i = 0; i < keepCrystals.length; i++) {
    if (keepCrystals[i] < 0 || keepCrystals[i] > 2) {
      return false;
    } else if (game.players[playerIndex].crystals[i].amount < keepCrystals[i]) {
      return false;
    }
  }
  let isValidSelling = true;
  switch (combo.type) {
    case constants.values.combos.types.NO_COMBO:
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        if (game.players[playerIndex].crystals[i].amount - keepCrystals[i] < 0) {
          isValidSelling = false;
          break;
        }
      }
      break;
    case constants.values.combos.types.THREE_MULTIPLY_ONE:
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        if (game.players[playerIndex].crystals[i].name === combo.conversion.from) {
          if (game.players[playerIndex].crystals[i].amount - keepCrystals[i] < 3) {
            isValidSelling = false;
            break;
          }
        }
      }
      break;
    case constants.values.combos.types.FOUR_MULTIPLY_TWO:
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        if (game.players[playerIndex].crystals[i].name === combo.conversion.from) {
          if (game.players[playerIndex].crystals[i].amount - keepCrystals[i] < 4) {
            isValidSelling = false;
            break;
          }
        }
      }
      break;
    case constants.values.combos.types.FIVE_TO_EIGTH_COINS:
      amountOfValidCrystals = 0;
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        if (game.players[playerIndex].crystals[i].amount - keepCrystals[i] > 0)
          amountOfValidCrystals++;
      }
      if (amountOfValidCrystals < 5)
        isValidSelling = false;
      break;
    case constants.values.combos.types.SIX_TO_TWELVE_COINS:
      amountOfValidCrystals = 0;
      for (let i = 0; i < game.players[playerIndex].crystals.length - 1; i++) {
        if (game.players[playerIndex].crystals[i].amount - keepCrystals[i] > 0)
          amountOfValidCrystals++;
      }
      if (amountOfValidCrystals < 6)
        isValidSelling = false;
      break;
    default:
      isValidSelling = false;
      break;
  }
  return isValidSelling;
};
