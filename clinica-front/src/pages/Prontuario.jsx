import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import AddAnamnese from '../components/AddAnamnese';

const Prontuario = () => {
    const {id: pacienteId} = useParams()
    const [paciente, setPaciente] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false); // modal refere-se ao formulário de criação de paciente
    
    const handleCloseModal = () => setModalOpen(false);
    
    // Função handleSubmit no componente principal
    const handleSubmitForm = async (formData) => {
        try {
        const response = await axios.post(
            `http://localhost:8000/api/pacientes/${pacienteId}`,
            formData,
            { validateStatus: (status) => status >= 200 && status < 300 }
        );
        console.log("Paciente salvo com sucesso:", response.data);
        setPaciente((prevPacientes) => [...prevPacientes, response.data]);
        setModalOpen(false); // Fechar o modal após o sucesso
        Swal.fire({
            title: "Anamnese registrada com sucesso",
            text: `Todos os dados foram registrado, agora vamos cuidar do nosso paciente 👨‍⚕️`,
            icon: "success",
            confirmButtonColor: "#945E62"
        })
        } catch (error) {
        console.error("Erro ao salvar paciente:", error);
        let errorMessage = "Não foi possível registrar Anamnese 🕵️"
    
        if(error.response && error.response.data && error.response.data.message){
            errorMessage = error.response.data.message;
        };
    
        Swal.fire({
            title: "Erro ao resgistrar Anamnese!",
            text: errorMessage,
            icon: "error",
            confirmButtonColor: "#945E62"
        }).then(() => {
            setModalOpen(false); // Fechar o modal após exibir o SweetAlert
        });
        }
    };
  
    useEffect(() => {
      const fetchDadosPaciente = async () => {
        try {
          // Requisição à API para obter os pacientes
          const { data } = await axios.get(`http://localhost:8000/api/pacientes/${pacienteId}`);
          setPaciente(data);
        } catch (error) {
          console.error("Erro ao buscar os dados do Paciente:", error);
        }
      };
  
      fetchDadosPaciente();
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
            await axios.delete(`http://localhost:8000/api/pacientes/${paciente.id}`);
            
            // Atualiza a lista local de pacientes, removendo o paciente deletado
            setPaciente(paciente.filter((p) => p.id !== paciente.id));
            
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

    return (
        <div className="home-container">
        <div className="header-pacientes">
          {/*os parametros "open" e "handleClose" são passados para AddPaciente que passam para FormPaciente*/}
          <AddAnamnese handleSubmit={handleSubmitForm} open={isModalOpen} setModalOpen={setModalOpen} handleClose={handleCloseModal}/>
        </div>
      </div>
    );
};

export default Prontuario;
