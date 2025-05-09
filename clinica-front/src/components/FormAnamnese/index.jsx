import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import "./FormAnamnese.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "34px",
  overflowY: "auto",
};

const FormAnamnese = ({ open, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    comorbidade: "",
    lesao: [{ local: "", etiologia: "", tamanho: "", profundidade: "", borda: "", exudato: "", quantidadeEx: "", perilesao: "" }],
    conduta: [{ desbridamento: "", limpeza: "", protecao: "", cobertura: "", fixacao: "", troca: "", terapia: false }],
    plano: "",
    esporte: false,
    alergia: [""],
    gravidez: false,
    amamenta: false,
    fumo: false,
    observacao: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleAlergiaChange = (index, value) => {
    const newalergia = [...formData.alergia];
    newalergia[index] = value;
    setFormData({ ...formData, alergia: newalergia });
  };


  const addArrayItem = (arrayName, newItem) => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], newItem] });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2>Anamnese</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Campos Gerais da Anamnese */}
          <TextField
            label="Comorbidade"
            name="comorbidade"
            value={formData.comorbidade}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Plano"
            name="plano"
            value={formData.plano}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControlLabel
            control={<Checkbox checked={formData.esporte} onChange={handleChange} name="esporte" />}
            label="Pratica Esporte"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.gravidez} onChange={handleChange} name="gravidez" />}
            label="Está Grávida"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.amamenta} onChange={handleChange} name="amamenta" />}
            label="Amamenta"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.fumo} onChange={handleChange} name="fumo" />}
            label="Fuma"
          />
          {formData.alergia.map((alergia, index) => (
            <TextField
              key={index}
              label={`Alergia ${index + 1}`}
              value={alergia}
              onChange={(e) => handleAlergiaChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
          ))}
          <IconButton onClick={() => addArrayItem("alergia", "")}>
            <Add /> Adicionar Alergia
          </IconButton>

          {/* Lesões */}
          <h2>Detalhes da Lesão</h2>
          {formData.lesao.map((lesao, index) => (
            <div key={index}>
              <TextField
                label={`Local da Lesão ${index + 1}`}
                value={lesao.local}
                onChange={(e) => handleArrayChange(index, "local", e.target.value, "lesao")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Etiologia"
                value={lesao.etiologia}
                onChange={(e) => handleArrayChange(index, "etiologia", e.target.value, "lesao")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Tamanho"
                value={lesao.tamanho}
                onChange={(e) => handleArrayChange(index, "tamanho", e.target.value, "lesao")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Profundidade"
                value={lesao.profundidade}
                onChange={(e) => handleArrayChange(index, "profundidade", e.target.value, "lesao")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Característica da Borda"
                value={lesao.borda}
                onChange={(e) => handleArrayChange(index, "borda", e.target.value, "lesao")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Exudato"
                value={lesao.exudato}
                onChange={(e) => handleArrayChange(index, "exudato", e.target.value, "lesao")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Quantidade de Exudato"
                value={lesao.quantidadeEx}
                onChange={(e) => handleArrayChange(index, "quantidadeEx", e.target.value, "lesao")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Perilesão"
                value={lesao.perilesao}
                onChange={(e) => handleArrayChange(index, "perilesao", e.target.value, "lesao")}
                fullWidth
                margin="normal"
                required
              />
              {/* Botão para adicionar nova lesão */}
              <IconButton onClick={() => addArrayItem("lesao", { local: "", etiologia: "", tamanho: "", profundidade: "", borda: "", exudato: "", quantidadeEx: "", perilesao: "" })}>
                <Add /> Adicionar Lesão
              </IconButton>
            </div>
          ))}

          {/* Condutas */}
          <h2>Orientações de Lesão</h2>
          {formData.conduta.map((conduta, index) => (
            <div key={index}>
              <TextField
                label={`Desbridamento ${index + 1}`}
                value={conduta.desbridamento}
                onChange={(e) => handleArrayChange(index, "desbridamento", e.target.value, "conduta")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Limpeza"
                value={conduta.limpeza}
                onChange={(e) => handleArrayChange(index, "limpeza", e.target.value, "conduta")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Proteção"
                value={conduta.protecao}
                onChange={(e) => handleArrayChange(index, "protecao", e.target.value, "conduta")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Cobertura"
                value={conduta.cobertura}
                onChange={(e) => handleArrayChange(index, "cobertura", e.target.value, "conduta")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Fixação"
                value={conduta.fixacao}
                onChange={(e) => handleArrayChange(index, "fixacao", e.target.value, "conduta")}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Determine o periodo de Troca"
                value={conduta.troca}
                onChange={(e) => handleArrayChange(index, "troca", e.target.value, "conduta")}
                fullWidth
                margin="normal"
                required
              />
              <FormControlLabel
                control={<Checkbox checked={conduta.terapia} onChange={(e) => handleArrayChange(index, "terapia", e.target.checked, "conduta")} />}
                label="Terapia Adjuvante"
              />
              {/* Botão para adicionar nova conduta */}
              <IconButton onClick={() => addArrayItem("conduta", { desbridamento: "", limpeza: "", protecao: "", cobertura: "", fixacao: "", troca: "", terapia: false })}>
                <Add /> Adicionar Conduta
              </IconButton>
            </div>
          ))}
          <TextField
            label="Observação"
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            fullWidth
            multiline
            maxRows={6}
            margin="normal"
          />
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
            Salvar Anamnese
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default FormAnamnese;