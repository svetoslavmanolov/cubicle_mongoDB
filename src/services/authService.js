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
