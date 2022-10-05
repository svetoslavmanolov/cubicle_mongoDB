const Cube = require('../models/Cube');

exports.getAll = () => Cube.find().lean();

exports.getOne = (cubeId) => Cube.findById(cubeId).lean();
