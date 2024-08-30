import React from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import InputMask from "react-input-mask";

const PacienteForm = ({ newPaciente, handleChange }) => {
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const today = new Date();

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        name="nomePaciente"
        label="Nome do Paciente"
        type="text"
        fullWidth
        value={newPaciente.nomePaciente}
        onChange={handleChange}
      />
      <InputMask
        mask="(99) 99999-9999"
        value={newPaciente.telefonePaciente}
        onChange={handleChange}
      >
        {() => (
          <TextField
            margin="dense"
            name="telefonePaciente"
            label="Telefone do Paciente"
            type="text"
            fullWidth
            value={newPaciente.telefonePaciente}
          />
        )}
      </InputMask>
      <TextField
        margin="dense"
        name="emailPaciente"
        label="Email do Paciente"
        type="email"
        fullWidth
        value={newPaciente.emailPaciente}
        onChange={handleChange}
      />
      <FormControl margin="dense" fullWidth>
        <InputLabel>Tipo Sanguíneo</InputLabel>
        <Select
          name="tipoSanguineo"
          value={newPaciente.tipoSanguineo}
          onChange={handleChange}
          label="Tipo Sanguíneo"
          fullWidth
        >
          {bloodTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        name="dataNascimento"
        label="Data de Nascimento"
        type="date"
        fullWidth
        value={newPaciente.dataNascimento}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: "1900-01-01",
          max: today.toISOString().split("T")[0],
        }}
      />
      <TextField
        margin="dense"
        name="enderecoPaciente"
        label="Endereço do Paciente"
        type="text"
        fullWidth
        value={newPaciente.enderecoPaciente}
        onChange={handleChange}
      />
      <InputMask
        mask="999.999.999-99"
        value={newPaciente.cpfPaciente}
        onChange={handleChange}
      >
        {() => (
          <TextField
            margin="dense"
            name="cpfPaciente"
            label="CPF do Paciente"
            type="text"
            fullWidth
            value={newPaciente.cpfPaciente}
          />
        )}
      </InputMask>
      <TextField
        margin="dense"
        name="nomeFamiliar"
        label="Nome do Familiar"
        type="text"
        fullWidth
        value={newPaciente.nomeFamiliar}
        onChange={handleChange}
      />
      <InputMask
        mask="(99) 99999-9999"
        value={newPaciente.telefoneFamiliar}
        onChange={handleChange}
      >
        {() => (
          <TextField
            margin="dense"
            name="telefoneFamiliar"
            label="Telefone do Familiar"
            type="text"
            fullWidth
            value={newPaciente.telefoneFamiliar}
          />
        )}
      </InputMask>
      <TextField
        margin="dense"
        name="emailFamiliar"
        label="Email do Familiar"
        type="email"
        fullWidth
        value={newPaciente.emailFamiliar}
        onChange={handleChange}
      />
    </>
  );
};

export default PacienteForm;