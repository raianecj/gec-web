import React from 'react'
import './style.css';
import Navbar from '../../components/Navbar/index.js';
import EventsList from '../../components/EventList';
import Footer from '../../components/Footer/index.js';

export default function AllEvents() {
  return (
    <div className='AllEvents'>
        <Navbar />
        <main>
            <div className='allevents__page-inner-content'>
                <div className='allevents__section-title'>
                    <h3>Todos os Eventos</h3>
                </div>
                <div className='allevents__underline'>
                </div>
                <div className='allevents__main-content'>
                    <EventsList />
                </div>

            </div>
        </main>
        <footer>
            <Footer />
        </footer>




    </div>
  )
}
