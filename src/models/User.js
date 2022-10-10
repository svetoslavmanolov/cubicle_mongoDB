const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }

});

const User = mongoose.model('User', userSchema);  //tuk mongoose razbira koq kolekciq e 'User' i q pluralizira 

module.exports = User;
