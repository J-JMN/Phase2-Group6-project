import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* Toastify container */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default App;