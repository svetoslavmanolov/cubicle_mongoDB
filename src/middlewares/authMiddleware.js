const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { sessionName, secret } = require('../constants');

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
    let token = req.cookies[sessionName];  ///po-dobre taka zashtoto e dinamichno value. I e dobre da se napravi v promenliva zaradi preizpolzvaneto, protiv greshki
    if (token) {
        try {
            let decodedToken = await jwtVerify(token, secret);
            req.user = decodedToken;

        } catch(err) {
            console.log(err)
            return res.redirect('/404');
        }
    }
    next();
}