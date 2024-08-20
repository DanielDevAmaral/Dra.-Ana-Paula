import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
} from "@mui/material";

const Prontuario = () => {
  const { pacienteId } = useParams();
  const [anamnesisData, setAnamnesisData] = useState({
    comorbidades: "",
    localLesao: "",
    etiologia: "",
    tamanhoLesao: "",
    profundidadeLesao: "",
    bordasMargens: "",
    exsudato: "",
    quantidadeExsudato: "",
    perilesao: "",
    planoTerapeutico: "",
    tecidosPresentes: {
        Necrose: "",
        NecroseLiquefacao: "",
        Esfacelo: "",
        Fibrina: "",
        Granulacao: "",
        Epitelizacao: "",
    },
    conduta: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ open: false, type: "", message: "" });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchAnamnesisData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/pacientes/${pacienteId}/anamnesis`);
        const anamnesis = response.data.anamnesis[0] || {}; 
        setAnamnesisData(anamnesis);
      } catch (error) {
        setFeedback({ open: true, type: "error", message: "Erro ao buscar dados do prontuário" });
      } finally {
        setLoading(false);
      }
    };
    fetchAnamnesisData();
  }, [pacienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Verifica se o campo é um subcampo dentro de tecidosPresentes
    if (name in anamnesisData.tecidosPresentes) {
      setAnamnesisData((prev) => ({
        ...prev,
        tecidosPresentes: {
          ...prev.tecidosPresentes,
          [name]: value,
        },
      }));
    } else {
      setAnamnesisData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        await axios.post(`http://localhost:5000/pacientes/${pacienteId}/anamnesis`, { anamnesisData });
        setFeedback({ open: true, type: "success", message: "Anamnese salva com sucesso" });
    } catch {
        setFeedback({ open: true, type: "error", message: "Erro ao salvar anamnese" });
    } finally {
        setLoading(false);
    }
  };

  const renderSelect = (name, label, options) => (
    <FormControl margin="dense" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={anamnesisData[name]}
        onChange={handleChange}
        label={label}
        fullWidth
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div>
      <h1>Prontuário do Paciente</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
      >
        Fazer Anamnese
      </Button>
      <div className="dados-gerais-container">
        <p className="header">DADOS GERAIS</p>
        <div className="data">
          <ol>
            <li className="data-item">LOCALIZAÇÃO DA LESÃO: {anamnesisData.localLesao}</li>
            <li className="data-item">ETIOLOGIA DA LESÃO: {anamnesisData.etiologia}</li>
            <li className="data-item">TAMANHO DA LESÃO: {anamnesisData.tamanhoLesao}</li>
            <li className="data-item">PROFUNDIDADE DA LESÃO: {anamnesisData.profundidadeLesao}</li>
            <li className="data-item">BORDAS E MARGENS: {anamnesisData.bordasMargens}</li>
            <li className="data-item">TIPO DE EXSUDATO: {anamnesisData.exsudato}</li>
            <li className="data-item">QUANTIDADE DE EXSUDATO: {anamnesisData.quantidadeExsudato}</li>
            <li className="data-item">PERILESÃO: {anamnesisData.perilesao}</li>
          </ol>
        </div>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Fazer Anamnese</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              margin="dense"
              name="comorbidades"
              label="Comorbidades"
              type="text"
              fullWidth
              value={anamnesisData.comorbidades}
              onChange={handleChange}
            />
            {renderSelect("etiologia", "Etiologia da Lesão", ["LPP", "Lesão Traumatica", "Deisciência", "Úlcera Diabética", "Úlcera Venosa", "Úlcera Arterial", "Lesão Tumoral", "Outros"])}
            <TextField
              margin="dense"
              name="tamanhoLesao"
              label="Tamanho da Lesão (Comprimento x Largura cm²)"
              type="text"
              fullWidth
              value={anamnesisData.tamanhoLesao}
              onChange={handleChange}
            />
            {renderSelect("profundidadeLesao", "Profundidade", ["Tecido Danificado sem rompimento de epiderme", "Superficial", "Profunda com acometimento de tecido adjacentes", "Não classificável", "Acometimentos de estruturas de suporte (tendões, articulações)", "Epitelizada", "Cicatrizada"])}

            <TextField
              margin="dense"
              name="planoTerapeutico"
              label="Plano Terapêutico"
              type="text"
              fullWidth
              value={anamnesisData.planoTerapeutico}
              onChange={handleChange}
            />
            
            <TextField
              margin="dense"
              name="conduta"
              label="Conduta"
              type="text"
              fullWidth
              value={anamnesisData.conduta}
              onChange={handleChange}
            />

            <FormControl margin="dense" fullWidth>
              <InputLabel>Tecidos Presentes</InputLabel>
              <Select
                multiple
                name="tecidosPresentes"
                value={Object.keys(anamnesisData.tecidosPresentes).filter(tecido => anamnesisData.tecidosPresentes[tecido])}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                label="Tecidos Presentes"
                fullWidth
              >
                {["Necrose", "NecroseLiquefacao", "Esfacelo", "Fibrina", "Granulacao", "Epitelizacao"].map((tecido) => (
                  <MenuItem key={tecido} value={tecido}>
                    <Checkbox
                      checked={!!anamnesisData.tecidosPresentes[tecido]}
                      onChange={(e) => handleChange({ target: { name: tecido, value: e.target.checked ? tecido : "" } })}
                    />
                    {tecido}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {renderSelect("bordasMargens", "Bordas / Margens", ["Aderidas", "Não aderidas", "Descoladas", "Com presença de Epitelização"])}
            {renderSelect("exsudato", "Exsudato", ["Seroso", "Serosanguinolento", "Purulento", "Quantidade"])}
            {renderSelect("perilesao", "Perilesão", ["Eritema", "Edema", "Dermatite", "Maceração", "Induração", "Ressecamento", "Descamação", "Sensibilidade", "Ausência de pelos"])}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Salvar Anamnese"}
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={() => setFeedback({ open: false, type: "", message: "" })}
      >
        <Alert onClose={() => setFeedback({ open: false, type: "", message: "" })} severity={feedback.type}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Prontuario;
