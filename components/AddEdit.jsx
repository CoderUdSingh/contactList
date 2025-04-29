import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContacts } from "../contexts/contactContext";

const AddEdit = () => {
  const location = useLocation();
  const [formBody, setFormBody] = useState({ name: "", email: "", phone: "" });
  const { allContacts, setAllcontacts } = useContacts();
  const navigate = useNavigate();
  const isEdit = location.state?.isEdit;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormBody((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitAdd = async (e) => {
    e.preventDefault();
    // If component is accessed from the Edit Button
    if (isEdit) {
      try {
        const id = location.state?.id;
        const contactsArr = [...allContacts];

        const index = contactsArr.findIndex((item) => item.id == id);
        if (index != -1) contactsArr[index] = formBody;

        setAllcontacts([...contactsArr]);
        navigate("/");
      } catch (error) {
        console.log("error in updating contact", error);
        navigate("/");
      }
    }
    // If component is accessed from the Add Contact Button
    else {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST",

            body: JSON.stringify(formBody),

            headers: { "Content-type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add contact");
        }
        const newcontact = await response.json();
        setAllcontacts([...allContacts, newcontact]);
        navigate("/");
      } catch (error) {
        console.log("error in adding contact", error);
        navigate("/");
      }
    }
  };

  return (
    <div className="addeditbox">
      <div className="addeditform">
        <h2>{isEdit ? "Edit Contact" : "Add Contact"}</h2>
        <form onSubmit={onSubmitAdd}>
          <div className="details">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formBody.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="details">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formBody.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
            />
          </div>
          <div className="details">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formBody.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="submit-btn">
            <input
              type="submit"
              value={isEdit ? "Update Contact" : "Add Contact"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEdit;
