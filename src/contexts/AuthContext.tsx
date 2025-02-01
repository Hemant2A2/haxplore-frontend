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
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });
    const userData = response.data;
    setUser(userData);
    setIsAuthenticated(true);
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      setAuthToken(response.data.token);
    }
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    await api.post(`/auth/register`, {
      username,
      email,
      password,
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, authToken, login, register, logout, isAuthenticated }}
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
