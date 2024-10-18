import React from 'react';
import { Paper, Typography, Box, Grid, Divider } from '@mui/material';

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

const TableAnamnese = ({ anamnese }) => {
  // Verifica se existe algum item no array de anamneses
  const ultimaAnamnese = anamnese.length > 0 ? anamnese[anamnese.length - 1] : null;
  console.log(ultimaAnamnese)

  // Se não houver anamneses, exibe uma mensagem apropriada
  if (!ultimaAnamnese) {
    return <Typography>Não há anamneses disponíveis.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <React.Fragment key={ultimaAnamnese._id}>

        {/* Dados gerais da anamnese */}
        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            elevation={0}
            sx={{
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              height: '354px',
              overflow: 'auto',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>Visão Geral</Typography>
            <Divider sx={{ borderColor: '#A77E81', marginBottom: '12px' }} />
            <AnamneseItem label="Comorbidade" value={ultimaAnamnese.comorbidade} />
            <AnamneseItem label="Plano" value={ultimaAnamnese.plano} />
            <AnamneseItem label="Alergias" value={ultimaAnamnese.alergia?.join(', ') || 'Não informado'} />
            <AnamneseItem label="Pratica Esporte" value={ultimaAnamnese.esporte ? 'Sim' : 'Não'} />
            <AnamneseItem label="Fuma" value={ultimaAnamnese.fumo ? 'Sim' : 'Não'} />
            <AnamneseItem label="Gravidez" value={ultimaAnamnese.gravidez ? 'Sim' : 'Não'} />
            <AnamneseItem label="Amamenta" value={ultimaAnamnese.amamenta ? 'Sim' : 'Não'} />
          </Paper>
        </Grid>

        {/* Dados de lesão */}
        <Grid item xs={12} md={4}>
          <Paper
            variant="outlined"
            elevation={0}
            sx={{
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              height: '354px',
              overflow: 'auto',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>Lesão</Typography>
            <Divider sx={{ borderColor: '#A77E81', marginBottom: '12px' }} />
            
            {ultimaAnamnese.lesao?.map((lesao, index) => (
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
            sx={{
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              height: '354px',
              overflow: 'auto',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>Conduta</Typography>
            <Divider sx={{ borderColor: '#A77E81', marginBottom: '12px' }} />
            {ultimaAnamnese.conduta?.map((conduta, index) => (
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

        {/* Dados da Observação */}
        <Grid item xs={12} md={12}>
          <Paper
            variant="outlined"
            elevation={0}
            sx={{
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              height: '180px',
              overflow: 'auto',
              border: '1px solid #A77E81'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>Observação</Typography>
            <p>{ultimaAnamnese.observacao || 'Não informado'}</p>
          </Paper>
        </Grid>
      </React.Fragment>
    </Grid>
  );
};


export default TableAnamnese;