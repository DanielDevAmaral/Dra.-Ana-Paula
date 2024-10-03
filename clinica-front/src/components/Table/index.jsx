import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MedicalIcon from '@mui/icons-material/Assignment'; // Ícone da ficha médica
import DeleteIcon from '@mui/icons-material/Delete'; // Ícone da lixeira
import IconButton from '@mui/material/IconButton'; // Botão para ícones
import { Link } from "react-router-dom";

// Componente TableComponent que aceita 'columns', 'rows' e 'onDelete' como props
export default function TableComponent({ columns, rows, onDelete }) {

  return (
    <TableContainer component={Paper} sx={{borderRadius: "34px",  maxHeight: "600px", overflowY: "auto"}}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} align={column.align || 'center'}>
                {column.headerName}
              </TableCell>
            ))}
            <TableCell align="center"></TableCell> {/* Coluna da ficha médica */}
            <TableCell align="center"></TableCell> {/* Coluna da lixeira */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.field} align={column.align || 'center'}>
                  {row[column.field]}
                </TableCell>
              ))}
              {/* Coluna do ícone da ficha médica */}
              <TableCell align="center">
                <Link to={`/pacientes/${row.id}`}>
                <IconButton>
                  <MedicalIcon />
                </IconButton>
                </Link>
              </TableCell>
              {/* Coluna do ícone de lixeira */}
              <TableCell align="center">
                <IconButton onClick={() => onDelete(row)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
