// src/components/Footer/index.js

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import './style.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h4>Links Úteis</h4>
                    <a href="/privacy-policy">Política de Privacidade</a>
                    <a href="/terms">Termos de Serviço</a>
                    <a href="/contact">Contato</a>
                </div>
                <div className="footer-column">
                    <h4>Acesso</h4>
                    <a href="/login">Login</a>
                    <a href="/register">Cadastre-se</a>
                    <a href="/organizer">Sou um organizador</a>
                </div>
                <div className="footer-column">
                    <h4>Siga-nos</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
            <div className='footer-copy'>
            <p>&copy; 2024 HI RUNNERS. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
