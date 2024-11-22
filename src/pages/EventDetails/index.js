// src/pages/EventDetails/index.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bannerRun from '../../assets/banner_run_2.jpg';
import './style.css';
import Navbar from '../../components/Navbar/index.js';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        cpf: '',
        dataNascimento: '',
        genero: '',
        modalidadeCorrida: '',
        tamanhoCamisa: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/events/${eventId}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do evento:', error);
            }
        };
        

        fetchEventDetails();
    }, [eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistration = async () => {
        try {
            const session = JSON.parse(localStorage.getItem('authToken'));
            if (!session) {
                alert('Você precisa estar logado para se inscrever.');
                return;
            }
    
            // Ajuste no formato da data para o backend
            const formattedData = { 
                ...formData, 
                dataNascimento: formData.dataNascimento.split('-').reverse().join('-') // Formata para YYYY-MM-DD
            };
    
            const response = await fetch(`http://localhost:8080/registration/${eventId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.token}`,
                },
                body: JSON.stringify(formattedData),
            });
    
            if (response.ok) {
                console.log('Dados enviados:', formattedData);
                alert('Inscrição realizada com sucesso! Redirecionando para a página de pagamento...');
                setIsModalOpen(false);
                navigate('/payment');
            } else {
                const errorData = await response.json();
                alert(`Erro ao realizar a inscrição: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro ao realizar a inscrição:', error);
            alert('Ocorreu um erro ao realizar a inscrição.');
        }
    };
    
    

    if (!event) return <p>Carregando...</p>;

    return (
        <>
            <div className='eventDetails__navbar'>
                <Navbar />
            </div>
            <main>
                <div className='eventDetails__page-inner-content'>
                    <div className='eventDetails__page-inner-content-details'>
                        <img src={bannerRun} alt={event.title} className='event-image' />
                        <h1>{event.title}</h1>
                        <p><strong>Local:</strong> {event.location}</p>
                        <p><strong>Data:</strong> {event.date}</p>
                        <p><strong>Descrição:</strong> {event.description}</p>
                        <button 
                            className="register-button" 
                            onClick={() => setIsModalOpen(true)}
                        >
                            Inscreva-se
                        </button>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>Inscrição no Evento</h2>
                        <form>
                            <label>
                                CPF:
                                <input 
                                    type="text" 
                                    name="cpf" 
                                    value={formData.cpf} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Data de Nascimento:
                                <input 
                                    type="date" 
                                    name="dataNascimento" 
                                    value={formData.dataNascimento} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Gênero:
                                <select 
                                    name="genero" 
                                    value={formData.genero} 
                                    onChange={handleInputChange} 
                                    required
                                >
                                    <option value="">Selecione</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </label>
                            <label>
                                Modalidade de Corrida:
                                <input 
                                    type="text" 
                                    name="modalidadeCorrida" 
                                    value={formData.modalidadeCorrida} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </label>
                            <label>
                                Tamanho da Camisa:
                                <select 
                                    name="tamanhoCamisa" 
                                    value={formData.tamanhoCamisa} 
                                    onChange={handleInputChange} 
                                    required
                                >
                                    <option value="">Selecione</option>
                                    <option value="P">P</option>
                                    <option value="M">M</option>
                                    <option value="G">G</option>
                                    <option value="GG">GG</option>
                                </select>
                            </label>
                        </form>
                        <div className="modal-buttons">
                            <button className="register-button" onClick={handleRegistration}>Finalizar Inscrição</button>
                            <button className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EventDetails;
