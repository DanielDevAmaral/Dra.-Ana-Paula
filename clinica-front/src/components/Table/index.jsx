import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MedicalIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import { CircularProgress, Box, Typography } from '@mui/material';

export default function TableComponent({ columns, rows, onDelete, loading }) {
  return (
    <TableContainer 
      component={Paper} 
      sx={{
        borderRadius: "34px", 
        maxHeight: "500px", 
        overflowY: "auto", 
        boxShadow: "none"
      }}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {rows.length === 0 ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" p={2}>
              <Typography variant="h6" color="textSecondary" align="center">
                Nenhum paciente cadastrado
              </Typography>
            </Box>

          ) : (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.align || 'center'}
                      sx={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#fff',
                        zIndex: 1,
                        borderBottom: '2px solid #ddd',
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                  <TableCell 
                    align="center"
                    sx={{
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#fff',
                      zIndex: 1,
                      borderBottom: '2px solid #ddd',
                    }}
                  ></TableCell>
                  <TableCell 
                    align="center"
                    sx={{
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#fff',
                      zIndex: 1,
                      borderBottom: '2px solid #ddd',
                    }}
                  ></TableCell>
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
                    <TableCell align="center">
                      <Link to={`/pacientes/${row.id}`}>
                        <IconButton>
                          <MedicalIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => onDelete(row)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </TableContainer>
  );
}
