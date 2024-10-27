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

    const handleCloseModal = () => setModalOpen(false);

    // Função para registrar um novo evento
    const handleSubmitForm = async (formData) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/agenda`, // URL corrigida
                { ...formData, paciente: pacienteId }
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

    // Função para atualizar um evento existente
    const handleEventChange = async ({ start, end, event }) => {
        const updatedEvent = { ...event, start, end };
        console.log(event)
    
        if (!event.id) { 
            console.error("ID do evento não encontrado.");
            return;
        }
    
        try {
            const response = await axios.put(`/api/agenda/${event.id}`, updatedEvent); // Confirme se `event.id` está correto
    
            if (response.status === 200) {
                setEvents((prevEvents) =>
                    prevEvents.map((ev) => (ev.id === event.id ? updatedEvent : ev))
                );
            } else {
                console.error("Erro ao atualizar o evento:", response.statusText);
            }
        } catch (error) {
            console.error("Erro na requisição de atualização do evento:", error);
        }
    };

    // Função para buscar todos os eventos de um paciente específico
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/api/agenda?paciente=${pacienteId}`
                );
                setEvents(data);
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
                />
            </div>
            <AgendaCalendar eventos={events} onEventChange={handleEventChange} />
        </div>
    );
};

export default Agenda;
