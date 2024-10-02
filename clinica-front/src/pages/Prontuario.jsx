import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Prontuario = () => {
    const {id: pacienteId} = useParams()
    console.log(pacienteId)

    return (
        <div className="home-container">
            hellou
        </div>
    );
};

export default Prontuario;
