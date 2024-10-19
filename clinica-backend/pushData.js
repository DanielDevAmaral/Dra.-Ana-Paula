const mongoose = require('mongoose');
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

const populateAnamnese = async () => {
    try {
        // Conectando ao banco de dados
        await connectDB();

        // ID do paciente que será atualizado
        const pacienteId = '6713c28b65c64432f097a019';

        // Dados da nova anamnese
        const novaAnamnese = {
            comorbidade: 'Diabetes tipo 2',
            lesao: [{
                local: 'Perna direita',
                etiologia: 'Trauma',
                tamanho: '3cm x 2cm',
                profundidade: 'Superficial',
                borda: 'Irregular',
                exudato: 'Sero-purulento',
                quantidadeEx: 'Moderada',
                perilesao: 'Eritema',
            }],
            conduta: [{
                desbridamento: 'Enzimático',
                limpeza: 'Solução salina',
                protecao: 'Protetor de pele líquido',
                cobertura: 'Espuma com prata',
                fixacao: 'Fita adesiva hipoalergênica',
                troca: 'A cada 3 dias',
                terapia: true, // Fez uso de terapia adjuvante
            }],
            plano: 'Manter controle glicêmico rigoroso e acompanhamento semanal da lesão',
            esporte: false,
            alergia: ['Penicilina'],
            gravidez: false,
            amamenta: false,
            fumo: true,
        };

        // Atualizar o paciente com a nova anamnese
        const pacienteAtualizado = await Paciente.findByIdAndUpdate(
            pacienteId,
            { $push: { anamnese: novaAnamnese } }, // Adiciona a nova anamnese ao array de anamneses
            { new: true, useFindAndModify: false }  // Retorna o documento atualizado
        );

        if (pacienteAtualizado) {
            console.log('Anamnese adicionada com sucesso:', pacienteAtualizado);
        } else {
            console.log('Paciente não encontrado.');
        }

    } catch (error) {
        console.error('Erro ao adicionar anamnese:', error);
    } finally {
        mongoose.connection.close(); // Fecha a conexão após a operação
    }
};

// Executar a função
populateAnamnese();
