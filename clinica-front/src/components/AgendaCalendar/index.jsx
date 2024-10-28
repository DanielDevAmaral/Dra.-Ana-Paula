// AgendaCalendar.jsx

import React, { useState } from "react";
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

    const handleEventClick = (evento) => setSelectedEvento(evento);
    const handleEventClose = () => setSelectedEvento(null);

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/agenda/${id}`);
            setEventos((prevEventos) => prevEventos.filter((evento) => evento.id !== id));
            setSelectedEvento(null);
        } catch (error) {
            console.error("Erro ao excluir o evento:", error);
            alert("Ocorreu um erro ao tentar excluir o evento. Tente novamente.");
        }
    };

    const handleEditEvent = async (updatedEvento) => {
        try {
            const { id, start, end, desc, color, tipo, paciente } = updatedEvento;
            const response = await axios.put(`http://localhost:8000/api/agenda/${id}`, {
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
        } catch (error) {
            console.error("Erro ao editar o evento:", error);
            alert("Ocorreu um erro ao tentar editar o evento. Tente novamente.");
        }
    };

    const eventoStyleColor = (evento) => ({
        style: {
            backgroundColor: evento.color,
        },
    });

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
                />
            )}
        </div>
    );
}

export default AgendaCalendar;
