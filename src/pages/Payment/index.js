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
            <h3>Resumo da sua inscrição</h3>
            <p><strong>Evento: </strong>{registration.event.title}</p>
            <p><strong>Data: </strong>{new Date(registration.event.date).toLocaleDateString()}</p>
            <p><strong>Atleta: </strong>{registration.nomeCompleto}</p>
            <p><strong>CPF: </strong>{registration.cpf}</p>
            <p><strong>Modalidade: </strong>{registration.modalidadeCorrida}</p>
            <p><strong>Camiseta: </strong>{registration.tamanhoCamisa}</p>
            <p><strong>Valor: </strong>R$ 75</p>  {/* <p><strong>Valor: </strong>R$ {registration.event.price}</p>*/}
            <p><strong>Status: </strong>{registration.status}</p>

          </div>
        )}
        <div className='payment__select-options'>
          <h3>Como você prefere pagar?</h3>
          <div className="payment__options">
            <div className="payment__options-pix">
              <input type="radio" id="pix" name="options" value="Pix" />
              <label htmlFor="pix">Pix</label>
            </div>
            <div className="payment__options-boleto">
              <input type="radio" id="boleto" name="options" value="Boleto" />
              <label htmlFor="boleto">Boleto</label>
            </div>
            <div className="payment__options-cartao-credito">
              <input type="radio" id="cartao" name="options" value="CartaoCredito" />
              <label htmlFor="cartao">Cartão de Crédito</label>
            </div>
          </div>
          <button onClick={handlePayment} className="payment__button">
            Finalizar Pagamento
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Payment;
