import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PlanosCard = ({ title, items, handleOpenForm }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <IconButton color="primary" onClick={handleOpenForm}>
        <AddIcon />
      </IconButton>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Typography key={index}>
            <strong>{item.plano || item.conduta}</strong> - {item.dataRegistro}
          </Typography>
        ))
      ) : (
        <Typography>Nenhum plano terapêutico registrado</Typography>
      )}
    </CardContent>
  </Card>
);

export default PlanosCard;