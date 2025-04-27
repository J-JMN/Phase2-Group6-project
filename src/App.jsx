import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./components/Auth/AuthContext";
import "./App.css"; 

export default function App() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      {" "}
      <Navbar />
      <div className="main-content-wrapper">
        {user && (
          <header className="welcome-header">
            Welcome, <span className="username">{user.name}</span>
          </header>
        )}

        <main className="content-area">
          <Outlet />
        </main>
      </div>
      {/* Toast container */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
        toastClassName="custom-toast"
        progressClassName="toast-progress"
      />
    </div>
  );
}
