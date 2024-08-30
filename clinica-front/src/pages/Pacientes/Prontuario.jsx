import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import './Prontuario.css'
import {
  Grid,
  Divider,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import PatientHeader from "./PatientHeader";
import CustomSelect from "./CustomSelect";
import MultiSelectCheckbox from "./MultiSelectCheckbox";
import PlanosCard from "./PlanosCard";
import RegistroForm from "./RegistroForm";

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
  const [paciente, setPaciente] = useState({
    nomePaciente: "",
    imagemPerfil: "",
    dataNascimento: "", // Assumi que isso será retornado pelo backend
  });

  useEffect(() => {
    const fetchAnamnesisData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/pacientes/${pacienteId}/anamnesis`
        );

        console.log("Resposta da API:", response.data); // Log da resposta da API

        const anamnesisArray = response.data || [];

        if (anamnesisArray.length > 0) {
          const filteredPlanos = anamnesisArray
            .filter((anamnesis) => anamnesis.planoTerapeutico)
            .map((anamnesis) => ({
              plano: anamnesis.planoTerapeutico.plano || "",
              dataRegistro: anamnesis.planoTerapeutico.dataRegistroPlano
                ? format(
                    new Date(
                      anamnesis.planoTerapeutico.dataRegistroPlano.$date ||
                        anamnesis.planoTerapeutico.dataRegistroPlano
                    ),
                    "dd/MM/yyyy - HH:mm"
                  )
                : "",
            }));

          const filteredCondutas = anamnesisArray
            .filter((anamnesis) => anamnesis.conduta)
            .map((anamnesis) => ({
              conduta: anamnesis.conduta.conduta || "",
              dataRegistro: anamnesis.conduta.dataRegistroConduta
                ? format(
                    new Date(
                      anamnesis.conduta.dataRegistroConduta.$date ||
                        anamnesis.conduta.dataRegistroConduta
                    ),
                    "dd/MM/yyyy - HH:mm"
                  )
                : "",
            }));

          setPlanosTerapeuticos(filteredPlanos);
          setCondutas(filteredCondutas);
          setAnamnesisExists(true);

          setAnamnesisData({
            comorbidades: anamnesisArray[0].comorbidades || "",
            localLesao: anamnesisArray[0].localLesao || "",
            etiologia: anamnesisArray[0].etiologia || "",
            tamanhoLesao: anamnesisArray[0].tamanhoLesao || "",
            profundidadeLesao: anamnesisArray[0].profundidadeLesao || "",
            bordasMargens: anamnesisArray[0].bordasMargens || "",
            exsudato: anamnesisArray[0].exsudato || "",
            quantidadeExsudato: anamnesisArray[0].quantidadeExsudato || "",
            perilesao: anamnesisArray[0].perilesao || "",
            planoTerapeutico: anamnesisArray[0].planoTerapeutico || "",
            tecidosPresentes: anamnesisArray[0].tecidosPresentes || [],
            conduta: anamnesisArray[0].conduta || "",
          });
        } else {
          setPlanosTerapeuticos([]);
          setCondutas([]);
          setAnamnesisExists(false);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do prontuário:", error);
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

    const fetchPacienteData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/pacientes/${pacienteId}`
        );
        const pacienteData = response.data;
        setPaciente({
          nomePaciente: pacienteData.nomePaciente || "Paciente",
          imagemPerfil: pacienteData.imagemPerfil || "",
          dataNascimento: pacienteData.dataNascimento || "", // Suposição adicionada
        });
      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
        setFeedback({
          open: true,
          type: "error",
          message: "Erro ao buscar dados do paciente",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPacienteData();
  }, [pacienteId]);

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSavePlano = async () => {
    try {
      const newPlano = {
        planoTerapeutico: anamnesisData.planoTerapeutico,
        dataRegistroPlano: new Date().toISOString(),
      };

      await axios.put(
        `http://localhost:5000/pacientes/${pacienteId}/plano-terapeutico`,
        newPlano
      );
      setPlanosTerapeuticos((prevPlanos) => [...prevPlanos, newPlano]);
      setOpenPlanoForm(false);
    } catch (error) {
      console.error("Erro ao salvar plano terapêutico:", error);
    }
  };

  const handleSaveConduta = async () => {
    try {
      const newConduta = {
        conduta: anamnesisData.conduta,
        dataRegistroConduta: new Date().toISOString(),
      };

      await axios.put(
        `http://localhost:5000/pacientes/${pacienteId}/conduta`,
        newConduta
      );
      setCondutas((prevCondutas) => [...prevCondutas, newConduta]);
      setOpenCondutaForm(false);
    } catch (error) {
      console.error("Erro ao salvar conduta:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formattedAnamnesisData = {
        ...anamnesisData,
        tecidosPresentes: anamnesisData.tecidosPresentes,
      };

      await axios.post(
        `http://localhost:5000/pacientes/${pacienteId}/anamnesis`,
        { anamnesis: [formattedAnamnesisData] }
      );

      setFeedback({
        open: true,
        type: "success",
        message: "Anamnese salva com sucesso",
      });
    } catch (error) {
      setFeedback({
        open: true,
        type: "error",
        message: "Erro ao salvar anamnese",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <PatientHeader
          nome={paciente.nomePaciente}
          imagemPerfil={paciente.imagemPerfil}
          dataNascimento={paciente.dataNascimento}
          calcularIdade={calcularIdade}
        />
      </header>
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
              <Typography variant="h6" className="header" align="center" marginBottom={1}>
                DADOS GERAIS
              </Typography>
              <Divider style={{ marginBottom: '16px' }} /> 
              <div className="data">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className="data-item">
                      <strong>LOCALIZAÇÃO DA LESÃO:</strong> {(anamnesisData.localLesao).toUpperCase()}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="data-item">
                    <strong>ETIOLOGIA DA LESÃO:</strong> {(anamnesisData.etiologia).toUpperCase()}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="data-item">
                    <strong>TAMANHO DA LESÃO:</strong> {(anamnesisData.tamanhoLesao).toUpperCase()}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="data-item">
                    <strong>PROFUNDIDADE DA LESÃO:</strong> {(anamnesisData.profundidadeLesao).toUpperCase()}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="data-item">
                    <strong>BORDAS E MARGENS:</strong> {(anamnesisData.bordasMargens).toUpperCase()}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="data-item">
                    <strong>TIPO DE EXSUDATO:</strong> {(anamnesisData.exsudato).toUpperCase()}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="data-item">
                    <strong>QUANTIDADE DE EXSUDATO:</strong> {(anamnesisData.quantidadeExsudato).toUpperCase()}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="data-item">
                    <strong>PERILESÃO:</strong> {(anamnesisData.perilesao).toUpperCase()}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={6}>
          <PlanosCard
            title="Plano Terapêutico"
            items={planosTerapeuticos}
            handleOpenForm={() => setOpenPlanoForm(true)}
          />
        </Grid>

        <Grid item xs={6}>
          <PlanosCard
            title="Conduta"
            items={condutas}
            handleOpenForm={() => setOpenCondutaForm(true)}
          />
        </Grid>
      </Grid>
      <RegistroForm
        open={openPlanoForm}
        handleClose={() => setOpenPlanoForm(false)}
        handleChange={handleChange}
        handleSave={handleSavePlano}
        value={anamnesisData.planoTerapeutico}
        name="planoTerapeutico"
        label="Plano Terapêutico"
      />
      <RegistroForm
        open={openCondutaForm}
        handleClose={() => setOpenCondutaForm(false)}
        handleChange={handleChange}
        handleSave={handleSaveConduta}
        value={anamnesisData.conduta}
        name="conduta"
        label="Conduta"
      />
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
            <CustomSelect
              name="etiologia"
              label="Etiologia da Lesão"
              options={[
                "LPP",
                "Lesão Traumatica",
                "Deisciência",
                "Úlcera Diabética",
                "Úlcera Venosa",
                "Úlcera Arterial",
                "Lesão Tumoral",
                "Outros",
              ]}
              value={anamnesisData.etiologia}
              handleChange={handleChange}
            />
            <TextField
              margin="dense"
              name="tamanhoLesao"
              label="Tamanho da Lesão (Comprimento x Largura cm²)"
              type="text"
              fullWidth
              value={anamnesisData.tamanhoLesao}
              onChange={handleChange}
            />
            <CustomSelect
              name="profundidadeLesao"
              label="Profundidade"
              options={[
                "Tecido Danificado sem rompimento de epiderme",
                "Superficial",
                "Profunda com acometimento de tecido adjacentes",
                "Não classificável",
                "Acometimentos de estruturas de suporte (tendões, articulações)",
                "Epitelizada",
                "Cicatrizada",
              ]}
              value={anamnesisData.profundidadeLesao}
              handleChange={handleChange}
            />
            <MultiSelectCheckbox
              name="tecidosPresentes"
              label="Tecidos Presentes"
              options={[
                "Necrose",
                "NecroseLiquefacao",
                "Esfacelo",
                "Fibrina",
                "Granulacao",
                "Epitelizacao",
              ]}
              value={anamnesisData.tecidosPresentes}
              handleChange={handleChange}
            />
            <CustomSelect
              name="bordasMargens"
              label="Bordas / Margens"
              options={[
                "Aderidas",
                "Não aderidas",
                "Descoladas",
                "Com presença de Epitelização",
              ]}
              value={anamnesisData.bordasMargens}
              handleChange={handleChange}
            />
            <CustomSelect
              name="exsudato"
              label="Exsudato"
              options={[
                "Seroso",
                "Serosanguinolento",
                "Purulento",
                "Quantidade",
              ]}
              value={anamnesisData.exsudato}
              handleChange={handleChange}
            />
            <CustomSelect
              name="perilesao"
              label="Perilesão"
              options={[
                "Eritema",
                "Edema",
                "Dermatite",
                "Maceração",
                "Induração",
                "Ressecamento",
                "Descamação",
                "Sensibilidade",
                "Ausência de pelos",
              ]}
              value={anamnesisData.perilesao}
              handleChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Salvar"}
          </Button>
          <Button onClick={() => setOpenDialog(false)}>Fechar</Button>
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
