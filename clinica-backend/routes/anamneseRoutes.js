const express = require('express');
const router = express.Router();
const {cadastrarAnamnese} = require('../controllers/anamneseController')

router.route('/:id').post(cadastrarAnamnese);


module.exports = router;