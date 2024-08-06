import React from "react";
import { List, Typography, Box } from "@mui/material";
import { useNotesContext } from "../../context/NoteContext"; // Asegúrate de la ruta correcta
import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const { notes } = useNotesContext();

  return (
    <Box
      sx={{
        flexGrow: 1, // Ocupa el espacio disponible
        overflowY: "auto", // Agrega scroll vertical si es necesario
        maxHeight: "100%", // Ocupa el 80% del alto del contenedor padre
        maxWidth: "100%", // Ocupa el 80% del alto del contenedor padre
        backgroundColor: "rgba(233, 223, 229,0.7)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Opcional: Añade una sombra para resaltar el contenedor
        padding: 2,
        borderRadius: 1,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      {notes.length === 0 ? (
        <Typography
          variant="h4"
          align="center"
          color="violet"
          sx={{ position: "relative", top: "50%" }}
        >
          Aún no hay notas disponibles
        </Typography>
      ) : (
        <List>
          {notes.map((note) => (
            <TodoItem key={note.id} todo={note} />
          ))}
        </List>
      )}
    </Box>
  );
};
