import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar o hook para navegação
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './style.css';

function Registrations() {
  const [registrations, setRegistrations] = useState([]); // Estado para armazenar as inscrições
  const [loading, setLoading] = useState(true); // Estado para exibir o carregamento
  const [error, setError] = useState(null); // Estado para erros
  const navigate = useNavigate(); // Hook de navegação

  // Função para buscar as inscrições
  const fetchRegistrations = async () => {
    try {
      const session = JSON.parse(localStorage.getItem('authToken')); // Pegue o token do localStorage ou outro método de autenticação
      if (!session) {
        alert('Você precisa estar logado para se inscrever.');
        return;
      }
      const response = await fetch('http://localhost:8080/registration/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar inscrições');
      }

      const data = await response.json();
      setRegistrations(data.registrations); // Supondo que o backend retorna { registrations: [...] }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Função para redirecionar para a página de pagamento
  const handlePaymentRedirect = (registrationId) => {
    navigate(`/payment/${registrationId}`);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="allregistrations__section-title">
        <h3>Minhas Inscrições</h3>
      </div>
      <div className="registrations__underline"></div>

      <div className="registrations__list">
        {loading && <p>Carregando inscrições...</p>}
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

        {!loading && !error && registrations.length === 0 && (
          <p>Você ainda não possui inscrições.</p>
        )}

        {!loading && registrations.length > 0 && (
          <ul>
            {registrations.map((registration) => (
              <li key={registration.id} className="registration__item">
                <p><strong>Evento: {registration.event.title}</strong></p>
                <p>Data: {new Date(registration.event.date).toLocaleDateString()}</p>
                <p
                  className="registration__status"
                  onClick={() => handlePaymentRedirect(registration.id)}
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                >
                  Status: {registration.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Registrations;
