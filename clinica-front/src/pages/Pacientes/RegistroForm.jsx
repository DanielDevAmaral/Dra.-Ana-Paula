import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

const RegistroForm = ({ open, handleClose, handleChange, handleSave, value, name, label }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{`Registrar ${label}`}</DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        name={name}
        label={label}
        type="text"
        fullWidth
        value={value}
        onChange={handleChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">
        Cancelar
      </Button>
      <Button onClick={handleSave} color="primary">
        Salvar
      </Button>
    </DialogActions>
  </Dialog>
);

export default RegistroForm;