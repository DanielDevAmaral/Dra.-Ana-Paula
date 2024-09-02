// MODELO ANTIGO
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
*/

// NOVO MODELO ABAIXO

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
  medicacoesEmUso: [String], // Lista de medicações
  profissao: String,
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

      // Substituição do campo 'conduta' com os novos dados
      conduta: {
          tipoDesbridamento: String,    // Tipo de desbridamento
          solucaoLimpeza: String,       // Solução de limpeza
          protecaoPerilesao: String,    // Proteção de perilesão
          coberturaPrimaria: String,    // Cobertura Primária
          coberturaSecundaria: String,  // Cobertura Secundária
          fixacao: String,              // Fixação
          periodoTrocaCobertura: String, // Período de troca da cobertura
          usoTerapiaAdjuvante: String   // Fez uso de terapia adjuvante
      },

      tecidosPresentes: [String],

      // Novos campos na anamnese
      esporte: { type: Boolean }, // Esporte? Sim ou Não
      medicamento: { type: Boolean }, // Medicamento? Sim ou Não
      alergico: String, // Descrição de alergias
      gravida: { type: Boolean }, // Está grávida? Sim ou Não
      amamentando: { type: Boolean }, // Amamentando? Sim ou Não
      fumante: { type: Boolean } // Fumante? Sim ou Não
  }]
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
