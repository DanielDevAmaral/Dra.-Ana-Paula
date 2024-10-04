import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import InputMask from "react-input-mask";
import { Add } from "@mui/icons-material";
import axios from "axios";
import "./FormPaciente.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: "80vh", // Define uma altura fixa para o modal
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "34px",
  overflowY: "auto", // Adiciona uma barra de rolagem
};

const FormModal = ({ open, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    nome: "",
    numero: "",
    email: "",
    nascimento: "",
    cpf: "",
    endereco: "",
    sexo: "",
    medicamentos: [""],
    peso: 0.0,
    altura: 0.0,
    profissao: "",
    familia: [{ nome: "", numero: "", email: "", endereco: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMedicamentoChange = (index, value) => {
    const newMedicamentos = [...formData.medicamentos];
    newMedicamentos[index] = value;
    setFormData({ ...formData, medicamentos: newMedicamentos });
  };

  const handleFamiliaChange = (index, field, value) => {
    const newFamilia = [...formData.familia];
    newFamilia[index][field] = value;
    setFormData({ ...formData, familia: newFamilia });
  };

  const addMedicamento = () => {
    setFormData({ ...formData, medicamentos: [...formData.medicamentos, ""] });
  };

  const addFamilia = () => {
    setFormData({
      ...formData,
      familia: [
        ...formData.familia,
        { nome: "", numero: "", email: "", endereco: "" },
      ],
    });
  };

  // Ao submeter o formulário, a função handleSubmit passada como prop será chamada
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Passa o formData para a função handleSubmit do componente pai
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Cadastro de Paciente</h2>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <InputMask
            mask="(99) 99999-9999" // Máscara para número de telefone no formato brasileiro
            value={formData.numero}
            onChange={handleChange}
          >
          {() => (
            <TextField
              label="Número de Telefone"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          )}
          </InputMask>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Data de Nascimento"
            name="nascimento"
            type="date"
            value={formData.nascimento}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <InputMask
            mask="999.999.999-99" // Máscara para número de telefone no formato brasileiro
            value={formData.cpf}
            onChange={handleChange}
          >
          {() => (<TextField
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />)}
          </InputMask>
          <TextField
            label="Endereço"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Sexo</InputLabel>
            <Select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              label="Sexo"
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
            </Select>
          </FormControl>
          {formData.medicamentos.map((medicamento, index) => (
            <TextField
              key={index}
              label={`Medicamento ${index + 1}`}
              value={medicamento}
              onChange={(e) => handleMedicamentoChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
          ))}
          <IconButton onClick={addMedicamento}>
            <Add /> Adicionar Medicamento
          </IconButton>
          <TextField
            label="Peso"
            name="peso"
            type="number"
            value={formData.peso}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Altura"
            name="altura"
            type="number"
            value={formData.altura}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Profissão"
            name="profissao"
            value={formData.profissao}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {formData.familia.map((membro, index) => (
            <div key={index}>
              <TextField
                label="Nome do Familiar"
                value={membro.nome}
                onChange={(e) =>
                  handleFamiliaChange(index, "nome", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número do Familiar"
                value={membro.numero}
                onChange={(e) =>
                  handleFamiliaChange(index, "numero", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email do Familiar"
                value={membro.email}
                onChange={(e) =>
                  handleFamiliaChange(index, "email", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Endereço do Familiar"
                value={membro.endereco}
                onChange={(e) =>
                  handleFamiliaChange(index, "endereco", e.target.value)
                }
                fullWidth
                margin="normal"
              />
            </div>
          ))}
          <IconButton onClick={addFamilia}>
            <Add /> Adicionar Membro da Família
          </IconButton>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: "34px",
              backgroundColor: "#A77E81", // Cor de fundo personalizada
              "&:hover": {
                backgroundColor: "#945E62", // Cor ao passar o mouse
              },
            }}
            onClick={handleSubmit}
          >
            Salvar Paciente
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default FormModal;
