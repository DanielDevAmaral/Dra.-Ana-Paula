const mongoose = require('mongoose');

const familiaSchema = new mongoose.Schema({
    nome: {type: String, required: false},
    numero: {type: String, required: false},
    email: {type: String, required: false},
    endereco: {type: String, required: false},
}, {
    timestamps: true,
});

const lesaoSchema = new mongoose.Schema({
    local: {type: String, required: true},
    etiologia: {type: String, required: false},
    tamanho: {type: String, required: false},
    profundidade: {type: String, required: false},
    borda: {type: String, required: false},
    exudato: {type: String, required: false},
    quantidadeEx: {type: String, required: false},
    perilesao: {type: String, required: false},
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
    plano: {type: String, required: false},
    esporte: {type: Boolean, required: false},
    alergia: {type: [String], required: false},
    gravidez: {type: Boolean, required: false},
    amamenta: {type: Boolean, required: false},
    fumo: {type: Boolean, required: false},
    observacao: {type: String, required: false},
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