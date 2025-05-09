import React from "react";
import { Button, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import FormAnamnese from "../FormAnamnese";
import "./AddAnamnese.css";

const AddAnamnese = ({ handleSubmit, open, setModalOpen, handleClose, pacienteDados }) => {
  const anamneses = pacienteDados?.anamnese || [];
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)} // Usa a função passada do componente principal
        startIcon={
          <IconButton>
            <Add sx={{ color: "#fff" }} /> {/* Ícone de + estilizado */}
          </IconButton>
        }
        sx={{
          borderRadius: "34px", // Fundo arredondado
          padding: "5px 10px",
          textTransform: "none", // Remove a capitalização automática
          backgroundColor: "#A77E81", // Cor de fundo personalizada
          "&:hover": {
            backgroundColor: "#945E62", // Cor ao passar o mouse
          },
        }}
      >
        {anamneses.length > 0 ? (
          <p className="butt-add-paciente">Atualizar Anamnese</p>
        ) : (
          <p className="butt-add-paciente">Registrar Anamnese</p>
        )}
      </Button>

      <FormAnamnese
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddAnamnese;
