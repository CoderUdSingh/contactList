import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const contactContext = createContext();

export const useContacts = () => {
  const contacts = useContext(contactContext);
  // const contacts = "hello";
  return contacts;
};

export const ContactContextProvider = ({ children }) => {
  const [allContacts, setAllcontacts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        const finalContacts = await data.json();
        console.log("final contacts", finalContacts);
        setAllcontacts((prev) => [...prev, ...finalContacts]);
        // setAllcontacts([...allContacts, ...finalContacts]);
        setLoading(false);
      } catch (error) {
        console.log(`This is the error ${error}`);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  console.log("here are all contacts", allContacts);

  return (
    <contactContext.Provider value={{ allContacts, setAllcontacts, loading }}>
      {children}
    </contactContext.Provider>
  );
};
