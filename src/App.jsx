import ContactList from "../pages/ContactList";
import { useContacts } from "../contexts/contactContext.jsx";
import Navbar from "../components/Navbar.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddEdit from "../components/AddEdit.jsx";

function App() {
  const { loading } = useContacts();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <ContactList /> },
        { path: "add", element: <AddEdit /> },
        { path: "contacts", element: <ContactList /> },
      ],
    },
  ]);
  if (loading) return <div></div>;

  return <RouterProvider router={routes} />;
}

export default App;
