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
    navigate('/'); // Redireciona para a página home
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
            <div className='allevents__section-title'>
              <h3>Meus Dados</h3>
            </div>
            <div className='profile__underline'>
            </div>
            <div className='wrap-input'>
              <label className='title-input'>Nome Completo:</label>
              <input type="text" className='box-input' value={user.fullName} />
            </div>
            <div className='wrap-input'>
              <label className='title-input'>E-mail:</label>
              <input type='text' className='box-input' value={user.email} />
            </div>
            <button className='edit-button' >Atualizar meus dados</button>
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
