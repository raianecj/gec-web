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
