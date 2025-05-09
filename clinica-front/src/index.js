import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot no lugar de ReactDOM.render
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import App from './App';
import HomeScreen from './pages/HomeScreen';
import Pacientes from './pages/Pacientes';
import Prontuario from './pages/Prontuario';
import Agenda from './pages/Agenda';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/pacientes/:id" element={<Prontuario />} />
      <Route path="/agenda" element={<Agenda />} />
    </Route>
  )
);

const container = document.getElementById('root'); // Referencia o container
const root = createRoot(container); // Cria a root

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
