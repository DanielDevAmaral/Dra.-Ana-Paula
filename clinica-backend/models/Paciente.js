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
      planoTerapeutico: String,
      tecidosPresentes: {
          Necrose: String,
          NecroseLiquefacao: String,
          Esfacelo: String,
          Fibrina: String,
          Granulacao: String,
          Epitelizacao: String,
      },
      conduta: String,
  }]
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;