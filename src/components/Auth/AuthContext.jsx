import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const user = JSON.parse(localStorage.getItem("signedInUser"));

  useEffect(()=>{
    if(user){
      setAuthenticated(true)
    }else{
      setAuthenticated(false)
      navigate("/login");
    }
  },[])

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

