import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Divider } from "@mui/material";

const RegistroForm = ({ open, handleClose, handleChange, handleSave, value, name, label }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    maxWidth="md" // Definindo um tamanho maior para o Dialog (pode usar 'sm', 'md', 'lg' ou 'xl')
    fullWidth // Para o Dialog ocupar toda a largura possível
  >
    <DialogTitle textAlign={"center"}>{`Registrar ${label}`}</DialogTitle>
    <Divider style={{ marginBottom: "14px" }} />
    <DialogContent style={{ minHeight: "190px" }}> {/* Aumentando o tamanho mínimo do DialogContent */}
      <TextField
        margin="dense"
        name={name}
        label={label}
        type="text"
        fullWidth
        value={value}
        onChange={handleChange}
        multiline // Permite múltiplas linhas no campo de texto
        rows={4} // Definindo um número maior de linhas
        InputProps={{
          style: {
            fontSize: "100%", // Aumentando o tamanho da fonte do input
            padding: "10px", // Adicionando mais espaço dentro do campo
          },
        }}
        style={{ fontSize: "20px" }} // Aumentando o tamanho do input geral
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Fechar
      </Button>
      <Button onClick={handleSave} color="primary">
        Salvar
      </Button>
    </DialogActions>
  </Dialog>
);

export default RegistroForm;
