import React, { useEffect } from "react";
import {
  Grid,
  Button,
  Link,
  TextField,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

import { useForm } from "../../hooks/useForm";
import { AuthLayout } from "../layout/AuthLayout";
import GoogleLoginButton from "../../todos/components/GoogleLoginButton";

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

  const { state, login, error } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/");
    }
  }, [state.isAuthenticated, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) return;

    login(email, password);
  };

  return (
    <AuthLayout title="">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
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
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Bienvenido
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: emailValid
                          ? "rgba(122, 49, 240, 0.5)"
                          : "",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.7)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.9)",
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    style: {
                      fontSize: "14px",
                      color: passwordValid ? "rgb(14, 76, 117)" : "",
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
                  error={!!passwordValid}
                  helperText={passwordValid}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: emailValid
                          ? "rgba(122, 49, 240, 0.5)"
                          : "",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.7)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.9)",
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    style: {
                      fontSize: "14px",
                      color: passwordValid ? "rgb(14, 76, 117)" : "",
                    },
                  }}
                  // FormHelperTextProps={{
                  //   style: {
                  //     fontSize: "14px",
                  //     color: passwordValid ? "rgba(122, 49, 240, 0.5)" : "",
                  //   },
                  // }}
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              <Grid item xs={6}>
                <Button
                  type="submit"
                  sx={{
                    background: "rgba(122, 49, 240, 0.8)",
                    width: "50%",
                    height: "38px",
                    position: "relative",
                    left: "1%",
                    "&:hover": {
                      background: "rgba(122, 49, 240, 0.6)", // Color de fondo más opaco al pasar el mouse
                    },
                  }}
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "center" }}>
                <GoogleLoginButton />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ textAlign: "center", marginTop: "10px" }}
              >
                <Link
                  component={RouterLink}
                  color="inherit"
                  to="/auth/register"
                >
                  Crear una cuenta
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </AuthLayout>
  );
};
