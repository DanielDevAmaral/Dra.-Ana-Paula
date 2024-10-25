const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  horarioInicio: { type: String, required: true },
  horarioFim: { type: String, required: true },
  paciente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Paciente', 
    required: true 
  }, // Vinculação com um paciente já existente
  comentarios: { type: String, required: false },
}, {
  timestamps: true,
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
