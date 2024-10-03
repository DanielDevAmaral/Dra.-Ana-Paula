const express = require('express');
const router = express.Router();
const {getPacientes, getPacientesById, cadastrarPaciente} = require('../controllers/pacienteController')

router.route('/').get(getPacientes).post(cadastrarPaciente);
router.route('/:id').get(getPacientesById);

module.exports = router;