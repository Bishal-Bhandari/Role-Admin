import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState([])

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch('http://localhost:8000/contacts/')
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }
  
  return (
    <>
      
    </>
  )
}

export default App
