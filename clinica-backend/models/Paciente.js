const mongoose = require('mongoose');

// Definir o esquema do paciente
const pacienteSchema = new mongoose.Schema({
  nomePaciente: String,
  telefonePaciente: String,
  emailPaciente: String,
  tipoSanguineo: String,
  dataNascimento: Date,
  cpfPaciente: String,
  enderecoPaciente: String,
  nomeFamiliar: String,
  telefoneFamiliar: String,
  emailFamiliar: String,
  anamnesis: [{
      comorbidades: String,
      localLesao: String,
      etiologia: String,
      tamanhoLesao: String,
      profundidadeLesao: String,
      bordasMargens: String,
      exsudato: String,
      quantidadeExsudato: String,
      perilesao: String,

      planoTerapeutico: {
          plano: String,
          dataRegistroPlano: Date
      },
      conduta: {
          conduta: String,
          dataRegistroConduta: Date
      },
      tecidosPresentes: [String],
  }]
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;

// NOVO MODELO ABAIXO
/*
const mongoose = require('mongoose');

// Definir o esquema do paciente
const pacienteSchema = new mongoose.Schema({
  nomePaciente: String,
  telefonePaciente: String,
  emailPaciente: String,
  tipoSanguineo: String,
  dataNascimento: Date,
  cpfPaciente: String,
  enderecoPaciente: String,
  nomeFamiliar: String,
  telefoneFamiliar: String,
  emailFamiliar: String,
  medicaçõesEmUso: [String], // Lista de medicações
  profissão: String,
  sexo: { type: String, enum: ['Masculino', 'Feminino', 'Outro'] }, // Opções de sexo
  peso: Number, // Peso do paciente
  altura: Number, // Altura do paciente
  anamnesis: [{
      comorbidades: String,
      localLesao: String,
      etiologia: String,
      tamanhoLesao: String,
      profundidadeLesao: String,
      bordasMargens: String,
      exsudato: String,
      quantidadeExsudato: String,
      perilesao: String,

      planoTerapeutico: {
          plano: String,
          dataRegistroPlano: Date
      },
      conduta: {
          conduta: String,
          dataRegistroConduta: Date
      },
      tecidosPresentes: [String],

      // Novos campos na anamnese
      esporte: { type: Boolean, default: false }, // Esporte? Sim ou Não
      medicamento: { type: Boolean, default: false }, // Medicamento? Sim ou Não
      alergico: String, // Descrição de alergias
      gravida: { type: Boolean, default: false }, // Está grávida? Sim ou Não
      amamentando: { type: Boolean, default: false }, // Amamentando? Sim ou Não
      fumante: { type: Boolean, default: false } // Fumante? Sim ou Não
  }]
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
*/