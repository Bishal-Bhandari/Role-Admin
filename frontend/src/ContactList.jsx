import React from "react"

const ContactList = ({ contacts }) => {
    return <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>  
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
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