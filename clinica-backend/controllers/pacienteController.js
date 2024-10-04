const asyncHandler = require('../middleware/asyncHandler.js');
const Paciente = require('../models/Paciente.js');

// @desc Fetch all Pacientes
// @route GET /api/pacientes
// @access public
const getPacientes = asyncHandler(async (req, res) => {
    const pacientes = await Paciente.find({});
    if(pacientes){
        res.json(pacientes);
    } else {
        throw new Error('Nenhum paciente cadastrado')

    }
});

// @desc Adicionar novo Paciente
// @route POST /api/pacientes
// @access public
const cadastrarPaciente = asyncHandler(async (req, res) => {
    console.log("iniciado o processo de cadastro");

    // Extraindo os campos do corpo da requisição
    const {
        nome,
        numero,
        email,
        nascimento,
        cpf,
        endereco,
        sexo,
        medicamentos = [], // valor padrão como array vazio
        peso = 0.0, // valor padrão
        altura = 0.0, // valor padrão
        profissao,
        familia // deve ser um array de objetos que respeitam o familiaSchema
    } = req.body;

    console.log(`recebido o nome: ${nome}`);

    // Verificando se o CPF já está cadastrado
    const pacienteExistente = await Paciente.findOne({ cpf });
    if (pacienteExistente) {
        res.status(400);
        throw new Error('Já existe um paciente cadastrado com este CPF');
    }

    // Validação dos campos obrigatórios
    if (!nome || !numero || !email || !cpf || !profissao || !nascimento || !sexo) {
        res.status(400);
        throw new Error('Todos os campos obrigatórios devem ser preenchidos');
    }

    // Cria um novo paciente com os campos extraídos
    const novoPaciente = new Paciente({
        nome,
        numero,
        email,
        nascimento,
        cpf,
        endereco,
        sexo,
        medicamentos,
        peso,
        altura,
        profissao,
        familia // diretamente passamos o array de familia
    });

    // Salvando o paciente no banco de dados
    const pacienteSalvo = await novoPaciente.save();

    // Enviando sinal para o terminal
    console.log("Paciente adicionado com sucesso")

    // Retorna o paciente cadastrado com sucesso
    res.status(201).json(pacienteSalvo);
});

// @desc Fetch Paciente by Id
// @route GET /api/pacientes/:id
// @access public
const getPacientesById = asyncHandler(async (req, res) => {
    const paciente = await Paciente.findById(req.params.id);
    if (paciente) {
       return res.json(paciente);
    } else {
        res.status(404);
        throw new Error('Paciente não encontrado');
    }
});

// @desc Remover Paciente by Id
// @route DELETE /api/pacientes/:id
// @access public
const removerPacienteById = asyncHandler(async (req, res) => {
    const paciente = await Paciente.findById(req.params.id);
    
    if (!paciente) {
        res.status(404);
        throw new Error('Paciente não encontrado');
    }

    await paciente.deleteOne();
    res.json({ message: 'Paciente removido com sucesso' });
});

module.exports = { getPacientes, getPacientesById, cadastrarPaciente, removerPacienteById };