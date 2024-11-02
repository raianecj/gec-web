// src/pages/EventDetails/index.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/events/${eventId}`); // Substitua pela URL da API
                const data = await response.json();
                setEvent(data); // Ajuste conforme a estrutura dos dados da API
            } catch (error) {
                console.error('Erro ao buscar detalhes do evento:', error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (!event) return <p>Carregando...</p>;

    return (
        <div className="event-details">
            <Navbar />
            <main>
                <div className='event-details__page-inner-content'>
                <div className='event-details__page-inner-content-details'>
                <img src={event.image} alt={event.title} className="event-image" />
            <h1>{event.title}</h1>
            <p><strong>Local:</strong> {event.location}</p>
            <p><strong>Data:</strong> {event.date}</p>
            <p><strong>Descrição:</strong> {event.description}</p>
            <button className="register-button">Inscreva-se</button>
                </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
       
    );
}
