const express = require('express');
const router = express.Router();
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');
const userMiddleware = require('../../controllers/userMiddleware');

const controllers = retrieveControllers(path.basename(__filename).split('.')[0]);

//  Games API
router.post('/', userMiddleware, controllers.newGame);
router.get('/:id', controllers.gameInfo);

module.exports = router;
