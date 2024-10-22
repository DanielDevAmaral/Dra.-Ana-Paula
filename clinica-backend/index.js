
//print para carol! @Daniel Amaral kk 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const morgan = require('morgan');
const pacienteRoutes = require('./routes/pacientesRoutes')
const anamneseRoutes = require('./routes/anamneseRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*'
}));
app.use(morgan('dev'));
app.use(express.json());

// Rota para obter a lista de pacientes
app.get('/', async (req, res) => {
    res.send('You found the enter!')
});

app.use('/api/pacientes', pacienteRoutes);
app.use('/api/anamnese', anamneseRoutes);

app.use(notFound);
app.use(errorHandler);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
