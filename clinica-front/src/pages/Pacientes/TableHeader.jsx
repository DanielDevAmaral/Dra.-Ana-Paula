import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

const tableHeaders = [
  { label: "Nome", align: "center" },
  { label: "Tipo Sanguíneo", align: "center" },
  { label: "Idade", align: "center" },
  { label: "CPF", align: "center" },
  { label: "Prontuário", align: "center" },
];

const TableHeader = () => (
  <TableHead>
    <TableRow>
      {tableHeaders.map((header) => (
        <TableCell
          key={header.label}
          sx={{
            color: "#A77E81",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: header.align,
          }}
        >
          {header.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default TableHeader;