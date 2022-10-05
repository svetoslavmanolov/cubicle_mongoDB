const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/', async (req, res) => {
    const cubes = await cubeService.getAll();

    res.render('index', {cubes});
})


module.exports = router;