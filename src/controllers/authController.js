const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async (req, res) => {
    //const { username, password, repeatPassword } = req.body;
    let createdUser = await authService.register(req.body); //moje direktno da se podade zashtoto se oslanqme na mongoose validaciqta 
    if(createdUser) {
    res.redirect('/auth/login')
    } else {
        //TODO: redirect to 404 page
        res.status(404).send('Cannot create user');
    }
});

module.exports = router;