import { useEffect } from "react";
import './App.css'
//import "./styles/app.styles.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Services from "./Pages/Services/Services.jsx";
import Service from "./Pages/Service/Service.jsx";
import Header from "./components/Header/Header.jsx";
import Booking from "./Pages/Booking/Booking.jsx";
import Success from "./Pages/Success/Success";


function App() {
  useEffect(() => {
    async function getBooking() {
      const response = await fetch("http://localhost:8080/");
      const result = await response.json();
      console.log(result);
    }
    getBooking();
  }, []);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/all/:id" element={<Service />} />
          <Route path="/bookings/:id" element={<Booking />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
