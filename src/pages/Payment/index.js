import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './style.css';

function Payment() {
  const { registrationId } = useParams(); // Captura o ID da inscrição da URL
  const [registration, setRegistration] = useState(null); // Estado para armazenar a inscrição
  const [loading, setLoading] = useState(true); // Estado para exibir o carregamento
  const [error, setError] = useState(null); // Estado para erros
  const navigate = useNavigate(); // Hook de navegação

  // Função para buscar os detalhes da inscrição
  const fetchRegistrationDetails = async () => {
    try {
      const session = JSON.parse(localStorage.getItem('authToken'));
      if (!session) {
        alert('Você precisa estar logado para acessar o pagamento.');
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:8080/registration/${registrationId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar os detalhes da inscrição.');
      }

      const data = await response.json();
      setRegistration(data.registration); // Supondo que o backend retorne { registration: {...} }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrationDetails();
  }, [registrationId]);

  // Função para finalizar o pagamento
  const handlePayment = async () => {
    try {
      const session = JSON.parse(localStorage.getItem('authToken'));
      const response = await fetch(`http://localhost:8080/registration/${registrationId}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao processar o pagamento.');
      }

      const data = await response.json();
      alert('Pagamento realizado com sucesso!');
      navigate('/registrations'); // Redireciona para a página de inscrições
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="payment__section-title">
        <h3>Pagamento</h3>
      </div>
      <div className="profile__underline"></div>

      <div className="payment__content">
        {loading && <p>Carregando detalhes do pagamento...</p>}
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

        {!loading && registration && (
          <div className="payment__details">
            <h4>Evento: {registration.event.title}</h4>
            <p>Data: {new Date(registration.event.date).toLocaleDateString()}</p>
            <p>Modalidade: {registration.modalidadeCorrida}</p>
            <p>Status: {registration.status}</p>
            <p>Valor: R$ {registration.event.price}</p>
            <button onClick={handlePayment} className="payment__button">
              Finalizar Pagamento
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Payment;
