import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, Divider } from "@mui/material";
import PacienteForm from "./PacienteForm";

const CadastrarPacienteDialog = ({ open, handleClose, handleChange, handleSubmit, loading, newPaciente }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle textAlign={"center"}>Cadastro de Paciente</DialogTitle>
    <Divider style={{ marginBottom: "14px" }} />
    <DialogContent>
      <PacienteForm newPaciente={newPaciente} handleChange={handleChange} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancelar
      </Button>
      <Button onClick={handleSubmit} color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Cadastrar"}
      </Button>
    </DialogActions>
  </Dialog>
);

export default CadastrarPacienteDialog;