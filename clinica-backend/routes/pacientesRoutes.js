const express = require('express');
const router = express.Router();
const {getPacientes, getPacientesById, cadastrarPaciente, removerPacienteById} = require('../controllers/pacienteController')

router.route('/').get(getPacientes).post(cadastrarPaciente);
router.route('/:id').get(getPacientesById).delete(removerPacienteById);

module.exports = router;