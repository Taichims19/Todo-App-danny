import React, { useState } from "react";
import {
  Grid,
  Button,
  Link,
  TextField,
  Alert,
  Typography,
  Box,
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
    <AuthLayout title="">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          background: "rgb(50, 130, 181)",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            minHeight: "80vh",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Registro
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "rgba(122, 49, 240, 0.8)", // Color del label cuando está en estado normal
                    },
                    "& .MuiInputLabel-shrink": {
                      color: "rgba(122, 49, 240, 0.8) !important", // Color del label cuando está arriba
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.5)", // Color del borde
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.7)", // Color del borde cuando pasa el mouse
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.9)", // Color del borde cuando está enfocado
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "rgba(122, 49, 240, 0.8)", // Color del label cuando está en estado normal
                    },
                    "& .MuiInputLabel-shrink": {
                      color: "rgba(122, 49, 240, 0.8) !important", // Color del label cuando está arriba
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.5)", // Color del borde
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.7)", // Color del borde cuando pasa el mouse
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.9)", // Color del borde cuando está enfocado
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "rgba(122, 49, 240, 0.8)", // Color del label cuando está en estado normal
                    },
                    "& .MuiInputLabel-shrink": {
                      color: "rgba(122, 49, 240, 0.8) !important", // Color del label cuando está arriba
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.5)", // Color del borde
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.7)", // Color del borde cuando pasa el mouse
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.9)", // Color del borde cuando está enfocado
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Alert severity="error">
                  Por favor complete el formulario correctamente
                </Alert>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "rgba(122, 49, 240, 0.8)",
                    height: "38px",
                    "&:hover": {
                      background: "rgba(122, 49, 240, 0.6)",
                    },
                  }}
                >
                  Crear Cuenta
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ textAlign: "center", marginTop: "10px" }}
              >
                <Typography>
                  ¿Ya tienes una cuenta?{" "}
                  <Link component={RouterLink} color="inherit" to="/auth/login">
                    Iniciar sesión
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </AuthLayout>
  );
};
