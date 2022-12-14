const router = require('express').Router();
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddleware');

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
    const isOwner = cube.owner == req.user?._id;
    res.render('details', { cube, isOwner });
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

router.get('/:cubeId/edit', isAuth, async (req, res) => {

    const cube = await cubeService.getOne(req.params.cubeId).lean();

    if (cube.owner != req.user._id) {
        //kogato e !== nqma da raboti zashtoto ne sa ednakvi -->. A kogato e != JS go force-va do string
        // console.log(cube.owner); --> new ObjectId("6346600109734321788dd74d")
        //console.log(req.user._id) --> 6346600109734321788dd74d
        return res.redirect('/404');
    }


    cube[`difficultyLevel${cube.difficultyLevel}`] = true;

    if (!cube) {
        return res.redirect('/404')
    }
    res.render('cube/edit', { cube });
});

router.post('/:cubeId/edit', async (req, res) => {

    let modifiedCube = await cubeService.edit(req.params.cubeId, req.body);
    res.redirect(`/cube/details/${modifiedCube._id}`);
});

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    //TODO: is owner validation ili da vzemesh cube v otedelen middleware i tam da go validirame
    res.render('cube/delete', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.params.cubeId);
    res.redirect('/');
});


module.exports = router;