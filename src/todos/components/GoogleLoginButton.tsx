import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "../../context/AuthContext";

const GoogleLoginButton = () => {
  const { loginWithGoogle } = useAuthContext();

  const handleLoginSuccess = (credentialResponse: any) => {
    console.log("Credential Response:", credentialResponse); // Verifica la respuesta aquí
    const token = credentialResponse.credential;
    if (token) {
      loginWithGoogle(token);
    } else {
      console.error("No se pudo obtener el token");
    }
  };

  const handleLoginError = (error: any) => {
    console.error("Error en la autenticación con Google:", error);
  };

  return (
    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
  );
};

export default GoogleLoginButton;
