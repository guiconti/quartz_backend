/**
 * All project constants
 * @module utils/constants
 */
module.exports = {
  messages: {
    info: {
      USER_LOGGED_OUT: 'User logged out.',
      MESSAGE_SENT: 'Message sent.',
      CRYSTAL_PICKED: 'Crystal picked.',
      CARD_USED: 'Card used.',
      MINE_CLOSED: 'Mine closed.',
      SOCKETS_SENT: 'Sockets send.',
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
      INVALID_PLAYERS: 'Players sent are not valid.',
      INVALID_TARGET: 'Target id sent is not valid.',
      INVALID_CRYSTAL: 'Crystal sent is not valid.',
      INVALID_GAME: 'Game id sent is not valid.',
      INVALID_SELLING: 'Selling data sent is not valid.',
      USER_NOT_PLAYING: 'This user is not a member of this game.',
      NOT_USERS_TURN: 'This is not the user\'s turn.',
      NOT_OWNER: 'You do not own this room.',
      USER_DONT_HAVE_CARD: 'This user does not have this card.',
      SELLING_NOT_AVAILABLE: 'Selling is not available at the moment.',
      ALREADY_SOLD: 'You already sold your crystals.',
      INVALID_CRYSTALS_TO_KEEP: 'Crystals to keep sent are invalid.',
      INVALID_COMBO: 'Combo sent is invalid.',
      CRYSTALS_SENT_INVALID: 'Crystal sent are invalid.',
      ROOM_NOT_ENABLE: 'This room is not enable to start the game.',
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
  sockets: {
    types: {
      CONNECT: 'connection',
      JOIN_ROOM: 'joinRoom',
      LEAVE_ROOM: 'leaveRoom',
      NEW_USER: 'newUser',
      NEW_MESSAGE: 'newMessage',
      START_GAME: 'startGame',
      JOIN_GAME: 'joinGame',
      LEAVE_GAME: 'leaveGame',
      JOIN_PLAYER_ROOM: 'joinPlayerRoom',
      LEAVE_PLAYER_ROOM: 'leavePlayerRoom',
      UPDATE_GAME: 'updateGame',
      CRYSTAL_PICKED: 'crystalPicked',
      HERE_WE_GO: 'hereWeGo',
      EUREKA: 'eureka',
      EUREKA_ANSWER: 'eurekaAnswer',
      COME_CLOSER: 'comeCloser',
      OUT_OF_MY_WAY: 'outOfMyWay',
      CRYSTAL_WHAT_CRYSTAL: 'crystalWhatCrystal',
      THIS_ISNT_MINE: 'thisIsntMine',
      THIS_ISNT_MINE_EITHER: 'thisIsntMineEither',
      THESE_DONT_BELONG_TO_YOU: 'theseDontBelongToYou',
      THIEVERY_UNACCEPTABLE: 'thieveryUnacceptable',
      GIVE_ME_A_HAND_HERE: 'giveMeAHandHere',
      GIVE_ME_A_HAND_HERE_ANSWER: 'giveMeAHandHereAnswer',
      NOPE_I_AM_ON_A_BREAK: 'nopeIAmOnABreak',
    }
  },
  values: {
    PASSWORD_ENCRYPT_KEY: process.env.PASSWORD_ENCRYPT_KEY,
    USER_DATA_ENCRYPT_KEY: process.env.USER_DATA_ENCRYPT_KEY,
    TOKEN_ENCRYPT_KEY: process.env.TOKEN_ENCRYPT_KEY,
    TOKEN_EXPIRATION_IN_SECONDS: 60 * 60 * 24 * 30,
    TOKEN_NAME: 'session',
    MAX_ROOM_USERS: 4,
    MAX_ROUNDS: 4,
    crystals: {
      QUARTZO: {
        name: 'Quartzo',
        value: 1,
        amount: 15
      },
      RUBELITA: {
        name: 'Rubelita',
        value: 2,
        amount: 12
      },
      ESMERALDA: {
        name: 'Esmeralda',
        value: 3,
        amount: 10
      },
      SAFIRA: {
        name: 'Safira',
        value: 4,
        amount: 7
      },
      RUBI: {
        name: 'Rubi',
        value: 6,
        amount: 4
      },
      AMBAR: {
        name: 'Âmbar',
        value: 8,
        amount: 2
      },
      AUTUNITA: {
        name: 'Autunita',
        value: 0,
        amount: 18
      }
    },
    cards: {
      list: [
        {
          name: 'Here we go',
          action: 'hereWeGo',
          description: `Mine three Crystals, all at once. If any of them are Obsidian, return them to the Mine
          Bag. You may keep any or all of the Crystals and place them in your Mine Cart.`,
          type: 'ACTION',
          value: 10,
          amount: 10,
          image: 'https://i.imgur.com/u5GksXQ.jpg'
        },
        {
          name: 'Eureka!',
          action: 'eureka',
          description: `Mine seven Crystals. You may replace one of the Crystals in your Mine Cart with one of
          the Crystals drawn. The other six crystals, and the one from your Mine Cart that was
          replaced, are returned to the Mine Bag. Only the new Crystal is kept, and Obsidian may
          not be replaced in this way.`,
          type: 'ACTION',
          value: 3,
          amount: 3,
          image: 'https://i.imgur.com/VmdgRIB.jpg'
        },
        {
          name: 'Come closer',
          action: 'comeCloser',
          description: `Trade one Crystal from your Mine Cart with one Crystal from the Mine Cart of a dwarf
          who is still inside the Mine. Trading Obsidian in this way is not allowed.`,
          type: 'ACTION',
          value: 3,
          amount: 3,
          image: 'https://i.imgur.com/ztEm7hf.jpg'
        },
        {
          name: 'Out of my waaaay',
          action: 'outOfMyWay',
          description: `All other dwarves still in the mine must discard one random valuable Crystal (not
            Obsidian) from their Mine Carts. The discarded Crystals are returned to the Mine Bag.`,
          type: 'ACTION',
          value: 3,
          amount: 3,
          image: 'https://i.imgur.com/H7vF73z.jpg'
        },
        {
          name: 'Crystal? What crystal?',
          action: 'crystalWhatCrystal',
          description: `Place this card beside your Mine Cart. At the end of this turn, you may take one Crystal
          from your Mine Cart and place it on this card. That Crystal is now protected against all
          Action Card effects and Accidents. At the end of the day, return any Crystals on this card
          to your Mine Cart and discard this card.`,
          type: 'ACTION',
          value: 3,
          amount: 3,
          image: 'https://i.imgur.com/L5bPIm9.jpg'
        },
        {
          name: 'Give me a hand here',
          action: 'giveMeAHandHere',
          description: `Choose another dwarf who must mine two Crystals. You may choose one of those
          Crystals and place it on your Mine Cart. The miner must keep the remaining Crystal, even
          if it is Obsidian. If both Crystals mined are Obsidian, the miner takes one, and the other is
          returned to the Mine Bag.`,
          type: 'ACTION',
          value: 8,
          amount: 8,
          image: 'https://i.imgur.com/xtOKc6d.jpg'
        },
        {
          name: 'These don\'t belong to you',
          action: 'theseDontBelongToYou',
          description: `Steal two valuable Crystals from another dwarf’s Mine Cart. Obsidian cannot be stolen
          in this way.`,
          type: 'ACTION',
          value: 8,
          amount: 8,
          image: 'https://i.imgur.com/xM73SOL.jpg'
        },
        {
          name: 'This isn\'t mine',
          action: 'thisIsntMine',
          description: `Take one Obsidian from your cart and give it to any other dwarf that is still in the mine.
          If the dwarf receiving the Obsidian already has an Obsidian in their Mine Cart, they will
          suffer an Accident immediately.`,
          type: 'ACTION',
          value: 8,
          amount: 8,
          image: 'https://i.imgur.com/BGhoG0d.jpg'
        },
        {
          name: 'Not mine either!',
          action: 'notMineEither',
          description: `When someone gives you an Obsidian with the “This Isn’t Mine” action, you may play
          this card and send that Obsidian to any other dwarf still in the mine. (However, the
          Obsidian cannot be sent back to the dwarf who gave it to you.) If no other dwarves are
          available, the Obsidian is returned to the Mine Bag.`,
          type: 'REACTION',
          value: 3,
          amount: 3,
          image: 'https://i.imgur.com/SaW1DEY.jpg'
        },
        {
          name: 'Thievery? Unacceptable!',
          action: 'thieveryUnacceptable',
          description: `If someone tries to steal two Crystals from you with the “These Don’t Belong To You”
          Action Card, you may play this card to block that action. Instead, take one Crystal from
          their Mine Cart.`,
          type: 'REACTION',
          value: 3,
          amount: 3,
          image: 'https://i.imgur.com/ttkH9cK.jpg'
        },
        {
          name: 'Nope. I am on a break',
          action: 'nopeIAmOnABreak',
          description: `Play this card to prevent another dwarf from forcing you to mine two Crystals with the
          “Gimme A Hand Here” Action Card. `,
          type: 'REACTION',
          value: 3,
          amount: 3,
          image: 'https://i.imgur.com/5RJRbGF.jpg'
        },
      ],
      types: {
        ACTION: 'ACTION',
        REACTION: 'REACTION'
      },
      board: {
        3: 2,
        4: 3,
        5: 4
      },
      AMOUNT_PER_PLAYER: 5,
      EUREKA_CRYSTALS_AMOUNT: 7,
      THESE_DONT_BELONG_TO_YOU_CRYSTALS_AMOUNT: 2,
      THESE_DONT_BELONG_TO_YOU_REACTION_CRYSTALS_AMOUNT: 1,
      GIVE_ME_A_HAND_HERE_CRYSTALS_AMOUNT: 2,
      GIVE_ME_A_HAND_HERE_TAKE_CRYSTALS_AMOUNT: 1,
      GIVE_ME_A_HAND_HERE_GIVE_CRYSTALS_AMOUNT: 2,
      THIS_ISNT_MINE_REACTION: 'notMineEither',
      THESE_DONT_BELONG_TO_YOU_REACTION: 'thieveryUnacceptable',
      GIVE_ME_A_HAND_HERE_REACTION: 'nopeIAmOnABreak',
    },
    IDIOT_BOOK_VALUE: 3,
    combos: {
      types: {
        NO_COMBO: -1,
        THREE_MULTIPLY_ONE: 0,
        FOUR_MULTIPLY_TWO: 1,
        FIVE_TO_EIGTH_COINS: 2,
        SIX_TO_TWELVE_COINS: 3
      },
      money: {
        FIVE_TO_EIGTH_COINS: 8,
        SIX_TO_TWELVE_COINS: 12
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
