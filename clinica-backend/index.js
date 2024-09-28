const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const pacienteRoutes = require('./routes/pacientesRoutes')

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Rota para obter a lista de pacientes
app.get('/', async (req, res) => {
    res.send('You found the enter!')
});

app.use('/api/pacientes', pacienteRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
