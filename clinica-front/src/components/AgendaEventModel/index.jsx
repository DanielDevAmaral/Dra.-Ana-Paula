import React, { useState } from "react";
import {
  Modal,
  Box,
  Grid,
  Divider,
  Paper,
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
  height: "84vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "34px",
  overflowY: "auto",
};

const AgendaEventModel = ({ evento, open, onClose, onDelete, onEdit, pacientes }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: evento.title,
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
    onEdit({ ...formData, id: evento.id }); // Adiciona o ID do evento ao formData
    setEditMode(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{marginBottom: '10px'}}>
            {editMode ? "Editar Consulta" : evento.title}
          </Typography >
          <IconButton onClick={onClose} sx={{marginBottom: '10px'}}>
            <CloseIcon />
          </IconButton>
        </Box>

        {editMode ? (
          // Formulário de edição
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
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
                <MenuItem value="blue" style={{ color: "blue" }}>
                  Azul
                </MenuItem>
                <MenuItem value="yellow" style={{ color: "yellow" }}>
                  Amarelo
                </MenuItem>
                <MenuItem
                  value="rgba(255, 0, 0, 0.6)"
                  style={{ color: "rgba(255, 0, 0, 0.6)" }}
                >
                  Vermelho
                </MenuItem>
                <MenuItem value="lightGreen" style={{ color: "lightgreen" }}>
                  Verde
                </MenuItem>
                <MenuItem value="purple" style={{ color: "purple" }}>
                  Roxo
                </MenuItem>
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
            <FormControl fullWidth margin="normal">
            <InputLabel>Paciente</InputLabel>
            <Select
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
              label="Paciente"
            >
              <MenuItem value="">Nenhum</MenuItem>
              {pacientes.map((paciente) => (
                <MenuItem key={paciente._id} value={paciente._id}>
                  {paciente.nome}
                </MenuItem>
              ))}
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
          {/* Grid for event details */}
          <Grid container spacing={2} justifyContent="center">
            {/* Event timing details */}
            <Grid item xs={6}>
              <Paper elevation={2} sx={{ padding: "16px", borderRadius: "8px", height: '100%' }}>
                <Typography variant="h6" sx={{fontWeight: 'bold' }}>Marcação</Typography>
                <Divider sx={{ borderColor: "#A77E81", marginBottom: "12px" }} />
                <Typography variant="body1">
                  Data Início: {new Date(evento.start).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Horário Início: {new Date(evento.start).toLocaleTimeString()}
                </Typography>
                <Typography variant="body1">
                  Data Fim: {new Date(evento.end).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Horário Fim: {new Date(evento.end).toLocaleTimeString()}
                </Typography>
              </Paper>
            </Grid>
    
            {/* Patient name */}
            <Grid item xs={6}>
              <Paper elevation={2} sx={{ padding: "16px", borderRadius: "8px", height: '100%' }}>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>Paciente</Typography>
                <Divider sx={{ borderColor: "#A77E81", marginBottom: "12px" }} />
                <Typography variant="body1" color="primary">
                  {evento.paciente.nome}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
    
          {/* Event description */}
          <Grid container spacing={0} justifyContent="center" mt={2}>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                elevation={0}
                sx={{
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  height: "180px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  border: "1px solid #A77E81",
                }}
              >
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>Descrição</Typography>
                <Divider sx={{ borderColor: "#A77E81", marginBottom: "12px" }} />
                <Typography variant="body1">
                  {evento.desc}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
    
          {/* Edit and delete actions */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <IconButton onClick={handleEdit} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(evento._id.$oid)} color="error">
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
