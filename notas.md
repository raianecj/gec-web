GEC-WEB #nome do projeto
|
public/
|--index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

  </body>
</html>

|
src/
|----assets/
|	|----account_circle.png
|	|----banner_home.jpg
|	|----banner_run.jpg
|	|----banner-login.jpg
|----components/
|	|----EventList
|	|	|----index.js
// src/components/EventsList/index.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function EventsList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://192.168.1.15:8080/events'); // Substitua pela URL da API
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
                      <img src={event.image} alt={event.title} className="event-image" />
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

|	|	|----style.css
.events-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.event-card {
    background-color: var(--light-color);
    border: 1px solid var(--light-color);
    border-radius: 1px;
    padding: 2rem;
    height: 400px;
    width: 350px;
    text-align: center;
    box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.178);
}

.event-card:hover {
    border: 1px solid var(--primary-color);
}

.event-card h4 {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.event-card p {
    color: var(--dark-color);
    margin-bottom: 0.5rem;
}

.event-card button {
    background-color: var(--primary-color);
    color: var(--light-color);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.event-card button:hover {
    background-color: var(--dark-primary-color);
}

|	|----Header
|	|	|----index.js
// src/components/Header.js


import React from 'react'
import { Link } from 'react-router-dom'
import bannerHome from '../../assets/banner_home.jpg'
import './style.css';


export default function Header() {
    return (
        <header>
            <div className='inner-content'>
                <div className='hero-background'>
                    <img src={bannerHome} alt="Banner"></img>
                </div>
                <div className='hero-foreground'></div>
                <h2>Libere sua energia!</h2>
                <p>Encontre o evento ideal para você aqui.</p>
                <Link to='/events' className='see-more-btn'>
                    <span>Ver todos os eventos</span>
                </Link>


            </div>
        </header>
    )
}

|	|	|----style.css
header {
    position: relative;
    width: 100%;
    height: 100vh; /* Define a altura do header para cobrir toda a tela */
    overflow: hidden;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.hero-background img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Faz com que a imagem cubra toda a área mantendo a proporção */
}

.inner-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: 2;
    color: white; /* Torna o texto visível caso a imagem seja escura */
    text-align: center;
}

.hero-foreground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Adiciona uma camada de sobreposição para dar contraste ao texto */
    z-index: 1;
}

h2, p, a {
    z-index: 2;
}

a {
    color: #ffffff;
    text-decoration: none;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff6b6b;
    border-radius: 5px;
    transition: background 0.3s;
}

a:hover {
    background-color: #ff4b4b;
}

|	|----Navbar
|	|	|----index.js
import React, { useState } from 'react'
import { faSearch, faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './style.css';

export default function Navbar() {
    const [show, setShow] = useState(false);
  return (
    <div className="nav">
                <div className="inner-content">
                <h1 className="logo">HI RUNNERS</h1>
                <nav className={show ? "show" : ""}>
                    <ul style={{ display: show ? 'flex' : 'none' }}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Eventos</Link></li>
                        <li><Link to="/subscribers">Inscrições</Link></li>
                        <li><Link to="/account">Conta</Link></li>
                    </ul>
                </nav>
                <div className="navs-icon-container">
                    <div className="search-input-container">
                        <input type="search" placeholder="Procurar..."/>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                    <button className="shopping-cart-btn">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <button className="menu-button" onClick={() => setShow(!show)}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </button>
                </div>
                </div>

            </div>
  )
}

|	|	|----style.css
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

:root {
    --primary-color:#2D9BF0;
    --secondary-color: #9aa4ac;
    --dark-primary-color: #365b77;
    --dark-secondary-color: #71787e;
    --light-color: #ffffff;
    --dark-color: #2c2c2c;
}

body {
    font-family: sans-serif;
    color: var(--dark-color);
}

a{
    text-decoration: none;
    color: unset;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}
/* NAV BAR */
.nav {
    background-color: var(--primary-color);
    padding: 1rem;
    position: sticky;
    top: 0;
    left: 0;
    box-shadow: 2px 0px 5px var(--dark-secondary-color);
    z-index: 1;
}

.nav .inner-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1300px;
    margin-inline: auto;
}

.logo {
    color: var(--light-color);
}

nav ul {
    display: flex;
    list-style: none;
    align-items: center;
    gap: 2rem;
    color: var(--light-color);
}

.navs-icon-container {
    display: flex;
    align-items: center;
    color: var(--light-color);
}

.navs-icon-container svg {
    height: 1.5rem;
    color: var(--light-color);
    padding-left: 1rem;
}

.navs-icon-container .shopping-cart-btn {
    position: relative;
}

.search-input-container {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-bottom: 1px solid var(--light-color);
    padding: 0.5rem;
    margin-right: 1rem;
}

.search-input-container input {
    border: none;
    outline: none;
    background-color: var(--primary-color);
    color: var(--light-color);
}

.search-input-container svg {
    height: 1rem;
}

.search-input-container ::placeholder {
    color: var(--light-color);
}

nav ul li:hover {
    transform: translateY(-4px);
    transition: all 0.2s;
    font-weight: bold;
}

.menu-button {
    display: none;
}

/* END NAV BAR */

@media (max-width:920px) {
    .nav h1 {
        font-size: 1.2rem;
    }

    .menu-button {
        display: inline-block; /* Exibe o botão quando a tela é menor que 920px */
        color: var(--light-color);
        font-size: 1.5rem;
        padding: 0.5rem;
        cursor: pointer;
    }

    header .inner-content {
        gap: 2rem;
        padding: 1.5rem;
        padding-top: 3rem;
    }

    header h2 {
        font-size: 1.8rem;
    }
    
    nav {
        position: absolute;
        top: 55px;
        left: 0;
        background-color: var(--primary-color);
        width: 100%;
        padding-bottom: 1rem;
    }
    
    nav ul {
        flex-direction: column;
        
    }
    nav ul.show {
        display: flex;
    }

    nav ul li {
        text-align: center;
        padding: 0.8rem;
    
    }
}

@media (max-width:720px) {
    header .inner-content {
        grid-template-columns: 1fr;
    }
}

@media (max-width:580px) {
    .search-input-container {
        display: none;
    }
}

|----pages/
|	|----EventDetails
|	|	|----index.js
// src/pages/EventDetails/index.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

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
            <img src={event.image} alt={event.title} className="event-image" />
            <h1>{event.title}</h1>
            <p><strong>Local:</strong> {event.location}</p>
            <p><strong>Data:</strong> {event.date}</p>
            <p><strong>Descrição:</strong> {event.description}</p>
            <button className="register-button">Inscreva-se</button>
        </div>
    );
}

|	|	|----style.css
/* src/pages/EventDetails/style.css */
.event-details {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.event-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1.5rem;
}

.event-details h1 {
    color: #2D9BF0;
    margin-bottom: 1rem;
}

.event-details p {
    font-size: 1rem;
    color: #365b77;
    margin-bottom: 1rem;
}

.register-button {
    padding: 0.8rem 1.5rem;
    color: #ffffff;
    background-color: #2D9BF0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

.register-button:hover {
    background-color: #1c7fba;
}

|	|----Home
|	|	|----index.js
//src/pages/home/index.js

import './style.css';
import Navbar from '../../components/Navbar/index.js';
import Header from '../../components/Header/index.js';
import EventsList from '../../components/EventList';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className="Home">
            <Navbar />
            <main>
                <Header />
                <div className='page-inner-content'>
                    <div className='section-title'>
                        <h3>Eventos em Destaque</h3>
                        <div className='underline'></div>
                    </div>

                    <div className='main-content'>
                        <EventsList />
                        <Link to='/' className='see-more-btn'>
                            Ver todos os eventos
                        </Link>
                    </div>
                    
                    
                </div>
            </main>
        </div>
    )
};
export default Home;

|	|	|----style.css
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

:root {
    --primary-color:#2D9BF0;
    --secondary-color: #9aa4ac;
    --dark-primary-color: #365b77;
    --dark-secondary-color: #71787e;
    --light-color: #ffffff;
    --dark-color: #2c2c2c;
}

body {
    font-family: sans-serif;
    color: var(--dark-color);
}

a{
    text-decoration: none;
    color: unset;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}
/* NAV BAR */


/* END NAV BAR */



.section-title {
    padding: 2rem;
    margin-top: 1rem;
}

.section-title h3 {
    text-align: center;
    font-size: 1.8rem;
}

.section-title .underline {
    width: 150px;
    height: 2px;
    background-color: var(--primary-color);
    margin: 4px auto 0 auto;
}


/* MEDIA : NAV E HEADER */
@media (max-width:920px) {
    .nav h1 {
        font-size: 1.2rem;
    }

    .menu-button {
        display: inline-block; /* Exibe o botão quando a tela é menor que 920px */
        color: var(--light-color);
        font-size: 1.5rem;
        padding: 0.5rem;
        cursor: pointer;
    }

    header .inner-content {
        gap: 2rem;
        padding: 1.5rem;
        padding-top: 3rem;
    }

    header h2 {
        font-size: 1.8rem;
    }
    
    nav {
        position: absolute;
        top: 55px;
        left: 0;
        background-color: var(--primary-color);
        width: 100%;
        padding-bottom: 1rem;
    }
    
    nav ul {
        flex-direction: column;
        
    }
    nav ul.show {
        display: flex;
    }

    nav ul li {
        text-align: center;
        padding: 0.8rem;
    
    }
}

@media (max-width:720px) {
    header .inner-content {
        grid-template-columns: 1fr;
    }
}

@media (max-width:580px) {
    .search-input-container {
        display: none;
    }
}

|	|----Login
|	|	|----index.js
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
                        <span className="login-form-title">Bem Vindo ao GEC!</span>

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

|	|	|----style.css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    font-weight: bold;
}

/* START LOGIN AND REGISTER */
.container {
    width: 100%;
    margin: 0 auto;
}

.container-login {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center; 
    padding: 15px;
    background-color: #eff0ef;
}

.wrap-login {
    max-width: 400px;
    width: 100%;
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;
    padding: 30px;
    box-shadow: 0 1px 15px 0 #999999;
    
}
.bannerLogin {
    width: 70%;
}

.login-form {
    width: 100%;
}

.login-form-title {
    display: block;
    font-size: 1rem;
    color: #000;
    line-height: 1.2;
    text-align: center;
    margin-bottom: 20px;
}

.login-form-title img {
    font-size: 90px;
}

.wrap-input {
    width: 100%;
    position: relative;

}
.title-input {
    color: #000;
    font-size: 0.9rem;
    font-weight:400;
}

.box-input {
    width: 100%;
    height: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    padding-left: 10px;
}

.login-form-btn {
    font-size: 15px;
    border: none;
    background-color: #2D9BF0;
    color:#fff;
    line-height: 1.2;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 15px;
    margin-bottom: 15px;
    box-shadow: 0 5px 10px 0 rgb(153, 153, 153);
}

.txt1 {
    font-size: 0.9rem;
    color: #999999;
    line-height: 1.5;
    text-decoration: none;
}

.txt2 {
    font-size: 0.9rem;
    color: #2D9BF0;
    line-height: 1.5;
    text-decoration: none;
    
    
}

|	|----Register
|	|	|----index.js
// src/pages/register/index.js
import React, { useState } from 'react'; 
import bannerLogin from '../../assets/banner-login.jpg';
import './style.css';
import { Link } from 'react-router-dom';
import { register } from '../../services/api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

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

|	|	|----style.css
|----services/
|	|----api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const register = (name, email, password) => {
  return api.post('/register', { name, email, password });
};
|----App.js
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import EventDetails from './pages/EventDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

|----index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


.gitignore
package-lock.json
package.json
README.md
