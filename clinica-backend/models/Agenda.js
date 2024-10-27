const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  desc: { type: String, required: true },
  color: { type: String, required: false },
  tipo: { type: String, required: false },
  paciente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Paciente', 
    required: false 
  }, // Vinculação com um paciente já existente
}, {
  timestamps: true,
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
