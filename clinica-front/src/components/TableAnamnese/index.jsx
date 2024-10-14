import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Box } from '@mui/material';

const AnamneseItem = ({ label, value }) => {
  const isNotInformed = !value; // Verifica se o valor está presente

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
      <Typography sx={{ fontWeight: 'bold', marginRight: '8px' }}>{label}:</Typography>
      <Typography
        sx={{
          backgroundColor: isNotInformed ? '#ffebee' : 'transparent',
          color: isNotInformed ? '#c62828' : 'inherit',
          padding: isNotInformed ? '4px 8px' : '0px',
          borderRadius: isNotInformed ? '8px' : '0px',
        }}
      >
        {isNotInformed ? 'Não informado' : value}
      </Typography>
    </Box>
  );
};

const AnamneseList = () => {
  const { id } = useParams(); // Pega o id da URL
  const [anamneses, setAnamneses] = useState([]);

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchAnamneses = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/pacientes/${id}`);
        setAnamneses(data);
      } catch (error) {
        console.error('Erro ao buscar dados de anamnese:', error);
      }
    };
    fetchAnamneses();
  }, [id]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {anamneses.map((anamnese) => (
        <Paper variant="outlined" elevation={0} sx={{ padding: '16px', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }} key={anamnese._id}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>Anamnese</Typography>

          {/* Exibição dos dados com checagem de "Não informado" */}
          <AnamneseItem label="Comorbidade" value={anamnese.comorbidade} />
          <AnamneseItem label="Plano" value={anamnese.plano} />
          <AnamneseItem label="Esporte" value={anamnese.esporte} />
          <AnamneseItem label="Alergias" value={anamnese.alergia.join(', ')} />
          <AnamneseItem label="Gravidez" value={anamnese.gravidez} />
          <AnamneseItem label="Amamenta" value={anamnese.amamenta} />
          <AnamneseItem label="Fumo" value={anamnese.fumo} />
        </Paper>
      ))}
    </Box>
  );
};

export default AnamneseList;
