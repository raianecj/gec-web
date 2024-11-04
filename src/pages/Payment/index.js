import React from 'react'
import './style.css';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function Payment() {
  return (
    <>
      <div className='payment__navbar'>
        <Navbar />
      </div>
      <div className='payment__inner-content'>
        <div className='payment__card-content'>
        <div className='payment__title'>
          <h1>Pagamento</h1>
        </div>
        </div>
      </div>
      <div className='payment__footer'>
        <Footer />
      </div>

    </>
  )
};

export default Payment;
