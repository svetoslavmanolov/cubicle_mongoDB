const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const cube = req.body;

    if(cube.name.length < 2) {
        return res.status(400).send('Invalid request - name must have over 2 letter.');
    }
    try {
        await cubeService.create(cube)
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.get('/details/:cubeId', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId);
    res.render('details', { cube });
});





module.exports = router;