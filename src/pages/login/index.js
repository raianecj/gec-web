// src/pages/login/index.js
import React, { useState } from 'react'; 
import bannerLogin from '../../assets/banner-login.jpg';
import './style.css';
import { Link } from 'react-router-dom';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            alert('Login realizado com sucesso!'); 
            console.log(response.data);
            navigate('/home');
        } catch (err) {
            setError('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                    <form onSubmit={handleLogin} className="login-form"> {}
                        <span className="login-form-title">
                            <img className='bannerLogin' src={bannerLogin} alt='circulo de conta' />
                        </span>
                        <span className="login-form-title">HI RUNNERS</span>

                        <div className='wrap-input'>
                            <label className='title-input'>E-mail:</label>
                            <input
                                type="email"
                                className='box-input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='wrap-input'>
                            <label className='title-input'>Senha:</label>
                            <input
                                type="password"
                                className='box-input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='container-login-form-btn'>
                            <button type='submit' className='login-form-btn'>Entrar</button> {}
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        <div className='text-center'>
                            <span className='txt1'>Não possui conta? </span>
                            <Link className='txt2' to="/register">Crie agora!</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
