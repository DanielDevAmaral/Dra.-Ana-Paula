const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Paciente = require('./models/Paciente');
const { format } = require('date-fns');

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
        res.send(paciente.anamnesis);
    } catch (error) {
        res.status(500).send('Erro ao buscar paciente');
    }
});


// Rota para adicionar um novo plano terapêutico de um paciente específico
app.put('/pacientes/:pacienteId/plano-terapeutico', async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const { planoTerapeutico, dataRegistroPlano } = req.body;

        // Converte a string da data para um objeto Date
        const dataRegistroPlanoDate = new Date(dataRegistroPlano);

        if (isNaN(dataRegistroPlanoDate.getTime())) {
            return res.status(400).send("Data inválida fornecida.");
        }
        

        // Encontra o paciente
        const paciente = await Paciente.findById(pacienteId);
        if (!paciente) return res.status(404).send("Paciente não encontrado");

        // Verifica se o array `anamnesis` existe; se não, inicializa como um array vazio
        // Isso serve para quando o paciente é cadastrado pela primeira vez e parte de seus dados estão zerados
        if (!paciente.anamnesis) {
            paciente.anamnesis = [];
        }

        // Adiciona um novo objeto de plano terapêutico no array anamnesis
        // Cria um novo registro
        paciente.anamnesis.push({
            planoTerapeutico: { plano: planoTerapeutico, dataRegistroPlano: dataRegistroPlanoDate }
        });

        // Salva o registro no banco
        await paciente.save();

        res.status(200).send("Plano terapêutico adicionado com sucesso");
    } catch (error) {
        console.error("Erro ao salvar plano terapêutico:", error);
        res.status(500).send("Erro ao salvar plano terapêutico");
    }
});

// Rota para adicionar uma nova conduta de um paciente específico
app.put('/pacientes/:pacienteId/conduta', async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const { conduta } = req.body;

        console.log("Dados recebidos:", conduta);

        // Encontra o paciente
        const paciente = await Paciente.findById(pacienteId);
        if (!paciente) return res.status(404).send("Paciente não encontrado");

        // Verifica se o array `anamnesis` existe; se não, inicializa como um array vazio
        if (!paciente.anamnesis) {
            paciente.anamnesis = [];
        }

        // Sobrescreve a última conduta ou adiciona uma nova se o array estiver vazio
        if (paciente.anamnesis.length > 0) {
            paciente.anamnesis[paciente.anamnesis.length - 1] = { conduta }; // Atualiza a última conduta
        } else {
            paciente.anamnesis.push({ conduta }); // Adiciona a conduta se o array estiver vazio
        }

        console.log("Paciente após atualizar conduta:", paciente);

        // Salva o paciente atualizado no banco de dados
        await paciente.save();

        res.status(200).send("Conduta atualizada com sucesso");
    } catch (error) {
        console.error("Erro ao salvar conduta:", error);
        res.status(500).send("Erro ao salvar conduta");
    }
});



app.post('/pacientes/:pacienteId/anamnesis', async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const anamnesisData = req.body.anamnesis[0]; // Extraindo o primeiro elemento do array

        console.log('Dados recebidos:', anamnesisData);

        // Atualize ou crie a anamnese
        const result = await Paciente.findByIdAndUpdate(
            pacienteId,
            { $set: { anamnesis: [anamnesisData] } }, // Substituir o array
            { new: true }
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao salvar anamnese:', error);
        res.status(500).json({ message: 'Erro ao salvar anamnese' });
    }
});

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


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
