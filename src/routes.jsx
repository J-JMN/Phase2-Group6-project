import App from "./App";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import SettingsPage from "./pages/Settings";
import ShoppingList from "./pages/ShoppingList";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./components/Auth/AuthContext"; 

const routes = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ), 
    children: [
      { path: "home", element: <ShoppingList /> },
      { path: "inventory", element: <Inventory /> },
      { path: "settings", element: <SettingsPage />},
    ],
  },
  { path: "login", element: <Login /> },
  { path: "signUp", element: <SignUp /> },
];

export default routes;