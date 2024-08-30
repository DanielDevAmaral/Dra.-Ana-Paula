import React from "react";
import { Grid, Avatar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const PatientHeader = ({ nome, imagemPerfil, dataNascimento, calcularIdade }) => (
  <Grid container alignItems="center" spacing={2}>
    <Grid item>
      {imagemPerfil ? (
        <Avatar
          src={imagemPerfil}
          alt="Imagem do Paciente"
          sx={{ width: 56, height: 56 }}
        />
      ) : (
        <AccountCircleIcon sx={{ width: 56, height: 56 }} />
      )}
    </Grid>
    <Grid item>
      <Typography variant="h6" fontWeight="bold">
        {nome}
      </Typography>
      <Typography variant="body2">
        {dataNascimento ? `Idade: ${calcularIdade(dataNascimento)} Anos` : "Idade não disponível"}
      </Typography>
    </Grid>
  </Grid>
);

export default PatientHeader;