import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { TodoApp } from "./TodoApp";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NoteContext";

const clientId =
  "57099475778-uofde3chgs8sk25s7vnvb01p57u5kav1.apps.googleusercontent.com";

interface User {
  email: string;
  password: string;
  displayName: string;
}

const initializeLocalStorage = (): void => {
  if (!localStorage.getItem("users")) {
    const initialUsers: User[] = [];
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }
};

// Llama a la función para inicializar el localStorage
initializeLocalStorage();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <AuthProvider>
          <NotesProvider>
            <TodoApp />
          </NotesProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
