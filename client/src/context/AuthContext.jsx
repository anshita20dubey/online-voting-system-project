import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Try decoding the token
        setUser({ username: decoded.username, token });
      } catch (error) {
        console.error("Invalid token:", error.message); // Handle invalid token
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser({ username: data.username, token: data.token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
