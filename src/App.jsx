<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
=======
import { useState } from "react";
import "./App.css";
>>>>>>> feature/Pauline-Authorization

function App() {
  const [count, setCount] = useState(0);

  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        {routes.map((r, index) => (
          <Route key={index} path={r.path} element={r.element} />
        ))}
      </Routes>
    </Router>
=======
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
        </a>
        <a href="https://react.dev" target="_blank">
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
>>>>>>> feature/Pauline-Authorization
  );
}

export default App;
