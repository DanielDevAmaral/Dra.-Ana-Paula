import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import FormPaciente from '../FormPaciente';
import './AddPaciente.css'

const AddPaciente = ({ handleSubmit }) => {
  const [open, setOpen] = useState(false); // Controle do estado do modal

  const handleOpen = () => {
    setOpen(true); // Abre o modal ao clicar no botão
  };

  const handleClose = () => {
    setOpen(false); // Fecha o modal
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={
          <IconButton>
            <Add sx={{ color: '#fff' }} /> {/* Ícone de + estilizado */}
          </IconButton>
        }
        sx={{
          borderRadius: '34px', // Fundo arredondado
          padding: '5px 10px',
          textTransform: 'none', // Remove a capitalização automática
          backgroundColor: "#A77E81", // Cor de fundo personalizada
          "&:hover": {
            backgroundColor: "#945E62", // Cor ao passar o mouse
          },
        }}
      >
        <p className='butt-add-paciente'>Adicionar Paciente</p>
      </Button>

      <FormPaciente open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddPaciente;
