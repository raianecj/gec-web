import React, { useState, useEffect } from 'react';
import { clearSession } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/index.js';
import Footer from '../../components/Footer';
import './style.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('authToken'));

    if (!session) {
      // Alerta e redirecionamento se o usuário não estiver logado
      alert('Você precisa estar logado para acessar esta página.');
      navigate('/login');
      return;
    }

    fetch('http://localhost:8080/user-profile', {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Dados do usuário:', data);
        setUser(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do usuário:', error);
        setUser(null);
      });
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate('/home'); // Redireciona para a página de login
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className='profile__navbar'>
        <Navbar />
      </div>
      <main>
        <div className='profile__page-inner-content'>
          <div className='profile__page-inner-content-details'>
            <h1>Perfil do Usuário</h1>
            <p><strong>Nome completo:</strong> {user.name}</p>
            <p><strong>E-mail:</strong> {user.email}</p>
            <button className='logout-button' onClick={handleLogout}>Sair da Conta</button>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Profile;
