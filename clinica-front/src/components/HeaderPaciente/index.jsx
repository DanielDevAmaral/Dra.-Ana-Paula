import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { Person, PersonOutline } from '@mui/icons-material';

// Função para calcular a idade a partir da data de nascimento
const calcularIdade = (nascimento) => {
  const hoje = new Date();
  const dataNascimento = new Date(nascimento);
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mes = hoje.getMonth() - dataNascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }
  return idade;
};

// Componente HeaderPaciente
const HeaderPaciente = ({ paciente }) => {
  const { nome, nascimento, sexo, profissao } = paciente;

  // Definir o ícone com base no sexo
  const avatarIcon = sexo === 'Masculino' 
    ? <Person sx={{ fontSize: 40}} /> 
    : <PersonOutline sx={{ fontSize: 40 }} />;

  return (
    <Box display="flex" alignItems="center" p={1}>
      {/* Ícone do avatar */}
      <Avatar
        sx={{
          width: 56,
          height: 56,
          backgroundColor: sexo === 'Masculino' ? '#90caf9' : '#f48fb1',
          marginRight: 2,
        }}
      >
        {avatarIcon}
      </Avatar>

      {/* Informações do paciente */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {nome}
        </Typography>
        <Typography variant="body2">
          Idade: {calcularIdade(nascimento)} anos
        </Typography>
        <Typography variant="body2">
          Profissão: {profissao || 'Não informado'}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderPaciente;
