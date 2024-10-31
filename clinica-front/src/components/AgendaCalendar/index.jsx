// AgendaCalendar.jsx

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import AgendaEventModel from "../AgendaEventModel";
import axios from "axios";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./AgendaCalendar.css";
import { Paper } from "@mui/material";

const DragAndDropCalendar = withDragAndDrop(Calendar);
moment.locale("pt-br");
const localizer = momentLocalizer(moment);

function AgendaCalendar({ eventos, setEventos, onEventChange }) {
    const [selectedEvento, setSelectedEvento] = useState(null);
    const [pacientes, setPacientes] = useState([]);

    const handleEventClick = (evento) => setSelectedEvento(evento);
    const handleEventClose = () => setSelectedEvento(null);

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/agenda/${id}`);
            
            setEventos((prevEventos) => prevEventos.filter((evento) => evento.id !== id));
            setSelectedEvento(null);
    
            // Exibe a mensagem de sucesso com SweetAlert2
            Swal.fire({
                title: "Evento excluído com sucesso!",
                text: "O evento foi removido da agenda.",
                icon: "success",
                confirmButtonColor: "#945E62",
            });
        } catch (error) {
            console.error("Erro ao excluir o evento:", error);
            Swal.fire({
                title: "Erro ao excluir evento!",
                text: "Ocorreu um erro ao tentar excluir o evento. Tente novamente.",
                icon: "error",
                confirmButtonColor: "#945E62",
            });
        }
    };

    const handleEditEvent = async (updatedEvento) => {
        try {
            const { id, title, start, end, desc, color, tipo, paciente } = updatedEvento;
            const response = await axios.put(`http://localhost:8000/api/agenda/${id}`, {
                id,
                title,
                start,
                end,
                desc,
                color,
                tipo,
                paciente,
            });
    
            setEventos((prevEventos) =>
                prevEventos.map((evento) => (evento.id === id ? response.data : evento))
            );
            setSelectedEvento(null);
    
            // Exibe a mensagem de sucesso com SweetAlert2
            Swal.fire({
                title: "Evento alterado com sucesso!",
                text: "As alterações foram salvas.",
                icon: "success",
                confirmButtonColor: "#945E62",
            });
        } catch (error) {
            console.error("Erro ao editar o evento:", error);
            Swal.fire({
                title: "Erro ao editar evento!",
                text: "Ocorreu um erro ao tentar editar o evento. Tente novamente.",
                icon: "error",
                confirmButtonColor: "#945E62",
            });
        }
    };

    const eventoStyleColor = (evento) => ({
        style: {
            backgroundColor: evento.color,
        },
    });

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

    return (
        <div>
            <Paper
                variant="outlined"
                elevation={0}
                sx={{
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <DragAndDropCalendar
                    defaultDate={moment().toDate()}
                    defaultView="month"
                    events={eventos}
                    localizer={localizer}
                    selectable
                    resizable
                    onEventDrop={onEventChange}   // Evento de arrastar
                    onEventResize={onEventChange}  // Evento de redimensionar
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventoStyleColor}
                    className="calendar"
                />
            </Paper>
            {selectedEvento && (
                <AgendaEventModel
                    evento={selectedEvento}
                    open={Boolean(selectedEvento)}
                    onClose={handleEventClose}
                    onDelete={() => handleDeleteEvent(selectedEvento.id)}
                    onEdit={handleEditEvent}
                    pacientes={pacientes}
                />
            )}
        </div>
    );
}

export default AgendaCalendar;
