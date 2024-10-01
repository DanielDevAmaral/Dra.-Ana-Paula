const asyncHandler = require('../middleware/asyncHandler.js');
const Paciente = require('../models/Paciente.js');

// @desc Fetch all Pacientes
// @route GET /api/pacientes
// @access public
const getPacientes = asyncHandler(async (req, res) => {
    const pacientes = await Paciente.find({});
    if(pacientes){
        res.json(pacientes);
    } else {
        throw new Error('Nenhum paciente cadastrado')

    }
});

// @desc Fetch Paciente by Id
// @route GET /api/pacientes/:id
// @access public
const getPacientesById = asyncHandler(async (req, res) => {
    const paciente = await Paciente.findById(req.params.id);
    if (paciente) {
       return res.json(paciente);
    } else {
        res.status(404);
        throw new Error('Paciente não encontrado');
    }
});

module.exports = { getPacientes, getPacientesById };