import React from "react";
import { Grid } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { TodoApp } from "../components/TodoApp";

export const TodoAppLayout = () => {
  return (
    <>
      <>
        <Grid
          container
          sx={{
            backgroundColor: "rgba(248, 248, 255,1)",
            height: "100vh",
            display: "flex",
            justifyContent: "center", // Centra el contenido horizontalmente
            alignItems: "center", // Centra el contenido verticalmente
          }}
        >
          <Grid
            item
            xs={10}
            sx={{
              backgroundColor: "rgba(248, 248, 255)",
              display: "flex",
              flexDirection: "column",
              padding: "30px",
              margin: "40px",
              width: "100%", // Ocupa todo el espacio del contenedor
              maxWidth: "1200px", // Puedes ajustar el maxWidth según tu diseño
              borderRadius: "1%",
            }}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <NavBar />
            <TodoApp />
          </Grid>
        </Grid>
      </>
    </>
  );
};
