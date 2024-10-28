import React, { useState } from "react";
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./FormAgenda.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "34px",
  overflowY: "auto",
};

const FormAgenda = ({ open, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    desc: "",
    color: "",
    tipo: "",
    paciente: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Envia os dados ao backend
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Marcar Consulta 🥳</h2>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Titulo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Inicio da Consulta"
            name="start"
            type="datetime-local"
            value={formData.start}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Fim da Consulta"
            name="end"
            type="datetime-local"
            value={formData.end}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Comentários"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Cor do Evento</InputLabel>
            <Select
              name="color"
              value={formData.color}
              onChange={handleChange}
              label="Cor do Evento"
            >
              <MenuItem value="blue" style={{ color: "blue" }}>Azul</MenuItem>
              <MenuItem value="yellow" style={{ color: "yellow" }}>Amarelo</MenuItem>
              <MenuItem value="rgba(255, 0, 0, 0.6)" style={{ color: "rgba(255, 0, 0, 0.6)" }}>Vermelho</MenuItem>
              <MenuItem value="lightGreen" style={{ color: "lightgreen" }}>Verde</MenuItem>
              <MenuItem value="purple" style={{ color: "purple" }}>Roxo</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Classificação</InputLabel>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              label="Classificação"
            >
              <MenuItem value="Retorno">Retorno</MenuItem>
              <MenuItem value="PrimeiraConsulta">Primeira Consulta</MenuItem>
              <MenuItem value="Emergencial">Emergencial</MenuItem>
              <MenuItem value="Avaliacao">Avaliação</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: "34px",
              backgroundColor: "#A77E81",
              "&:hover": { backgroundColor: "#945E62" },
            }}
          >
            Registrar Consulta
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default FormAgenda;
