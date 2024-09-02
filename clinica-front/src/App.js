import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Lista from './pages/Pacientes/Lista';
import Prontuario from './pages/Pacientes/Prontuario';
import './App.css'; // Adicione uma folha de estilo para o app

const App = () => (
  <Router>
    <div className="app">
      <Sidebar className="sidebar" />
      <main className="content">
        <Routes>
          <Route path="/" element={<h2>Bem-vindo à Clínica</h2>} />
          <Route path="/pacientes/lista" element={<Lista />} />
          <Route path="/prontuarios/:pacienteId" element={<Prontuario />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
