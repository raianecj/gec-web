import React from 'react';
import './styles/global.css';
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import EventDetails from './pages/EventDetails';
import Payment from "./pages/Payment";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllEvents from './pages/AllEvents';
import EventRegistration from "./pages/EventRegistration";
import Profile from './pages/Profile';
import Registrations from './pages/Registrations';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/allEvents" element={<AllEvents />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/register/:eventId" element={<EventRegistration />} />
        <Route path="/registrations" element={<Registrations />} />
      </Routes>
    </Router>
  );
}

export default App;
