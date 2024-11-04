//src/pages/home/index.js

import './style.css';
import Navbar from '../../components/Navbar/index.js';
import Header from '../../components/Header/index.js';
import Footer from '../../components/Footer/index.js';
import { Link } from 'react-router-dom';
import RecentEventsList from '../../components/RecentEventsList/index.js';

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
                        <RecentEventsList />
                        <Link to='/AllEvents' className='see-more-btn'>
                            Ver todos os eventos
                        </Link>
                    </div>
                    
                    
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
};
export default Home;
