const mongoose = require('mongoose');

// Definindo o schema para o calendário de consultas (Agenda)
const agendaSchema = new mongoose.Schema({
    dataInicioConsulta: { 
        type: Date, 
        required: true 
    }, // Data de início da consulta
    horaInicioConsulta: { 
        type: String, 
        required: true 
    }, // Hora de início da consulta no formato HH:MM
    dataFimConsulta: { 
        type: Date, 
        required: true 
    }, // Data de fim da consulta
    horaFimConsulta: { 
        type: String, 
        required: true 
    }, // Hora de fim da consulta no formato HH:MM
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: false // A consulta pode ou não estar vinculada a um paciente
    }, // Vínculo com o paciente
    foiPaga: { 
        type: Boolean, 
        default: false, 
        required: true 
    } // Verifica se a consulta foi paga ou não
}, {
    timestamps: true
});

// Criando o modelo Agenda
const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
