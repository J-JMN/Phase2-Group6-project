import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("signedInUser"));
    if (storedUser) {
      setUser(storedUser);
      setAuthenticated(true); 
    } else {
      setAuthenticated(false);
    }
  }, []); 

  useEffect(() => {
    if (isAuthenticated && window.location.pathname === '/login') {
      navigate("/home"); 
    } else if (!isAuthenticated && window.location.pathname !== '/login') {
      navigate("/login"); 
    }
  }, [isAuthenticated, navigate]); 

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("signedInUser", JSON.stringify(userData)); 
    setAuthenticated(true);
    navigate("/home"); 
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem("signedInUser"); 
    navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}