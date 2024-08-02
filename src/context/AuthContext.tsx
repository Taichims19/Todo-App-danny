import React, { createContext, useState, ReactNode, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { findUserByEmail, saveUser } from "../hooks/userService";
import axios from "axios";

interface AuthContextValue {
  isAuthenticated: boolean;
  userEmail: string | null;
  displayName: string | null; // Agrega esto
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, displayName: string) => void;
  loginWithGoogle: (code: string) => void; // Solo un argumento
}

const defaultAuthContextValue: AuthContextValue = {
  isAuthenticated: false,
  userEmail: null,
  displayName: null, // Agrega esto
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
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem("userEmail");
  });
  const [displayName, setDisplayName] = useState<string | null>(() => {
    return localStorage.getItem("displayName");
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    } else {
      localStorage.removeItem("userEmail");
    }
  }, [userEmail]);

  useEffect(() => {
    if (displayName) {
      localStorage.setItem("displayName", displayName);
    } else {
      localStorage.removeItem("displayName");
    }
  }, [displayName]);

  const login = (email: string, password: string) => {
    const user = findUserByEmail(email);
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setDisplayName(user.displayName); // Agrega esto
      navigate("/"); // Redirigir después del inicio de sesión
    } else {
      console.error("Credenciales inválidas");
    }
  };

  const register = (email: string, password: string, displayName: string) => {
    const user = { email, password, displayName };
    console.log("Registering user:", user); // Agrega esto para depurar
    saveUser(user);
    setIsAuthenticated(true);
    setUserEmail(email);
    setDisplayName(displayName); // Agrega esto
    navigate("/"); // Redirigir después del registro
  };

  const loginWithGoogle = (token: string) => {
    // Decodificar el token para obtener el email del usuario
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((userInfo) => {
        const email = userInfo.email;
        setIsAuthenticated(true);
        setUserEmail(email);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        navigate("/"); // Redirigir después de iniciar sesión con Google
      })
      .catch((error) => {
        console.error("Error en la autenticación con Google:", error);
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setDisplayName(null); // Agrega esto
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("googleToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("displayName"); // Agrega esto
    googleLogout(); // Cerrar sesión en Google
    navigate("/auth/login"); // Redirigir al inicio de sesión después de cerrar sesión
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        register,
        loginWithGoogle,
        logout,
        userEmail,
        displayName, // Agrega esto
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
