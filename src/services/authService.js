const bcrypt = require('bcrypt');
const User = require('../models/User');

const saltRounds = 10;

// exports.register = (userData) =>   //or (username, password, repeatPassword)
//     User.create(userData);


//exports.register = (userData) => User.create(userData); //taka bez curly brackets ako samo shte vrashtame rezultata i tova vrashta Promise

exports.register = async ({username, password, repeatPassword}) => {  //napravo destructurirame 
    //User.create(userData);
    if(password !== repeatPassword) {
        return false;  //samo return shte varne undefined
    }

    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let createdUser = User.create({
        username,
        password: hashedPassword
    });
    
    return createdUser;
}
