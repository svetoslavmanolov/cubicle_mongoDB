const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function() {
                return this.imageUrl.startsWith('http')
            }, 
            message: 'Image URL should be a link'
        }
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    cubes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cube'
        }
    ]
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;