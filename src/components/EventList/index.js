// src/components/EventsList/index.js
import React, { useEffect, useState } from "react"
import bannerRun from '../../assets/banner_run.jpeg'
import { Link } from 'react-router-dom';
import './style.css';

export default function EventsList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8080/events'); // Substitua pela URL da API
                const data = await response.json();
                setEvents(data); // Ajuste conforme a estrutura dos dados da API
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="events-list">
            {events.length ? (
                events.map((event) => (
                    <div key={event.id} className="event-card">
                      <img src={bannerRun} alt={event.title} className="event-image" />
                        <h4>{event.title}</h4>
                        <p>{event.date}</p>
                        <p>{event.location}</p>
                        <Link to={`/events/${event.id}`} className="learn-more-button">
                            Saiba mais
                        </Link>
                    </div>
                ))
            ) : (
                <p>Carregando eventos...</p>
            )}
        </div>
    );
}
