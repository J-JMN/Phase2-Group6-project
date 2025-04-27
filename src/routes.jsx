import App from "./App";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import SettingsPage from "./pages/Settings";
import ShoppingList from "./pages/ShoppingList";
import SignUp from "./pages/SignUp";

const routes = [
  {
    path: "/",
    element: <App />, // App is now the layout
    children: [
      { path: "home", element: <ShoppingList /> },
      { path: "inventory", element: <Inventory /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "SignUp", element: < SignUp /> },
];
export default routes;