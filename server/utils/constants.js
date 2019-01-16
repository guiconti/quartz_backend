/**
 * All project constants
 * @module utils/constants
 */
module.exports = {
  messages: {
    info: {
      
    },
    error: {
 
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
    }
  },
  roles: {
    OWNER: 'owner',
    PLAYER: 'player'
  }
};
