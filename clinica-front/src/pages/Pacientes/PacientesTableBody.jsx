import React from "react";
import { TableBody, TableRow, TableCell, IconButton } from "@mui/material";
import { FaNotesMedical } from "react-icons/fa";

const PacientesTableBody = ({ pacientes, today, handleMenuClick }) => (
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
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton
            aria-label="Prontuário"
            onClick={(event) => handleMenuClick(event, paciente)}
          >
            <FaNotesMedical />
          </IconButton>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default PacientesTableBody;