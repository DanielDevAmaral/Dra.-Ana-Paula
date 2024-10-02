const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const pacienteRoutes = require('./routes/pacientesRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*'
}));


// Rota para obter a lista de pacientes
app.get('/', async (req, res) => {
    res.send('You found the enter!')
});

app.use('/api/pacientes', pacienteRoutes);

app.use(notFound);
app.use(errorHandler);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
