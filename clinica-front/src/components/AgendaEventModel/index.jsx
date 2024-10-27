import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
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

const AgendaEventModel = ({ evento, open, onClose, onDelete, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    start: evento.start,
    end: evento.end,
    desc: evento.desc,
    color: evento.color,
    tipo: evento.tipo,
    paciente: evento.paciente,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => setEditMode(true);
  const handleSave = () => {
    onEdit(formData);
    setEditMode(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            {editMode ? "Editar Evento" : evento.title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {editMode ? (
          // Formulário de edição
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
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
                <MenuItem value="clearRed" style={{ color: "rgba(255, 0, 0, 0.6)" }}>Vermelho</MenuItem>
                <MenuItem value="lightGreen" style={{ color: "lightgreen" }}>Verde</MenuItem>
                <MenuItem value="lightPurple" style={{ color: "plum" }}>Roxo</MenuItem>
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
              Salvar Alterações
            </Button>
          </form>
        ) : (
          // Visualização do evento
          <>
            <Typography variant="body1" mt={2}>Descrição: {evento.desc}</Typography>
            <Typography variant="body2" color="textSecondary">
              Início: {new Date(evento.start).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Fim: {new Date(evento.end).toLocaleString()}
            </Typography>
            <Box mt={2} display="flex" justifyContent="space-between">
              <IconButton onClick={handleEdit} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(evento.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AgendaEventModel;
