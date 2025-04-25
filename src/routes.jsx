import App from "./App";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import SettingsPage from "./pages/Settings";
import ShoppingList from "./pages/ShoppingList";
import Register from "./pages/Register";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <ShoppingList />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
];

export default routes;