import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Lista.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  IconButton,
  Menu,
  MenuItem as MenuItemIcon,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputMask from "react-input-mask";
import MuiAlert from "@mui/material/Alert";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { useNavigate } from "react-router-dom"; // Assumindo que você está usando react-router-dom

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Lista = () => {
  const [pacientes, setPacientes] = useState([]);
  const [count, setCount] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [patientDialogOpen, setPatientDialogOpen] = useState(false);
  const navigate = useNavigate();

  const [newPaciente, setNewPaciente] = useState({
    nomePaciente: "",
    telefonePaciente: "",
    emailPaciente: "",
    tipoSanguineo: "",
    dataNascimento: "",
    cpfPaciente: "",
    nomeFamiliar: "",
    telefoneFamiliar: "",
    emailFamiliar: "",
  });

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/pacientes");
      setPacientes(response.data);
      setCount(response.data.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFeedback({
        open: true,
        type: "error",
        message: "Erro ao buscar pacientes",
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPaciente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/pacientes",
        newPaciente
      );
      setPacientes([...pacientes, response.data]);
      handleClose();
      setFeedback({
        open: true,
        type: "success",
        message: "Paciente cadastrado com sucesso",
      });
    } catch (error) {
      setFeedback({
        open: true,
        type: "error",
        message: "Erro ao cadastrar paciente",
      });
    }
    setLoading(false);
  };

  const handleMenuClick = (event, paciente) => {
    navigate(`/prontuarios/${paciente._id}`);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setPatientDialogOpen(false);
  };

  const blood = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const today = new Date();

  const theme = createTheme({
    palette: {
      purple: {
        main: "#C8A2C8",
        light: "#03BB85",
        dark: "#03BB85",
        contrastText: "#03BB85",
      },
    },
  });

  return (
    <>
      <div
        style={{
          display: "inline-flex",
          color: "#C8A2C8",
          alignItems: "center",
          minWidth: "-webkit-fill-available",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "46px",
            backgroundColor: "white",
            padding: "6px 16px",
          }}
        >
          <AccountCircleIcon />
          <span>&nbsp;Total de Pacientes: {count}</span>
        </div>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="purple"
            onClick={handleOpen}
            className="cadastrarPaciente"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              m: "20px",
              ml: "auto",
              color: "#fff",
              borderRadius: "26px",
              boxShadow: "none",
            }}
          >
            <AddCircleIcon sx={{ mr: 1 }} />
            Cadastrar Paciente
          </Button>
        </ThemeProvider>
      </div>
      <Paper sx={{ borderRadius: "36px", boxShadow: "none", height: "80vh" }}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Cadastrar Paciente</DialogTitle>
          <DialogContent>
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
                {blood.map((type) => (
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#03BB85",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Nome
              </TableCell>
              <TableCell
                sx={{
                  color: "#03BB85",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Tipo Sanguíneo
              </TableCell>
              <TableCell
                sx={{
                  color: "#03BB85",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Idade
              </TableCell>
              <TableCell
                sx={{
                  color: "#03BB85",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                CPF
              </TableCell>
              <TableCell
                sx={{
                  color: "#03BB85",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Prontuário
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente._id}>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  {paciente.nomePaciente}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {paciente.tipoSanguineo}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {today.getFullYear() -
                    new Date(paciente.dataNascimento).getFullYear()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {paciente.cpfPaciente}
                </TableCell>
                <TableCell sx={{
                  textAlign: "center",
                }}>
                  <IconButton
                    aria-label="Prontuário"
                    onClick={(event) => {
                      console.log("Paciente:", paciente);
                      if (paciente && paciente._id) {
                        handleMenuClick(event, paciente);
                      } else {
                        console.error(
                          "Paciente ou paciente._id está indefinido"
                        );
                      }
                    }}
                  >
                    <MedicalInformationIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog
        open={patientDialogOpen}
        onClose={handleMenuClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Informações do Paciente</DialogTitle>
        <DialogContent>
          {selectedPatient && (
            <>
              <TextField
                margin="dense"
                label="Nome do Paciente"
                type="text"
                fullWidth
                value={selectedPatient.nomePaciente}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="dense"
                label="Tipo Sanguíneo"
                type="text"
                fullWidth
                value={selectedPatient.tipoSanguineo}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="dense"
                label="Idade"
                type="text"
                fullWidth
                value={
                  today.getFullYear() -
                  new Date(selectedPatient.dataNascimento).getFullYear()
                }
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="dense"
                label="CPF"
                type="text"
                fullWidth
                value={selectedPatient.cpfPaciente}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="dense"
                label="Anotações Médicas"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={selectedPatient.anotacoesMedicas || ""}
                onChange={(e) =>
                  setSelectedPatient((prev) => ({
                    ...prev,
                    anotacoesMedicas: e.target.value,
                  }))
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMenuClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={() => setFeedback({ ...feedback, open: false })}
      >
        <Alert
          onClose={() => setFeedback({ ...feedback, open: false })}
          severity={feedback.type}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Lista;
