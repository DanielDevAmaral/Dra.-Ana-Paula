import { NavLink } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../imagens/logonobg.png";
import "./Sidebar.css";

const lockIcon = <FaLock />;

const Sidebar = () => (
  <div className="sidebar">
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
    <nav>
      <ul>
        <li className="disabled">
          <Link to={`/agenda`}><span>Agenda {lockIcon}</span></Link>
        </li>
        <li className="disabled">
        <Link to={`/financeiro`}><span>Financeiro {lockIcon}</span></Link>
        </li>
        <li className="pacientes">
        <Link to={`/pacientes`}><span>Pacientes</span></Link>
        </li>
        <li className="disabled">
        <Link to={`/material`}><span>Materiais {lockIcon}</span></Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
