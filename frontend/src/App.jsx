import { useEffect } from "react";
import './App.css'
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";

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
    <div className="App">
     <h1>Welcome To Link-i</h1>
    </div>
  )
}

export default App
