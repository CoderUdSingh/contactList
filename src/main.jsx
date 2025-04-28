import { createRoot } from "react-dom/client";
import "./index.css";
import { ContactContextProvider } from "../contexts/contactContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ContactContextProvider>
    <App />
  </ContactContextProvider>
);
