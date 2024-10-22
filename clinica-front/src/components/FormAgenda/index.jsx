import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
} from '@mui/material';
import './FormAgenda.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '34px',
  overflowY: 'auto',
};

const FormAgenda = ({ open, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    data: '',
    horarioInicio: '',
    horarioFim: '',
    comentarios: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
            label="Data"
            name="data"
            type="date"
            value={formData.data}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Horário de Início"
            name="horarioInicio"
            type="time"
            value={formData.horarioInicio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Horário de Fim"
            name="horarioFim"
            type="time"
            value={formData.horarioFim}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Comentários"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: '34px',
              backgroundColor: '#A77E81',
              '&:hover': { backgroundColor: '#945E62' },
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
