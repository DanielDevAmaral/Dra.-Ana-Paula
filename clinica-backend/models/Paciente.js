const mongoose = require('mongoose');

const familiaSchema = new mongoose.Schema({
    nome: {type: String, required: false},
    numero: {type: String, required: false, unique: true},
    email: {type: String, required: false},
    endereco: {type: String, required: false},
}, {
    timestamps: true,
});

const lesaoSchema = new mongoose.Schema({
    local: {type: String, required: true},
    etiologia: {type: String, required: true},
    tamanho: {type: String, required: true},
    profundidade: {type: String, required: true},
    borda: {type: String, required: true},
    exudato: {type: String, required: true},
    quantidadeEx: {type: String, required: true},
    perilesao: {type: String, required: true},
}, {
    timestamps: true,
});

const condutaSchema = new mongoose.Schema({
    desbridamento: {type: String, required: true},
    limpeza: {type: String, required: true}, // Solução de limpeza
    protecao: {type: String, required: true}, // Proteção de perilesão
    cobertura: {type: String, required: true}, // Cobertura Primária
    fixacao: {type: String, required: true},
    troca: {type: String, required: true}, // Período de troca da cobertura
    terapia: {type: Boolean, required: true},// Fez uso de terapia adjuvante
}, {
    timestamps: true,
})

const anamneseSchema = new mongoose.Schema({
    comorbidade: {type: String, required: true},
    lesao: [lesaoSchema],
    conduta: [condutaSchema],
    plano: {type: String, required: true},
    esporte: {type: Boolean, required: true},
    alergia: {type: [String], required: true},
    gravidez: {type: Boolean, required: true},
    amamenta: {type: Boolean, required: true},
    fumo: {type: Boolean, required: true},
}, {
    timestamps: true,
});

const pacienteSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  numero: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  nascimento: {type: Date, required: true},
  cpf: {type: String, required: true},
  endereco: {type: String, required: true},
  sexo: {type: String, required: true},
  medicamentos: {type: [String], required: false},
  peso: {type: Number, required: true, default: 0.0}, 
  altura: {type: Number, required: true, default: 0.0},
  profissao: {type: String, required: true},
  familia: [familiaSchema],
  anamnese: {
    type: [anamneseSchema],
    default: [],
  },
  agenda:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agenda'
  },
  financeiro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Financeiro'
  }
}, {
    timestamps: true,
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
