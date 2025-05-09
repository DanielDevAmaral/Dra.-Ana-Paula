const asyncHandler = require('../middleware/asyncHandler.js');
const Paciente = require('../models/Paciente.js');

// @desc Adicionar novo Paciente
// @route POST /api/anamnese/:id
// @access public
const cadastrarAnamnese = asyncHandler(async (req, res) => {
    const pacienteId = req.params.id; // Id do paciente recebido da requisição
    const paciente = await Paciente.findById(pacienteId); // Busca o paciente pelo ID

    console.log("Iniciado o processo de atualização da anamnese");

    // Extraindo os campos do corpo da requisição
    const {
        comorbidade,
        lesao = [], // valor padrão como array vazio
        conduta = [], // valor padrão como array vazio
        plano,
        esporte = false, // valor padrão
        alergia = [""], // valor padrão como array com string vazia
        gravidez = false, // valor padrão
        amamenta = false, // valor padrão
        fumo = false, // valor padrão
        observacao = false
    } = req.body;

    // Validação se o paciente existe
    if (!paciente) {
        res.status(400);
        throw new Error('Houve um problema, esse paciente não consta mais em nosso registro 🤨');
    }

    // Criando uma nova anamnese
    const novaAnamnese = {
        comorbidade,
        lesao,
        conduta,
        plano,
        esporte,
        alergia,
        gravidez,
        amamenta,
        fumo,
        observacao
    };

    // Atualizando o paciente com a nova anamnese no array de anamneses
    const pacienteAtualizado = await Paciente.findByIdAndUpdate(
        pacienteId,
        { $push: { anamnese: novaAnamnese } }, // Adiciona a nova anamnese ao array
        { new: true, useFindAndModify: false }  // Retorna o documento atualizado
    );

    // Enviando sinal para o terminal
    console.log("Anamnese adicionada ao paciente com sucesso");

    // Retorna o paciente atualizado
    res.status(200).json(pacienteAtualizado);
});

module.exports = { cadastrarAnamnese };