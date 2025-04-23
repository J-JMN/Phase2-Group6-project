import App from "./App";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import ShoppingList from "./pages/ShoppingList";

const routes = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <ShoppingList />
    },
    {
        path: "/inventory",
        element: <Inventory />
    },
    {
        path: "/settings",
        element: <Settings />
    },
];

export default routes;