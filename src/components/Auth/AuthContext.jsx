import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

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
      navigate("/login");
    }
  }, [navigate]);

  // Memoize the login function
  const login = useCallback(
    (userData) => {
      setUser(userData);
      localStorage.setItem("signedInUser", JSON.stringify(userData));
      setAuthenticated(true);
      navigate("/home");
    },
    [navigate]
  );

  // Memoize the logout function
  const logout = useCallback(() => {
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem("signedInUser");
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
