const mongoose = require('mongoose');
const Agenda = require('./models/Agenda'); // Supondo que este seja o caminho do modelo Agenda
const Paciente = require('./models/Paciente'); // Supondo que este seja o caminho do modelo Paciente

// Conectando ao MongoDB manualmente com a URI fornecida
const connectDB = async () => {
    try {
        const mongoURI = 'mongodb+srv://projetoclinica:YxY7g1x8lDCxTKZ7@cluster0.c059o.mongodb.net/clinica?retryWrites=true&w=majority&appName=Cluster0';

        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
        process.exit(1); // Encerra o processo em caso de erro
    }
};

const inserirAgenda = async () => {
    try {
        // Conectando ao banco de dados
        await connectDB();

        // ID do paciente que será vinculado à agenda
        const pacienteId = '6713c28b65c64432f097a019';

        // Verificar se o paciente existe no banco de dados
        const paciente = await Paciente.findById(pacienteId);

        if (!paciente) {
            console.log('Paciente não encontrado.');
            return;
        }

        // Dados da nova agenda
        const novaAgenda = {
            data: new Date('2024-10-30'), // Exemplo de data
            horarioInicio: '09:00',
            horarioFim: '10:00',
            paciente: pacienteId, // Vincular o paciente à agenda
            comentarios: 'Consulta de rotina',
        };

        // Criar a nova agenda no banco de dados
        const agendaCriada = await Agenda.create(novaAgenda);

        if (agendaCriada) {
            console.log('Agenda criada com sucesso:', agendaCriada);
        } else {
            console.log('Erro ao criar agenda.');
        }

    } catch (error) {
        console.error('Erro ao criar agenda:', error);
    } finally {
        mongoose.connection.close(); // Fecha a conexão após a operação
    }
};

// Executar a função
inserirAgenda();
