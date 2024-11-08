import React from 'react';
import './styles/global.css';
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import EventDetails from './pages/EventDetails';
import Payment from "./pages/Payment";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllEvents from './pages/AllEvents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/allEvents" element={<AllEvents />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
