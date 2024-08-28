import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Grid,
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
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
    tecidosPresentes: [],
    conduta: "",
  });
  const [openPlanoForm, setOpenPlanoForm] = useState(false);
  const [openCondutaForm, setOpenCondutaForm] = useState(false);
  const [planosTerapeuticos, setPlanosTerapeuticos] = useState([]);
  const [condutas, setCondutas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [anamnesisExists, setAnamnesisExists] = useState(false);

  useEffect(() => {
    const fetchAnamnesisData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/pacientes/${pacienteId}/anamnesis`
        );
        const anamnesis = response.data.anamnesis?.[0] || {};
        setPlanosTerapeuticos(anamnesis.map(a => ({ plano: a.planoTerapeutico, dataRegistro: a.dataRegistroPlano })));
        setCondutas(anamnesis.map(a => ({ conduta: a.conduta, dataRegistro: a.dataRegistroConduta })));
        if (Object.keys(anamnesis).length > 0) {
          setAnamnesisExists(true);
        }
        setAnamnesisData({
          comorbidades: anamnesis.comorbidades || "",
          localLesao: anamnesis.localLesao || "",
          etiologia: anamnesis.etiologia || "",
          tamanhoLesao: anamnesis.tamanhoLesao || "",
          profundidadeLesao: anamnesis.profundidadeLesao || "",
          bordasMargens: anamnesis.bordasMargens || "",
          exsudato: anamnesis.exsudato || "",
          quantidadeExsudato: anamnesis.quantidadeExsudato || "",
          perilesao: anamnesis.perilesao || "",
          planoTerapeutico: anamnesis.planoTerapeutico || "",
          tecidosPresentes: anamnesis.tecidosPresentes || [],
          conduta: anamnesis.conduta || "",
        });
      } catch (error) {
        setFeedback({
          open: true,
          type: "error",
          message: "Erro ao buscar dados do prontuário",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAnamnesisData();
  }, [pacienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Se for o campo 'tecidosPresentes', tratamos como um array de múltiplos valores
    if (name === "tecidosPresentes") {
      setAnamnesisData((prev) => ({
        ...prev,
        tecidosPresentes: value,
      }));
    } else {
      setAnamnesisData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Salvar Plano terapeutico
  const handleSavePlano = async () => {
    const newPlano = {
      planoTerapeutico: anamnesisData.planoTerapeutico,
      dataRegistroPlano: new Date().toLocaleString(),
    };

    await axios.put(`/api/paciente/${pacienteId}/plano-terapeutico`, newPlano);

    setPlanosTerapeuticos(prevPlanos => [...prevPlanos, newPlano]);
    setOpenPlanoForm(false);
  };

    // Salvar Conduta
    const handleSaveConduta = async () => {
      const newConduta = {
        conduta: anamnesisData.conduta,
        dataRegistroConduta: new Date().toLocaleString(),
      };
  
      await axios.put(`/api/paciente/${pacienteId}/conduta`, newConduta);
  
      setCondutas(prevCondutas => [...prevCondutas, newConduta]);
      setOpenCondutaForm(false);
    };
    
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Filtrar apenas os tecidos presentes selecionados
      const formattedAnamnesisData = {
        ...anamnesisData,
        tecidosPresentes: anamnesisData.tecidosPresentes,
      };

      // Enviar o objeto formatado com as strings selecionadas para o backend
      await axios.post(
        `http://localhost:5000/pacientes/${pacienteId}/anamnesis`,
        { anamnesis: [formattedAnamnesisData] }
      );

      // Feedback de sucesso
      setFeedback({
        open: true,
        type: "success",
        message: "Anamnese salva com sucesso",
      });
    } catch (error) {
      // Feedback de erro
      setFeedback({
        open: true,
        type: "error",
        message: "Erro ao salvar anamnese",
      });
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
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            {anamnesisExists ? "Revisar Anamnese" : "Fazer Anamnese"}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="header">
                DADOS GERAIS
              </Typography>
              <div className="data">
                <ol>
                  <li className="data-item">
                    LOCALIZAÇÃO DA LESÃO: {anamnesisData.localLesao}
                  </li>
                  <li className="data-item">
                    ETIOLOGIA DA LESÃO: {anamnesisData.etiologia}
                  </li>
                  <li className="data-item">
                    TAMANHO DA LESÃO: {anamnesisData.tamanhoLesao}
                  </li>
                  <li className="data-item">
                    PROFUNDIDADE DA LESÃO: {anamnesisData.profundidadeLesao}
                  </li>
                  <li className="data-item">
                    BORDAS E MARGENS: {anamnesisData.bordasMargens}
                  </li>
                  <li className="data-item">
                    TIPO DE EXSUDATO: {anamnesisData.exsudato}
                  </li>
                  <li className="data-item">
                    QUANTIDADE DE EXSUDATO: {anamnesisData.quantidadeExsudato}
                  </li>
                  <li className="data-item">
                    PERILESÃO: {anamnesisData.perilesao}
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
      <Grid container spacing={3}>
        {/* Card de Plano Terapêutico */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Plano Terapeutico</Typography>
              <IconButton color="primary" onClick={() => setOpenPlanoForm(true)}>
                <AddIcon />
              </IconButton>
              {/* Mostrar o histórico de planos */}
              {planosTerapeuticos.length > 0 ? (
                planosTerapeuticos.map((plano, index) => (
                  <Typography key={index}>
                    <strong>{plano.plano}</strong> - {plano.dataRegistro}
                  </Typography>
                ))
              ) : (
                <Typography>Nenhum plano registrado</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Conduta */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Conduta</Typography>
              <IconButton color="primary" onClick={() => setOpenCondutaForm(true)}>
                <AddIcon />
              </IconButton>
              {/* Mostrar o histórico de condutas */}
              {condutas.length > 0 ? (
                condutas.map((conduta, index) => (
                  <Typography key={index}>
                    <strong>{conduta.conduta}</strong> - {conduta.dataRegistro}
                  </Typography>
                ))
              ) : (
                <Typography>Nenhuma conduta registrada</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Formulário de Plano Terapêutico */}
        <Dialog open={openPlanoForm} onClose={() => setOpenPlanoForm(false)}>
          <DialogTitle>Registrar Plano Terapêutico</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="planoTerapeutico"
              label="Plano Terapêutico"
              type="text"
              fullWidth
              value={anamnesisData.planoTerapeutico}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPlanoForm(false)} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSavePlano} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Formulário de Conduta */}
        <Dialog open={openCondutaForm} onClose={() => setOpenCondutaForm(false)}>
          <DialogTitle>Registrar Conduta</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="conduta"
              label="Conduta"
              type="text"
              fullWidth
              value={anamnesisData.conduta}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCondutaForm(false)} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSaveConduta} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
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
            {renderSelect("etiologia", "Etiologia da Lesão", [
              "LPP",
              "Lesão Traumatica",
              "Deisciência",
              "Úlcera Diabética",
              "Úlcera Venosa",
              "Úlcera Arterial",
              "Lesão Tumoral",
              "Outros",
            ])}
            <TextField
              margin="dense"
              name="tamanhoLesao"
              label="Tamanho da Lesão (Comprimento x Largura cm²)"
              type="text"
              fullWidth
              value={anamnesisData.tamanhoLesao}
              onChange={handleChange}
            />
            {renderSelect("profundidadeLesao", "Profundidade", [
              "Tecido Danificado sem rompimento de epiderme",
              "Superficial",
              "Profunda com acometimento de tecido adjacentes",
              "Não classificável",
              "Acometimentos de estruturas de suporte (tendões, articulações)",
              "Epitelizada",
              "Cicatrizada",
            ])}
            <FormControl margin="dense" fullWidth>
              <InputLabel>Tecidos Presentes</InputLabel>
              <Select
                multiple
                name="tecidosPresentes"
                value={anamnesisData.tecidosPresentes} // Usamos a array diretamente
                onChange={(e) =>
                  handleChange({
                    target: { name: "tecidosPresentes", value: e.target.value },
                  })
                }
                renderValue={(selected) => selected.join(", ")}
                label="Tecidos Presentes"
                fullWidth
              >
                {[
                  "Necrose",
                  "NecroseLiquefacao",
                  "Esfacelo",
                  "Fibrina",
                  "Granulacao",
                  "Epitelizacao",
                ].map((tecido) => (
                  <MenuItem key={tecido} value={tecido}>
                    <Checkbox
                      checked={anamnesisData.tecidosPresentes.includes(tecido)}
                    />
                    {tecido}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {renderSelect("bordasMargens", "Bordas / Margens", [
              "Aderidas",
              "Não aderidas",
              "Descoladas",
              "Com presença de Epitelização",
            ])}
            {renderSelect("exsudato", "Exsudato", [
              "Seroso",
              "Serosanguinolento",
              "Purulento",
              "Quantidade",
            ])}
            {renderSelect("perilesao", "Perilesão", [
              "Eritema",
              "Edema",
              "Dermatite",
              "Maceração",
              "Induração",
              "Ressecamento",
              "Descamação",
              "Sensibilidade",
              "Ausência de pelos",
            ])}
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
        <Alert
          onClose={() => setFeedback({ open: false, type: "", message: "" })}
          severity={feedback.type}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Prontuario;
