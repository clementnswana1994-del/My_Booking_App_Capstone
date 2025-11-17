import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    async function test() {
      await fetch('http://localhost:8080/')
    }
  }, [])
  const [count, setCount] = useState(0)

  return (
    <>
      
    </>
  )
}

export default App
