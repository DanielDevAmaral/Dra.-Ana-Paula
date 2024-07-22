import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar">
    <nav>
      <ul>
        <li><NavLink to="/" exact="true" activeclassname="active">Home</NavLink></li>
        <li><NavLink to="/pacientes/lista" activeclassname="active">Pacientes</NavLink></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
