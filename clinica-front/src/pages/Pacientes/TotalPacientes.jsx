import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const TotalPacientes = ({ count }) => (
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
);

export default TotalPacientes;