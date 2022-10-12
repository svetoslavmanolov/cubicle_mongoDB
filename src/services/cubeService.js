const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

exports.getAll = async (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    let cubes = await Cube.find({ name: { $regex: new RegExp(search, 'i') } })
        .where('difficultyLevel').gte(from).lte(to)
        .lean();
    return cubes;
}

exports.getOne = (cubeId) => Cube.findById(cubeId).lean();

exports.getOneDetails = (cubeId) => Cube.findById(cubeId).populate('accessories');

exports.create = (cube) => Cube.create(cube);

exports.edit = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData, { runValidators: true });  //tuk mu kazvash zadaljitelno da mine prez validatorite

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);    //Cube.findOneAndDelete({_id: cubeId})

exports.attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

    return cube;
}

