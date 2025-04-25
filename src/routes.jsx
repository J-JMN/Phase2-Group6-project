import App from "./App";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import SettingsPage from "./pages/Settings";
import ShoppingList from "./pages/ShoppingList";

const routes = [
  {
    path: "/",
    element: <App />,  // App is now the layout
    children: [
      { path: "login", element: <Login /> },
      { path: "home", element: <ShoppingList /> },
      { path: "inventory", element: <Inventory /> },
      { path: "settings", element: <SettingsPage /> },
    ]
  },
];
export default routes;
