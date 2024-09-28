const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler.js');
const Paciente = require('../models/Paciente.js')

router.get('/', asyncHandler(async (req, res) => {
    const pacientes = await Paciente.find({});
    res.json(pacientes);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const paciente = await Paciente.findById(req.params.id);
    
    if (paciente) {
       return res.json(paciente);
    }

    res.status(404).json({message: 'Paciente não encontrado'});
    
}));

module.exports = router;