import { AuthProvider } from "./components/Auth/AuthContext";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ShoppingList from "./pages/ShoppingList";
import Inventory from "./pages/Inventory";
import SettingsPage from "./pages/Settings";

const AuthLayout = ({ children }) => <AuthProvider>{children}</AuthProvider>;

const routes = [
  {
    path: "/",
    element: (
      <AuthLayout>
        <App />
      </AuthLayout>
    ),
    children: [
      { index: true, element: <ShoppingList /> },
      { path: "home", element: <ShoppingList /> },
      { path: "inventory", element: <Inventory /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout>
        <SignUp />
      </AuthLayout>
    ),
  },
];

export default routes;
