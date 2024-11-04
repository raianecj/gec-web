// src/pages/EventDetails/index.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bannerRun from '../../assets/banner_run_2.jpg'
import './style.css';
import Navbar from '../../components/Navbar/index.js';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
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

    const handleRegistration = async () => {
        try {
            const response = await fetch(`http://localhost:8080/register/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: 1 // Substitua pelo ID do usuário autenticado
                })
            });

            if (response.ok) {
                const result = await response.json();
                alert('Inscrição realizada com sucesso! Redirecionando para a página de pagamento...');
                // Redirecione para a página de pagamento, se necessário
                navigate('/payment');
            } else {
                alert('Erro ao realizar a inscrição. Tente novamente.');
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
                        <img src={bannerRun} alt='event.title' className='event-image' />
                        <h1>{event.title}</h1>
                        <p><strong>Local:</strong> {event.location}</p>
                        <p><strong>Data:</strong> {event.date}</p>
                        <p><strong>Descrição:</strong> {event.description}</p>
                        <button className="register-button" onClick={handleRegistration}>Inscreva-se</button>
                    </div>
                </div>
            </main>
            <footer>
                 <Footer />
            </footer>


        </>



    );
}

export default EventDetails;