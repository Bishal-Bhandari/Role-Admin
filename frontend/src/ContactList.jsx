import React from "react"

const ContactList = ({ contacts }) => {
    return <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th> 
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts
                    .filter(contact => contact !== null)
                    .map(contact => (
                     <tr key={contact.id}>
                     <td>{contact.firstName}</td>
                     <td>{contact.lastName}</td>
                     <td>{contact.email}</td>
                     <td>
                        <button>Edit</button>
                        <button>Delete</button>
                     </td>
                     </tr>
            ))}
            </tbody>
        </table>
    </div>
}

export default ContactList