import React from "react";
import { Card, CardContent, Typography, Divider, Grid } from "@mui/material";
import { IoIosAddCircle } from "react-icons/io";
import { RiEditCircleFill } from "react-icons/ri";

const CondutasCard = ({ condutas, handleOpenForm }) => {
  // Conditionally set the icon based on whether condutas array has items
  const Icon = condutas.length > 0 ? RiEditCircleFill : IoIosAddCircle;

  return (
    <Card style={{ position: "relative" }}>
      <Icon
        size={40} // Tamanho do ícone
        color="#03BB85" // Cor do ícone
        style={{
          position: "absolute",
          top: 10,
          right: 20, // Posição no canto superior direito
          cursor: "pointer",
          borderRadius: "50%", // Torna o ícone circular
          backgroundColor: "#fff", // Fundo branco do círculo
        }}
        onClick={handleOpenForm}
      />
      <CardContent style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <Typography variant="h6" align="center" marginBottom={1}>
          CONDUTA
        </Typography>
        <Divider style={{ marginBottom: "16px" }} />

        {condutas.length > 0 ? (
          <Grid container spacing={2}>
            {condutas.map((conduta, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <Typography><strong>Tipo de Desbridamento:</strong> {conduta.tipoDesbridamento}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Solução de Limpeza:</strong> {conduta.solucaoLimpeza}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Proteção de Perilesão:</strong> {conduta.protecaoPerilesao}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Cobertura Primária:</strong> {conduta.coberturaPrimaria}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Cobertura Secundária:</strong> {conduta.coberturaSecundaria}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Fixação:</strong> {conduta.fixacao}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Período de Troca de Cobertura:</strong> {conduta.periodoTrocaCobertura}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Uso de Terapia Adjuvante:</strong> {conduta.usoTerapiaAdjuvante}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        ) : (
          <Typography align="center">Nenhum registro encontrado</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CondutasCard;
