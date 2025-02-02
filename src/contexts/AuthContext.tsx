import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../utils/api";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  authToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // new loading state

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      // Fetch user profile from backend
      const fetchUser = async () => {
        try {
          const response = await api.get("/user/me");
          setUser(response.data);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch user data", error);
          logout(); // clear token if invalid
        } finally {
          setIsLoading(false); // Done loading regardless of outcome
        }
      };
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(`/auth/login`, { email, password }, { withCredentials: true });
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        setAuthToken(response.data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        // Fetch user profile after login
        const userResponse = await api.get("/user/me");
        setUser(userResponse.data);
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await api.post(`/auth/register`, { username, email, password }, { withCredentials: true });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, authToken, login, register, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
