const express = require('express');
const router = express.Router();
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');
const userMiddleware = require('../../controllers/userMiddleware');
const gameMiddleware = require('../../controllers/gameMiddleware');

const controllers = retrieveControllers(path.basename(__filename).split('.')[0]);

//  Games API
router.post('/', userMiddleware, controllers.newGame);
router.get('/', userMiddleware, controllers.retrieveGames);
router.get('/:gameId', userMiddleware, controllers.gameInfo);
router.get('/:gameId/crystal', gameMiddleware, controllers.pickCrystal);
router.patch('/:gameId/close_mine', gameMiddleware, controllers.closeMine);
router.patch('/:gameId/sell', gameMiddleware, controllers.sellCrystals);
router.patch('/:gameId/use_card', gameMiddleware, controllers.useCard);

//  Cards
router.use('/:gameId/cards/', gameMiddleware, require('./cards'));

module.exports = router;
