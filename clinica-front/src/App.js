import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Lista from './pages/Pacientes/Lista';
import Prontuario from './pages/Pacientes/Prontuario';
import './App.css'; // Adicione uma folha de estilo para o app

const App = () => (
    <div className="app">
      <Sidebar className="sidebar" />
      <main className="content">
        <Outlet />
      </main>
    </div>
);

export default App;
