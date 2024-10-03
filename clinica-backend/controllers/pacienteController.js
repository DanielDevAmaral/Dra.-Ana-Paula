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
    console.log("iniciado o processo de cadastro")
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

    console.log(`recebido o nome: ${nome}`)
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

    try {
        const pacienteSalvo = await novoPaciente.save();
        res.status(201).json(pacienteSalvo);
    } catch (error) {
        res.status(500);
        throw new Error('Não foi possivel cadastrar o paciente');
    }
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

module.exports = { getPacientes, getPacientesById, cadastrarPaciente };