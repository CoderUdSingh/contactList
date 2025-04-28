import React from "react";
import { useContacts } from "../contexts/contactContext";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const { allContacts, setAllcontacts } = useContacts();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const dummyContacts = [...allContacts];
    const index = dummyContacts.findIndex((item) => item.id == id);

    if (index != -1) {
      dummyContacts.splice(index, 1);
    }

    setAllcontacts([...dummyContacts]);
  };
  return (
    <>
      {allContacts.length > 0 && (
        <div className="contact_list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allContacts.map((contact) => (
                <>
                  <tr key={contact.id}>
                    <th>{contact.name}</th>
                    <th>{contact.email}</th>
                    <th>{contact.phone}</th>
                    <th>
                      <button
                        onClick={() =>
                          navigate("/add", {
                            state: { isEdit: true, id: contact.id },
                          })
                        }
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(contact.id)}>
                        <FaTimes />
                      </button>
                    </th>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ContactList;
