const express = require('express');
const router = express.Router();
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');
const userMiddleware = require('../../controllers/userMiddleware');

const controllers = retrieveControllers(path.basename(__filename).split('.')[0]);

//  Auth API
router.post('/', userMiddleware, controllers.newRoom);
router.patch('/:roomId', userMiddleware, controllers.joinRoom);
router.get('/', controllers.retrieveRooms);
router.get('/:roomId', controllers.retrieveRoom);


module.exports = router;
