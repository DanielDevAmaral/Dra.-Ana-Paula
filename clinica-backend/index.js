const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware para parsear o JSON
app.use(bodyParser.json());

// Middleware para habilitar CORS
app.use(cors());

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/clinica', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir o esquema do paciente
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
    anotacoesMedicas: { type: String, required: false }
  });

// Criar o modelo do paciente
const Paciente = mongoose.model('Paciente', pacienteSchema);

// Rota para obter a lista de pacientes
app.get('/pacientes', async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.send(pacientes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Rota para salvar os dados do paciente
app.post('/pacientes', async (req, res) => {
    try {
        const paciente = new Paciente(req.body);
        await paciente.save();
        res.status(201).send(paciente);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
