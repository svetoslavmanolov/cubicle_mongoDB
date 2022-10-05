const express = require('express');
const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');

const router = express.Router();

router.use('/', homeController);


module.exports = router;