import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file
import { FaLock } from 'react-icons/fa'; // Import lock icon

const Sidebar = () => (
  <div className="sidebar">
    <div className="logo">
      <img src={require('D:/Dra. Ana Paula/clinica-front/src/components/imagens/logo sem fundo.png')} alt="Logo" />
    </div>
    <nav>
      <ul>
        {/* Disabled Link for Agenda */}
        <li className="disabled">
          <span>Agenda <FaLock /></span>
        </li>
        {/* Disabled Link for Financeiro */}
        <li className="disabled">
          <span>Financeiro <FaLock /></span>
        </li>
        {/* Pacientes Menu */}
        <li className="pacientes">
          <NavLink to="/pacientes/lista" activeclassname="active">Pacientes</NavLink>
          <ul className="sub-menu">
            <li><NavLink to="/pacientes/lista" activeclassname="active">Lista</NavLink></li>
            {/* Disabled Link for Aniversariantes */}
            <li className="disabled">
              <span>Aniversariantes <FaLock /></span>
            </li>
            {/* Disabled Link for Relatórios */}
            <li className="disabled">
              <span>Relatórios <FaLock /></span>
            </li>
          </ul>
        </li>
        {/* Disabled Link for Materiais */}
        <li className="disabled">
          <span>Materiais <FaLock /></span>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
