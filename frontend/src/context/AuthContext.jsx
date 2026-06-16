import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import socket from "../socket";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);

      const decoded = jwtDecode(storedToken);
      setUser(decoded);

      socket.connect();
      socket.emit("join-org", decoded.organizationId);
    }
  }, []);

  const login = (jwt) => {
    localStorage.setItem("token", jwt);

    const decoded = jwtDecode(jwt);

    setToken(jwt);
    setIsAuthenticated(true);
    setUser(decoded);

    socket.connect();
    socket.emit("join-org", decoded.organizationId);
  };

  const logout = () => {
    socket.disconnect();

    localStorage.removeItem("token");

    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);