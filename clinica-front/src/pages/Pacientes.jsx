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
  const [loading, setLoading] = useState(true); // Estado para gerenciamento do loading
  
  // Função handleSubmit no componente principal
  const handleSubmitForm = async (formData) => {
    try {
      //local test: http://localhost:8000/api/pacientes
      const response = await axios.post(
        "http://localhost:8000/api/pacientes",
        formData,
        { validateStatus: (status) => status >= 200 && status < 300 }
      );
      console.log("Paciente salvo com sucesso:", response.data);
      setPacientes((prevPacientes) => [...prevPacientes, response.data]);
      setModalOpen(false); // Fechar o modal após o sucesso
      Swal.fire({
        title: "Paciente adicionado",
        text: `${response.data.nome} foi adicionado com sucesso a sua lista de pacientes 🥳`,
        icon: "success",
        confirmButtonColor: "#945E62"
      });
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
      let errorMessage = "Não foi possível registrar o paciente 🕵️";

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        title: "Erro ao adicionar Paciente!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#945E62"
      }).then(() => {
        setModalOpen(false); // Fechar o modal após exibir o SweetAlert
      });
    }
  };

  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      setLoading(true); // Inicia o loading
      try {
        // Requisição à API para obter os pacientes
        //local test: http://localhost:8000/api/pacientes
        const { data } = await axios.get("http://localhost:8000/api/pacientes");

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
      } finally {
        setLoading(false); // Finaliza o loading
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
          //local test: http://localhost:8000/api/pacientes
          await axios.delete(`http://localhost:8000/api/pacientes/${paciente.id}`);

          // Atualiza a lista local de pacientes, removendo o paciente deletado
          setPacientes(pacientes.filter((p) => p.id !== paciente.id));

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
        <AddPaciente handleSubmit={handleSubmitForm} open={isModalOpen} setModalOpen={setModalOpen} handleClose={handleCloseModal} />
      </div>
      <TableComponent
        columns={columns}
        rows={pacientes}
        onDelete={handleDelete}
        loading={loading} // Passando o estado de loading para o TableComponent
      />
    </div>
  );
};

export default Pacientes;
