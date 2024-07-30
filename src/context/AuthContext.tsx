import React, { createContext, useState, ReactNode, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { findUserByEmail, saveUser } from "../hooks/userService";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, displayName: string) => void;
  loginWithGoogle: (token: string) => void;
}

const defaultAuthContextValue: AuthContextValue = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  register: () => {},
  loginWithGoogle: () => {},
};

export const AuthContext = createContext<AuthContextValue>(
  defaultAuthContextValue
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuthState = localStorage.getItem("isAuthenticated");
    return savedAuthState ? JSON.parse(savedAuthState) : false;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = (email: string, password: string) => {
    const user = findUserByEmail(email);
    if (user && user.password === password) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      navigate("/"); // Redirigir después del inicio de sesión
    } else {
      console.error("Credenciales inválidas");
    }
  };

  const register = (email: string, password: string, displayName: string) => {
    const user = { email, password, displayName };
    saveUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
    navigate("/"); // Redirigir después del registro
  };

  const loginWithGoogle = (token: string) => {
    // Validar el token con tu backend o la API de Google aquí si es necesario
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("googleToken", token);
    navigate("/"); // Redirigir después de iniciar sesión con Google
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("googleToken");
    googleLogout(); // Cerrar sesión en Google
    navigate("/auth/login"); // Redirigir al inicio de sesión después de cerrar sesión
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, register, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
