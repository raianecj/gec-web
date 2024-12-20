// src/pages/register/index.js
import React, { useState } from 'react'; 
import bannerLogin from '../../assets/banner-login.jpg';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('As senhas não correspondem.');
            return;
        }
        try {
            const response = await register(name, email, password);
            alert('Usuário cadastrado com sucesso!'); 
            console.log(response.data);
            navigate('/login');
        } catch (err) {
            setError('Erro ao registrar. Tente novamente.');
        }
    };

    return (
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                    <form onSubmit={handleRegister} className="login-form"> {}
                        <span className="login-form-title">
                            <img className='bannerLogin' src={bannerLogin} alt='circulo de conta' />
                        </span>
                        <span className="login-form-title">Crie sua Conta</span>

                        <div className='wrap-input'>
                            <label className='title-input'>Nome:</label>
                            <input type="text" className='box-input' value={name} onChange={(e) => setName(e.target.value)}  />
                        </div>

                        <div className='wrap-input'>
                            <label className='title-input'>E-mail:</label>
                            <input type="email" className='box-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className='wrap-input'>
                            <label className='title-input'>Senha:</label>
                            <input type="password" className='box-input' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='wrap-input'>
                            <label className='title-input'>Confirmar Senha:</label>
                            <input type="password" className='box-input' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <div className='container-login-form-btn'>
                            <button type='submit' className='login-form-btn'>Registrar</button> {}
                        </div>
                        {error && <p className='error-message'>{error}</p>}
                        <div className='text-center'>
                            <span className='txt1'>Já possui uma conta? </span>
                            <Link className='txt2' to="/">Faça login!</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
