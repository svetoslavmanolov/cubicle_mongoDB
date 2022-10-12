const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { saltRounds, secret } = require('../constants');

// exports.register = (userData) =>   //or (username, password, repeatPassword)
//     User.create(userData);


//exports.register = (userData) => User.create(userData); //taka bez curly brackets ako samo shte vrashtame rezultata i tova vrashta Promise

exports.register = async ({ username, password, repeatPassword }) => {  //napravo destructurirame 
    //User.create(userData);
    if (password !== repeatPassword) {
        return false;  //samo return shte varne undefined
    }

    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let createdUser = User.create({ //tova e statichen metod, koito se izvikva direktno ot class-a
        username,
        password: hashedPassword
    });

    //second way to create createdUser
    //izpolzva se kogato iskame da sazdadem obekta i da operirame s nego predi da go save() v bazata danni
    // let createdUser = new User({
    //     username,
    //     password: hashedPassword
    // });
    // await createdUser.save();  //tova save() e instancionen metod, a ne e statichen metod

    return createdUser;
}

exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username });

    if (!user) {
        //TODO: add message
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return;
    }

    let result = new Promise((resolve, reject) => {
        jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
    return result;

    //second way to convert jwt.sign from callback to Promise
    //const { promisify } = require('util');

    // const jwtPromiseSign = promisify(jwt.sign);
    // jwtPromiseSign({_id:user._id, username: user.username}, secret);

};