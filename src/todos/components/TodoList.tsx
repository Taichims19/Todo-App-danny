import React, { useContext } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { NotesContext } from "../../context/NoteContext"; // Asegúrate de la ruta correcta
import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const { notes } = useContext(NotesContext); // Obtén solo las notas desde el contexto

  return (
    <List
      sx={{
        flexGrow: 1, // Ocupa el espacio disponible
        overflowY: "auto", // Agrega scroll vertical si es necesario
        maxHeight: "100%", // Ocupa el 80% del alto del contenedor padre
        maxWidth: "100%", // Ocupa el 80% del alto del contenedor padre

        backgroundColor: "rgba(233, 223, 229,0.7)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Opcional: Añade una sombra para resaltar el contenedor
      }}
    >
      {notes.map((note) => (
        <TodoItem key={note.id} todo={note} />
      ))}
    </List>
  );
};
