// AgendaCalendar.js
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import AgendaEventModel from "../AgendaEventModel";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./AgendaCalendar.css";
import { Paper } from "@mui/material";

const DragAndDropCalendar = withDragAndDrop(Calendar);
moment.locale("pt-br");
const localizer = momentLocalizer(moment);

function AgendaCalendar({ eventos, onEventChange }) {
    const [selectedEvento, setSelectedEvento] = useState(null);

    const handleEventClick = (evento) => setSelectedEvento(evento);

    const handleEventClose = () => setSelectedEvento(null);

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
                    onEventDrop={onEventChange}
                    onEventResize={onEventChange}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventoStyleColor}
                    className="calendar"
                />
            </Paper>
            {selectedEvento && (
                <AgendaEventModel
                    evento={selectedEvento}
                    onClose={handleEventClose}
                />
            )}
        </div>
    );
}

export default AgendaCalendar;
