const express = require('express');
const router = express.Router();
const {getAgenda, cadastrarAgenda, getAgendaById, removerAgendaById, atualizarAgenda} = require('../controllers/agendaController.js')

router.route('/').get(getAgenda).post(cadastrarAgenda);
router.route('/:id').get(getAgendaById).put(atualizarAgenda).delete(removerAgendaById);


module.exports = router;