const asyncHandler = require('../middleware/asyncHandler.js');
const Agenda = require('../models/Agenda.js');

// @desc Fetch all Eventos
// @route GET /api/agenda
// @access public
const getAgenda = asyncHandler(async (req, res) => {
    const agenda = await Agenda.find({}).populate('paciente', 'nome'); // Popula o campo paciente com o nome

    if (agenda.length > 0) {
        // Formata os dados para o React Big Calendar
        const eventosFormatados = agenda.map(evento => ({
            id: evento.id,
            title: evento.desc || 'Consulta', // Corrigido para 'desc'
            start: evento.start, // Uso direto dos campos start e end
            end: evento.end,
            paciente: evento.paciente,
            color: evento.color,
            tipo: evento.tipo,
        }));

        res.json(eventosFormatados);
    } else {
        res.status(404);
        throw new Error('Nenhum evento encontrado');
    }
});

// @desc Adicionar novo Evento
// @route POST /api/agenda
// @access public
const cadastrarAgenda = asyncHandler(async (req, res) => {
    // Extraindo os campos do corpo da requisição
    const { start, end, desc, color, tipo, paciente } = req.body;

    // Validação dos campos obrigatórios
    if (!start || !end || !desc) { // Corrigido para incluir desc
        res.status(400);
        throw new Error('Preencha todos os campos obrigatórios 🔎');
    }

    // Cria um novo Evento com os campos extraídos
    const novoEvento = new Agenda({
        start,
        end,
        desc,
        color,
        tipo,
        paciente,
    });

    // Salvando o Evento no banco de dados
    const eventoSalvo = await novoEvento.save();

    // Enviando sinal para o terminal
    console.log("Evento adicionado com sucesso");

    // Retorna o Evento cadastrado com sucesso
    res.status(200).json(eventoSalvo);
});

// @desc Atualizar Evento
// @route PUT /api/agenda/:id
// @access public
const atualizarAgenda = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { start, end, desc, color, tipo, paciente } = req.body;

    // Busca o evento pelo ID
    const evento = await Agenda.findById(id);

    if (!evento) {
        res.status(404);
        throw new Error('Evento não encontrado');
    }

    if (!start || !end || !tipo) {
        res.status(404);
        throw new Error('Preencha todos os campos obrigatórios 🔎');
    }

    // Atualiza os campos do evento
    evento.start = start || evento.start;
    evento.end = end || evento.end;
    evento.desc = desc || evento.desc;
    evento.color = color || evento.color;
    evento.tipo = tipo || evento.tipo;
    evento.paciente = paciente || evento.paciente;

    // Salva as atualizações
    const eventoAtualizado = await evento.save();
    res.json(eventoAtualizado);
});

// @desc Fetch Agenda by Id
// @route GET /api/agenda/:id
// @access public
const getAgendaById = asyncHandler(async (req, res) => {
    const agenda = await Agenda.findById(req.params.id).populate('paciente', 'nome');

    if (agenda) {
       return res.json(agenda);
    } else {
        res.status(404);
        throw new Error('Consulta não encontrada');
    }
});

// @desc Remover Agenda by Id
// @route DELETE /api/agenda/:id
// @access public
const removerAgendaById = asyncHandler(async (req, res) => {
    const agenda = await Agenda.findById(req.params.id);
    
    if (!agenda) {
        res.status(404);
        throw new Error('Evento não encontrado');
    }

    await agenda.deleteOne();
    res.json({ message: 'Evento removido com sucesso' });
});

module.exports = { getAgenda, cadastrarAgenda, getAgendaById, removerAgendaById, atualizarAgenda };
 