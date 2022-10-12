const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const cube = req.body;
    cube.owner = req.user._id;

    if (cube.name.length < 2) {
        return res.status(400).send('Invalid request - name must contain more than 2 letters');
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
    const cube = await cubeService.getOneDetails(req.params.cubeId).lean();
    res.render('details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();
    //console.log(cube.accessories);
    res.render('accessory/attach', { cube, accessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const accessoryId = req.body.accessory;
    await cubeService.attachAccessory(req.params.cubeId, accessoryId);
    res.redirect(`/cube/details/${req.params.cubeId}`);   
});

router.get('/:cubeId/edit', async (req,res) => {

    console.log(req.user)
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    cube[`difficultyLevel${cube.difficultyLevel}`] = true;
    
    if(!cube) {
        return res.redirect('/404')
    }
    res.render('cube/edit', {cube});
});

router.post('/:cubeId/edit', async (req, res) => {
    
    let modifiedCube = await cubeService.edit(req.params.cubeId, req.body);
    res.redirect(`/cube/details/${modifiedCube._id}`);
});



module.exports = router;