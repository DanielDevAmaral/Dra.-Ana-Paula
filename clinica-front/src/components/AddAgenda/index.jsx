import React from 'react';
import { Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import FormAgenda from '../FormAgenda';
import './AddAgenda.css';

const AddAgenda = ({ handleSubmit, open, setModalOpen, handleClose, pacientes }) => {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)} // Abre o modal para adicionar evento
        startIcon={
          <IconButton>
            <Add sx={{ color: '#fff' }} />
          </IconButton>
        }
        sx={{
          marginBottom: 3,
          borderRadius: '34px',
          padding: '5px 10px',
          textTransform: 'none',
          backgroundColor: '#A77E81',
          '&:hover': {
            backgroundColor: '#945E62',
          },
        }}
      >
        <p className="butt-add-event" style={{margin: 'auto'}}>Adicionar Consulta</p>
      </Button>

      {/* Formulário para o Modal */}
      <FormAgenda
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        pacientes={pacientes}
      />
    </div>
  );
};

export default AddAgenda;
