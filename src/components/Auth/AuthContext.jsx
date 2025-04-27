import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [appData, setAppData] = useState(null);
  const navigate = useNavigate();

  const login = useCallback(
    async (userData) => {
      setUser(userData);
      localStorage.setItem("signedInUser", JSON.stringify(userData));
      setAuthenticated(true);
      navigate("/home");
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setAuthenticated(false);
    setUser(null);
    setAppData(null);
    localStorage.removeItem("signedInUser");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("signedInUser"));
    if (storedUser) {
      setUser(storedUser);
      setAuthenticated(true);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      user,
      appData,
      login,
      logout,
      setAppData,
    }),
    [isAuthenticated, user, appData, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
