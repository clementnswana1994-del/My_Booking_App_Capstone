import { useEffect } from "react";
import './App.css'
//import "./styles/app.styles.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Rooms from "./Pages/Services/Services";
import Room from "./Pages/Service/Service";
import Header from "./components/Header/Header";
import Booking from "./Pages/Booking/Booking";
import Success from "./Pages/Success/Success";


function App() {
  useEffect(() => {
    async function test() {
      const response = await fetch("http://localhost:8080");
      const result = await response.json();
      console.log(result);
    }
    test();
  }, []);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/all/:id" element={<Room />} />
          <Route path="/bookings/:id" element={<Booking />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
