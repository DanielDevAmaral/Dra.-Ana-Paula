import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Lista from './pages/Pacientes/Lista';

const App = () => (
  <Router>
    <div className="app">
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<h2>Bem-vindo à Clínica</h2>} />
          <Route path="/pacientes/lista" element={<Lista />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
