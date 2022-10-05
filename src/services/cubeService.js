const Cube = require('../models/Cube');

exports.getAll = () => Cube.find().lean();