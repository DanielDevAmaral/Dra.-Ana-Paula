import React from "react";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CadastrarPacienteButton = ({ handleOpen }) => {
  const theme = createTheme({
    palette: {
      purple: {
        main: "#03BB85",
      },
    },
  });

  return (
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
  );
};

export default CadastrarPacienteButton;