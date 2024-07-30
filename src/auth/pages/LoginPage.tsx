import React, { useContext, useEffect } from "react";
import { Grid, Button, Link, TextField, Alert } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout/AuthLayout";
import { findUserByEmail } from "../../hooks/userService";
import axios from "axios";

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [
    (value: string) => value.includes("@"),
    "El correo debe de tener una @",
  ] as [(value: string) => boolean, string],
  password: [
    (value: string) => value.length >= 6,
    "El password debe de tener más de 6 letras",
  ] as [(value: string) => boolean, string],
};

export const LoginPage = () => {
  const {
    email,
    password,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);
  const { isAuthenticated, login, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    try {
      const response = await axios.post("http://localhost:3001/auth/google", {
        token,
      });
      loginWithGoogle(response.data.token); // Asegúrate de que `response.data.token` es el token correcto
    } catch (error) {
      console.error("Error en la autenticación con Google:", error);
    }
  };

  const handleGoogleError = (error: any) => {
    console.error("Error en la autenticación con Google:", error);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) return;

    // Verificar credenciales
    const user = findUserByEmail(email);
    if (user && user.password === password) {
      login(email, password); // Actualiza el estado de autenticación
    } else {
      console.error("Credenciales incorrectas");
    }
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </Grid>
      </form>
    </AuthLayout>
  );
};
