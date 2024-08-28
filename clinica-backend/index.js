const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Paciente = require('./models/Paciente');
const Prontuario = require('./models/Prontuario'); // Importar o modelo Prontuario

const app = express();
const PORT = 5000;

// Middleware para parsear o JSON
app.use(bodyParser.json());

// Middleware para habilitar CORS
app.use(cors());

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/clinica', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rota para obter a lista de pacientes
app.get('/pacientes', async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.send(pacientes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota para obter um paciente específico
app.get('/pacientes/:pacienteId', async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.pacienteId);
        if (!paciente) return res.status(404).send('Paciente não encontrado');
        res.send(paciente);
    } catch (error) {
        res.status(500).send('Erro ao buscar paciente');
    }
});

// Rota para obter o prontuário de um paciente específico
app.get('/pacientes/:pacienteId/anamnesis', async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.pacienteId);
        if (!paciente) return res.status(404).send('Paciente não encontrado');
        res.send(paciente);
    } catch (error) {
        res.status(500).send('Erro ao buscar paciente');
    }
});

app.post('/pacientes/:id/anamnesis', async (req, res) => {
    const { anamnesis } = req.body;
    try {
        await Paciente.findByIdAndUpdate(req.params.id, { $push: { anamnesis } });
        res.status(200).json({ message: "Anamnese salva com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar anamnese" });
    }
});


// Rota para atualizar ou salvar a anamnese de um paciente específico
app.post('/pacientes/:pacienteId/anamnesis', async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.pacienteId);
        if (!paciente) return res.status(404).send("Paciente não encontrado");

        // Update to use the correct field name
        paciente.anaminese.push(req.body.anamnesisData);

        await paciente.save();

        res.status(201).send("Anamnese salva com sucesso");
    } catch (error) {
        console.error("Error saving anamnesis:", error);
        res.status(500).send("Erro ao salvar anamnese");
    }
});



/* Rota para obter o prontuário de um paciente específico
app.get('/prontuarios/:pacienteId', async (req, res) => {
    try {
        const prontuario = await Prontuario.findOne({ pacienteId: req.params.pacienteId });
        if (!prontuario) return res.status(404).send('Prontuário não encontrado');
        res.send(prontuario);
    } catch (error) {
        res.status(500).send('Erro ao buscar prontuário');
    }
});
*/
// Rota para salvar os dados do paciente
app.post('/pacientes', async (req, res) => {
    try {
        const paciente = new Paciente(req.body);
        await paciente.save();
        res.status(201).send(paciente);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Rota para salvar ou atualizar o prontuário de um paciente
app.post('/prontuarios', async (req, res) => {
    try {
        const { pacienteId, ...prontuarioData } = req.body;
        const prontuario = await Prontuario.findOneAndUpdate(
            { pacienteId },
            { ...prontuarioData, pacienteId },
            { new: true, upsert: true }
        );
        res.status(201).send(prontuario);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.put('/pacientes/:pacienteId/plano-terapeutico', async (req, res) => {
    const { planoTerapeutico, dataRegistroPlano } = req.body;
  
    try {
      const paciente = await Paciente.findByIdAndUpdate(
        req.params.pacienteId,
        { $push: { "anamnesis.0.planosTerapeuticos": { planoTerapeutico, dataRegistroPlano } } },
        { new: true }
      );
      if (!paciente) return res.status(404).send('Paciente não encontrado');
      res.status(200).send(paciente);
    } catch (error) {
      res.status(500).send('Erro ao atualizar plano terapêutico');
    }
  });

  app.put('/pacientes/:pacienteId/conduta', async (req, res) => {
    const { conduta, dataRegistroConduta } = req.body;
  
    try {
      const paciente = await Paciente.findByIdAndUpdate(
        req.params.pacienteId,
        { $push: { "anamnesis.0.condutas": { conduta, dataRegistroConduta } } },
        { new: true }
      );
      if (!paciente) return res.status(404).send('Paciente não encontrado');
      res.status(200).send(paciente);
    } catch (error) {
      res.status(500).send('Erro ao atualizar conduta');
    }
  });

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
