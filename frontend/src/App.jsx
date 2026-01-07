import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchContacts()
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts.filter(Boolean));
    console.log(data.contacts);
  }

  const closreModal = () => {
    setIsModalOpen(false);
  }

  const openCreateModal = () => {
    if (!isModelOpen) setIsModalOpen(true);
  }

  return (
    <>
  <ContactList contacts={contacts}/>
  <button onClick={openCreateModal}>Create Contact</button>
  {isModelOpen && <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closreModal}>&times;</span>
      <ContactForm />
    </div>
  </div>

  }
  <ContactForm/>
  </>
);

}

export default App;
