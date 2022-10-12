const router = require('express').Router();
const authService = require('../services/authService');

const { sessionName } = require('../constants');

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

router.post('/login', async (req, res) => {
    let token = await authService.login(req.body);
   
    if(!token) {
        return res.redirect('/404')
    }

    res.cookie(sessionName, token, {httpOnly: true});  //httpOnly: true - JS na browser-a nqma da moje da chete cookie-to
    res.redirect('/');
});

module.exports = router;