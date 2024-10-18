import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddAnamnese from '../components/AddAnamnese';
import TableAnamnese from '../components/TableAnamnese';

const Prontuario = () => {
    const { id: pacienteId } = useParams();
    const [anamnese, setAnamnese] = useState([]);
    const [dadoPaciente, setDadoPaciente] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => setModalOpen(false);

    const handleSubmitForm = async (formData) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/anamnese/${pacienteId}`,
                formData,
                { validateStatus: (status) => status >= 200 && status < 300 }
            );
            setDadoPaciente(response)
            setAnamnese((prevAnamnese) => [...prevAnamnese, response.data]); // Atualizar anamnese dinamicamente
            setModalOpen(false);
            Swal.fire({
                title: "Anamnese registrada com sucesso",
                text: `Todos os dados foram registrados.`,
                icon: "success",
                confirmButtonColor: "#945E62"
            });
        } catch (error) {
            console.error("Erro ao salvar paciente:", error);
            let errorMessage = "Não foi possível registrar Anamnese";

            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            Swal.fire({
                title: "Erro ao registrar Anamnese!",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#945E62"
            }).then(() => {
                setModalOpen(false);
            });
        }
    };

    useEffect(() => {
        const fetchDadosPaciente = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/pacientes/${pacienteId}`);
                setAnamnese(data.anamnese);
            } catch (error) {
                console.error("Erro ao buscar os dados do Paciente:", error);
            }
        };

        fetchDadosPaciente();
    }, [dadoPaciente]);

    return (
        <div className="home-container">
            <div className="header-pacientes">
                <AddAnamnese handleSubmit={handleSubmitForm} open={isModalOpen} setModalOpen={setModalOpen} handleClose={handleCloseModal} />
            </div>
            <TableAnamnese anamneses={anamnese} /> {/* Passar a anamnese como prop */}
        </div>
    );
};

export default Prontuario;
