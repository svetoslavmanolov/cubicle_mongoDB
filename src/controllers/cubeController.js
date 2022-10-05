const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/details/:cubeId', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    res.render('details', { cube })
});





module.exports = router;