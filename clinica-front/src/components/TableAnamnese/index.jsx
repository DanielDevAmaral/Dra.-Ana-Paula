import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

const AnamneseItem = ({ label, value }) => {
  const isNotInformed = value === undefined || value === '' || value === null;

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

const TableAnamnese = ({ anamneses }) => {
  const { id } = useParams(); // Pega o id da URL

  return (
    <Grid container spacing={2}>
      {anamneses.map((anamnese) => (
        <React.Fragment key={anamnese._id}>
          {/* Dados gerais da anamnese */}
          <Grid item xs={12} md={4} >
            <Paper
              variant="outlined"
              elevation={0}
              sx={{ padding: '16px', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>Anamnese</Typography>
              <AnamneseItem label="Comorbidade" value={anamnese.comorbidade} />
              <AnamneseItem label="Plano" value={anamnese.plano} />
              <AnamneseItem label="Esporte" value={anamnese.esporte ? 'Sim' : 'Não'} />
              <AnamneseItem label="Alergias" value={anamnese.alergia} />
              <AnamneseItem label="Gravidez" value={anamnese.gravidez ? 'Sim' : 'Não'} />
              <AnamneseItem label="Amamenta" value={anamnese.amamenta ? 'Sim' : 'Não'} />
              <AnamneseItem label="Fumo" value={anamnese.fumo ? 'Sim' : 'Não'} />
            </Paper>
          </Grid>

          {/* Dados de lesão */}
          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              elevation={0}
              sx={{ padding: '16px', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>Lesão</Typography>
              {anamnese.lesao.map((lesao, index) => (
                <React.Fragment key={index}>
                  <AnamneseItem label="Local" value={lesao.local} />
                  <AnamneseItem label="Etiologia" value={lesao.etiologia} />
                  <AnamneseItem label="Tamanho" value={lesao.tamanho} />
                  <AnamneseItem label="Profundidade" value={lesao.profundidade} />
                  <AnamneseItem label="Borda" value={lesao.borda} />
                  <AnamneseItem label="Exudato" value={lesao.exudato} />
                  <AnamneseItem label="Quantidade Exudato" value={lesao.quantidadeEx} />
                  <AnamneseItem label="Perilesão" value={lesao.perilesao} />
                </React.Fragment>
              ))}
            </Paper>
          </Grid>

          {/* Dados de conduta */}
          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              elevation={0}
              sx={{ padding: '16px', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>Conduta</Typography>
              {anamnese.conduta.map((conduta, index) => (
                <React.Fragment key={index}>
                  <AnamneseItem label="Desbridamento" value={conduta.desbridamento} />
                  <AnamneseItem label="Limpeza" value={conduta.limpeza} />
                  <AnamneseItem label="Proteção" value={conduta.protecao} />
                  <AnamneseItem label="Cobertura" value={conduta.cobertura} />
                  <AnamneseItem label="Fixação" value={conduta.fixacao} />
                  <AnamneseItem label="Troca" value={conduta.troca} />
                  <AnamneseItem label="Terapia" value={conduta.terapia ? 'Sim' : 'Não'} />
                </React.Fragment>
              ))}
            </Paper>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default TableAnamnese;
