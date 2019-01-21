/**
 * All project constants
 * @module utils/constants
 */
module.exports = {
  messages: {
    info: {
      USER_LOGGED_OUT: 'User logged out.'
    },
    error: {
      INVALID_NAME: 'Name sent is not valid.',
      INVALID_USERNAME: 'Username sent is not valid.',
      INVALID_PASSWORD: 'Password sent is not valid.',
      INVALID_USER: 'This user/password does not correspond to a valid user.',
      INVALID_LOGIN: 'You need to be signed in to use this feature.',
      INVALID_ROOM: 'Room id sent is not valid.',
      INVALID_PARENT: 'Parent id sent is not valid.',
      INVALID_CONTENT: 'Message\'s content is not valid.',
      ROOM_NOT_FOUND: 'This room id does not correspond to a valid room.',
      INACTIVE_ROOM: 'This room is not accepting new users anymore.',
      USERNAME_NOT_UNIQUE: 'This username is already being used',
      UNEXPECTED_RUNNING: 'An error ocurred while processing your request. Please try again.',
      UNEXPECTED_DB: 'An error ocurred while accessing our database. Please try again.'
    }
  },
  regex: {
    integer: /^-?\d+$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    image: /\/(gif|jpg|jpeg|tiff|png)$/i
  },
  values: {
    PASSWORD_ENCRYPT_KEY: process.env.PASSWORD_ENCRYPT_KEY,
    USER_DATA_ENCRYPT_KEY: process.env.USER_DATA_ENCRYPT_KEY,
    TOKEN_ENCRYPT_KEY: process.env.TOKEN_ENCRYPT_KEY,
    TOKEN_EXPIRATION_IN_SECONDS: 60 * 60 * 24 * 30,
    TOKEN_NAME: 'session',
    MAX_ROOM_USERS: 4,
    crystals: {
      QUARTZO: {
        name: 'Quartzo',
        value: 1
      },
      RUBELITA: {
        name: 'Rubelita',
        value: 2
      },
      ESMERALDA: {
        name: 'Esmeralda',
        value: 3
      },
      SAFIRA: {
        name: 'Safira',
        value: 4
      },
      RUBI: {
        name: 'Rubi',
        value: 6
      },
      AMBAR: {
        name: 'Âmbar',
        value: 8
      },
      AUTUNITA: {
        name: 'Autunita',
        value: 0
      }
    },
    cards: {
      types: {
        OFFENSIVE: 'OFFENSIVE',
        DEFENSIVE: 'DEFENSIVE'
      }
    },
    errorCodes: {
      DUPLICATE_UNIQUE: 11000
    }
  },
  roles: {
    OWNER: 'owner',
    PLAYER: 'player'
  }
};
