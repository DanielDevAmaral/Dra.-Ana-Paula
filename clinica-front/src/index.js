import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import App from './App';
import HomeScreen from './pages/HomeScreen';
import Pacientes from './pages/Pacientes';
import Prontuario from './pages/Prontuario';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/pages/Pacientes/theme';  // Import the custom theme
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}/>
      <Route path="/pacientes" element={<Pacientes />}/>
      <Route path="/pacientes/:id" element={<Prontuario />}/>
    </Route>
  )
)

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
