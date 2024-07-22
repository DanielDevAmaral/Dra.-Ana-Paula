const mongoose = require('mongoose');

const anotacaoSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  dataHora: { type: Date, default: Date.now }
});

const pacienteSchema = new mongoose.Schema({
  nomePaciente: { type: String, required: true },
  telefonePaciente: { type: String, required: true },
  emailPaciente: { type: String, required: true },
  tipoSanguineo: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  cpfPaciente: { type: String, required: true },
  nomeFamiliar: { type: String, required: false },
  telefoneFamiliar: { type: String, required: false },
  emailFamiliar: { type: String, required: false },
  anotacoesMedicas: [anotacaoSchema]
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
