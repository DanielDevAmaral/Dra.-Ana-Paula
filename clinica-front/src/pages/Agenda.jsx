import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AddAgenda from "../components/AddAgenda";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/pt-br';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Paper } from "@mui/material";

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const Agenda = () => {
  const { id: pacienteId } = useParams();
  const [events, setEvents] = useState([]); // Estado para armazenar os eventos da agenda
  const [updater, setUpdater] = useState([]); // Usado para forçar a re-renderização quando há novos eventos
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => setModalOpen(false);

  const handleSubmitForm = async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/agenda/${pacienteId}`, // Endpoint para adicionar eventos
        formData,
        { validateStatus: (status) => status >= 200 && status < 300 }
      );
      setUpdater(response);
      setEvents((prevEvents) => [...prevEvents, response.data]); // Atualiza a agenda dinamicamente
      setModalOpen(false);
      Swal.fire({
        title: "Evento registrado com sucesso",
        text: `Todos os dados foram registrados.`,
        icon: "success",
        confirmButtonColor: "#945E62",
      });
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      let errorMessage = "Não foi possível registrar o evento.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        title: "Erro ao registrar evento!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#945E62",
      }).then(() => {
        setModalOpen(false);
      });
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/agenda/${pacienteId}`
        );
        setEvents(data); // Carrega os eventos da agenda
      } catch (error) {
        console.error("Erro ao buscar os dados da agenda:", error);
      }
    };

    fetchEvents();
  }, [updater]);

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
      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Paper>
    </div>
  );
};

export default Agenda;
