import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { TodoList } from "./TodoList";

export const TodoApp = () => {
  return (
    <>
      <hr />
      <hr />

      <Grid
        container
        spacing={3}
        sx={{ maxWidth: "97%", position: "relative", left: "3%" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            alignItems: "center",
            backgroundColor: "rgba(233, 223, 229,0.7)",
            borderRadius: 6,
            padding: 3,
            maxWidth: "80%",
            height: "80vh", // Establece una altura fija para el contenedor}
            overflowY: "auto", // Agrega scroll vertical si es necesario
          }}
        >
          <Paper
            sx={{
              minHeight: "50%",
              maxHeighth: "100%", // Ocupa el 100% del espacio del Grid
              display: "flex",
              maxWidth: "100%",
              flexDirection: "column",
              overflowY: "auto", // Agrega scroll vertical si es necesario
            }}
          >
            <TodoList />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
