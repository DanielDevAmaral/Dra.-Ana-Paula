const express = require('express');
const router = express.Router();
const {getPacientes, getPacientesById} = require('../controllers/pacienteController')

router.route('/').get(getPacientes);
router.route('/:id').get(getPacientesById);

module.exports = router;