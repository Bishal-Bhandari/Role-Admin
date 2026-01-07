import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({})
  // Fetch contacts on page load
  useEffect(() => {
    fetchContacts();
  }, []);

  // GET contacts
  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts");
      const data = await response.json();
      setContacts(Array.isArray(data.contacts) ? data.contacts.filter(Boolean) : []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  // Open modal
  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)  
  }

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  }

  return (
    <>
      <h1>Contact Manager</h1>

      <ContactList contacts={contacts} updateContact = {openEditModal} updateCallback={onUpdate}/>

      <button onClick={openCreateModal}>Create Contact</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <ContactForm
              existingContact={currentContact}
              updateCallback={onUpdate}/>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
