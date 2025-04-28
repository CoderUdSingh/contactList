import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar">
        <div className="navtitle">
          <h2 onClick={() => navigate("/")}>Contact List</h2>
        </div>
        <div className="navdiv">
          <button onClick={() => navigate("/")}>Contacts</button>
          <button onClick={() => navigate("/add")}>Add New Contact</button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
