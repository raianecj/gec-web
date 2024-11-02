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
