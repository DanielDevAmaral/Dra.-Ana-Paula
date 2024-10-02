import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableComponent from '../components/Table';

// Definindo as colunas da tabela
const columns = [
    { field: 'nome', headerName: 'Nome do Paciente' },
    { field: 'cpf', headerName: 'CPF' },
    { field: 'sexo', headerName: 'Sexo' },
    { field: 'numero', headerName: 'Número' },
];

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                // Requisição à API para obter os pacientes
                const { data } = await axios.get('http://localhost:8000/api/pacientes');
                
                // Mapeando os dados recebidos para o formato esperado pelas linhas da tabela
                const formattedData = data.map(paciente => ({
                    id: paciente._id,  // Adicione o ID para facilitar a exclusão
                    nome: paciente.nome,
                    cpf: paciente.cpf,
                    sexo: paciente.sexo,
                    numero: paciente.numero
                }));

                setPacientes(formattedData);
            } catch (error) {
                console.error('Erro ao buscar os pacientes:', error);
            }
        };

        fetchPacientes();
    }, []);

    // Função para deletar um paciente
    const handleDelete = async (paciente) => {
        try {
            await axios.delete(`http://localhost:8000/api/pacientes/${paciente.id}`);
            // Remover o paciente da lista local após a exclusão
            setPacientes(pacientes.filter(p => p.id !== paciente.id));
        } catch (error) {
            console.error('Erro ao deletar o paciente:', error);
        }
    };

    return (
        <div className="home-container">
            <TableComponent columns={columns} rows={pacientes} onDelete={handleDelete} id={pacientes.id}/>
        </div>
    );
};

export default Pacientes;
