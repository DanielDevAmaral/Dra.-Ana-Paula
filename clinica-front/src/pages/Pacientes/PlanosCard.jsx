import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { IoIosAddCircle } from "react-icons/io"; // Importando o ícone

const PlanosCard = ({ title, items, handleOpenForm }) => (
  <Card style={{ position: "relative" }}> {/* Para permitir o posicionamento absoluto */}
    <IoIosAddCircle 
      size={40} // Tamanho do ícone
      color="#03BB85" // Cor de fundo do ícone
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
        {title.toUpperCase()}{" "}
      </Typography>
      <Divider style={{ marginBottom: "16px" }} />

      {items.length > 0 ? (
        items.map((item, index) => (
          <Typography key={index}>
            <strong>{item.plano}</strong> - {item.dataRegistro}
          </Typography>
        ))
      ) : (
        <Typography>Nenhum registro encontrado</Typography>
      )}
    </CardContent>
  </Card>
);

export default PlanosCard;
