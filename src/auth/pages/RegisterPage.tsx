import React, { useState } from "react";
import {
  Grid,
  Button,
  Link,
  TextField,
  Alert,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";

import { AuthLayout } from "../layout/AuthLayout";

const initialForm = {
  displayName: "",
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
  displayName: [
    (value: string) => value.length >= 1,
    "El nombre es obligatorio",
  ] as [(value: string) => boolean, string],
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { register } = useAuthContext(); // Solo necesitas `register`

  const {
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(initialForm, formValidations);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    // Usar la función `register` del AuthContext
    register(email, password, displayName);
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Tu Nombre"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid
              item
              xs={12}
              display={
                !!displayNameValid || !!emailValid || !!passwordValid
                  ? ""
                  : "none"
              }
            >
              <Alert severity="error">
                Por favor complete el formulario correctamente
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Iniciar sesión
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
