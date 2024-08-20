const mongoose = require('mongoose');

const EvolucaoSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  descricao: { type: String, required: true },
  profissional: { type: String, required: true },
});

const ExameSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  tipo: { type: String, required: true },
  resultado: { type: String, required: true },
});

const DiagnosticoSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  hipoteseDiagnostica: { type: String, required: true },
  diagnosticoDefinitivo: { type: String, required: true },
  condutaTerapeutica: { type: String, required: true },
  prescricoes: { type: String, required: true },
});

const ProntuarioSchema = new mongoose.Schema({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  evolucoes: [EvolucaoSchema],
  exames: [ExameSchema],
  diagnosticos: [DiagnosticoSchema],
  resumoAlta: { type: String, required: false },
  boletinsEnfermagem: { type: String, required: false },
});

const Prontuario = mongoose.model('Prontuario', ProntuarioSchema);

module.exports = Prontuario;
