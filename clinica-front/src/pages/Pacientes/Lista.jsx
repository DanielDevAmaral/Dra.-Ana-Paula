import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Lista.css";
import {
  Table,
  Paper,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom"; // Assumindo que você está usando react-router-dom
import TotalPacientes from "./TotalPacientes";
import CadastrarPacienteButton from "./CadastrarPacienteButton";
import CadastrarPacienteDialog from "./CadastrarPacienteDialog";
import TableHeader from "./TableHeader";
import PacientesTableBody from "./PacientesTableBody";

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
    medicacoesEmUso: "",
    profissao: "",
    sexo: "",
    peso: "",
    altura: "",
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

  const today = new Date();

  return (
    <>
      <div style={{ display: "inline-flex", color: "#A77E81", alignItems: "center", minWidth: "-webkit-fill-available" }}>
        <TotalPacientes count={count} />
        <CadastrarPacienteButton handleOpen={handleOpen} />
      </div>
      <Paper sx={{ borderRadius: "36px", boxShadow: "none", height: "80vh" }}>
        <CadastrarPacienteDialog
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          newPaciente={newPaciente}
        />
        <Table>
          <TableHeader />
          <PacientesTableBody
            pacientes={pacientes}
            today={today}
            handleMenuClick={handleMenuClick}
          />
        </Table>
      </Paper>

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