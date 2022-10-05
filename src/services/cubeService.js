const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

exports.getAll = () => Cube.find().lean();

exports.getOne = (cubeId) => Cube.findById(cubeId).lean();

exports.getOneDetails = (cubeId) => Cube.findById(cubeId).populate('accessories');

exports.create = (cube) => Cube.create(cube);

// exports.attachAccessory = async (cubeId, accessoryId) => {
//     const cube = Cube.findById(cubeId);
//     const accessory = Accessory.findById(accessoryId);

//     cube.accessories.push(accessory);
//     accessory.cubes.push(cube);

//     await cube.save();
//     await accessory.save();

//     return cube;
// }

