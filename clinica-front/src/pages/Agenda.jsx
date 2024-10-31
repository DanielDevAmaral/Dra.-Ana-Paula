// Agenda.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AddAgenda from "../components/AddAgenda";
import AgendaCalendar from "../components/AgendaCalendar";

const Agenda = () => {
    const { id: pacienteId } = useParams();
    const [events, setEvents] = useState([]);
    const [updater, setUpdater] = useState([]); // Controle de atualização do estado
    const [isModalOpen, setModalOpen] = useState(false);
    const [pacientes, setPacientes] = useState([]);

    const handleCloseModal = () => setModalOpen(false);

    // Função para registrar um novo evento
    const handleSubmitForm = async (formData) => {
        try {
            // Verifique se o campo paciente está sendo passado como esperado
            const response = await axios.post(
                `http://localhost:8000/api/agenda`,
                { ...formData, paciente: formData.paciente || null } // Adicione o paciente como null se não selecionado
            );
    
            // Atualiza a lista de eventos com o novo evento
            setEvents((prevEvents) => [...prevEvents, response.data]);
            setUpdater((prevUpdater) => !prevUpdater); // Força atualização
            setModalOpen(false); // Fecha o modal após o sucesso
    
            Swal.fire({
                title: "Evento registrado com sucesso",
                text: `Todos os dados foram registrados.`,
                icon: "success",
                confirmButtonColor: "#945E62",
            });
        } catch (error) {
            let errorMessage = "Não foi possível registrar o evento.";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                title: "Erro ao registrar evento!",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#945E62",
            }).then(() => setModalOpen(false));
        }
    };

    const handleEventChange = async ({ event, start, end }) => {
        if (!event.id) {
            console.error("ID do evento não encontrado.");
            return;
        }
    
        const updatedEvent = { ...event, start, end }; // Atualize o evento com os novos horários
    
        try {
            const response = await axios.put(`http://localhost:8000/api/agenda/${event.id}`, updatedEvent);
            
            if (response.status === 200) {
                setEvents((prevEvents) =>
                    prevEvents.map((ev) => (ev.id === event.id ? { ...ev, start, end } : ev))
                );
            } else {
                console.error("Erro ao atualizar o evento:", response.statusText);
            }
        } catch (error) {
            console.error("Erro na requisição de atualização do evento:", error);
        }
    };

    useEffect(() => {
        const fetchPacientes = async () => {
          try {
            // Requisição à API para obter os pacientes
            const { data } = await axios.get("http://localhost:8000/api/pacientes");
            setPacientes(data);
          } catch (error) {
            console.error("Erro ao buscar os pacientes:", error);
          }
        };
    
        fetchPacientes();
      }, []);

    // Função para buscar todos os eventos de um paciente específico
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/agenda`);
        
                // Filter out invalid events and ensure `start` and `end` are valid Date objects
                const validEvents = data
                    .filter(event => event.start && event.end)
                    .map(event => ({
                        ...event,
                        start: new Date(event.start),
                        end: new Date(event.end),
                    }));
                
                console.log(validEvents);
                
                setEvents(validEvents);
            } catch (error) {
                console.error("Erro ao buscar os dados da agenda:", error);
            }
        };
        
        fetchEvents();
    }, [updater, pacienteId]);
    

    return (
        <div className="agenda-container">
            <div className="header-agenda">
                <AddAgenda
                    handleSubmit={handleSubmitForm}
                    open={isModalOpen}
                    setModalOpen={setModalOpen}
                    handleClose={handleCloseModal}
                    pacientes={pacientes}
                />
            </div>
            <AgendaCalendar eventos={events} onEventChange={handleEventChange} setEventos={setEvents}/>
        </div>
    );
};

export default Agenda;
