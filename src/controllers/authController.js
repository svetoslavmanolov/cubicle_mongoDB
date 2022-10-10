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
        //TODO: add notification
        res.redirect('/404')
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;