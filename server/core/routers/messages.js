const express = require('express');
const router = express.Router();
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');
const userMiddleware = require('../../controllers/userMiddleware');

const controllers = retrieveControllers(path.basename(__filename).split('.')[0]);

//  Auth API
router.get('/:parentId', controllers.retrieveMessages);
router.post('/', userMiddleware, controllers.newMessage);

module.exports = router;
