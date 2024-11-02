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
