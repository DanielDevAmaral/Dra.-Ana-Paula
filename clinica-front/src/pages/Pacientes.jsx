import React, { useEffect, useState } from "react";
import axios from "axios";
import TableComponent from "../components/Table";
import AddPaciente from "../components/AddPaciente";
import Swal from 'sweetalert2'
import "./Pacientes.css";

// Definindo as colunas da tabela
const columns = [
  { field: "nome", headerName: "Nome do Paciente" },
  { field: "cpf", headerName: "CPF" },
  { field: "sexo", headerName: "Sexo" },
  { field: "numero", headerName: "Número" },
];

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // modal refere-se ao formulário de criação de paciente
  
  // Função handleSubmit no componente principal
  const handleSubmitForm = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/pacientes",
        formData
      );
      console.log("Paciente salvo com sucesso:", response.data);
      setModalOpen(false); // Fechar o modal após o sucesso
      setPacientes(...pacientes, response.data)
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        // Requisição à API para obter os pacientes
        const { data } = await axios.get("https://ana-paula-backend.onrender.com/api/pacientes");

        // Mapeando os dados recebidos para o formato esperado pelas linhas da tabela
        const formattedData = data.map((paciente) => ({
          id: paciente._id, // Adicione o ID para facilitar a exclusão
          nome: paciente.nome,
          cpf: paciente.cpf,
          sexo: paciente.sexo,
          numero: paciente.numero,
        }));

        setPacientes(formattedData);
      } catch (error) {
        console.error("Erro ao buscar os pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

// Função para deletar um paciente
const handleDelete = async (paciente) => {
  Swal.fire({
    title: `Deseja mesmo apagar ${paciente.nome} do sistema? 😭`,
    text: "Você não poderá reverter essa ação!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#945E62",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, quero deletar"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Faz a requisição DELETE para a API
        await axios.delete(`https://ana-paula-backend.onrender.com/api/pacientes/${pacienteID}`);
        
        // Atualiza a lista local de pacientes, removendo o paciente deletado
        setPacientes(pacientes.filter((p) => p.id !== pacienteID));
        
        // Exibe a confirmação de exclusão
        Swal.fire({
          title: "Deletado!",
          text: "O paciente foi removido com sucesso.",
          icon: "success",
          color: "#945E62"
        });
      } catch (error) {
        // Exibe erro se algo deu errado
        console.error("Erro ao deletar o paciente:", error);
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível excluir o paciente.",
          icon: "error"
        });
      }
    }
  });
};

  const countPacientes = pacientes.length;

  return (
    <div className="home-container">
      <div className="header-pacientes">
        <div className="header-pacientes-count">
        <p>
          Número de pacientes: {countPacientes}
        </p>
        </div>
        <AddPaciente />
      </div>
      <TableComponent
        columns={columns}
        rows={pacientes}
        onDelete={handleDelete}
        id={pacientes.id}
        handleSubmit={handleSubmitForm}
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default Pacientes;
