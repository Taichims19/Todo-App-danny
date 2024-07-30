import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { Todo } from "../../helpers/interfaces";

interface TodoAddProps {
  onNewTodo: (todo: Todo) => void;
}

export const TodoAdd: React.FC<TodoAddProps> = ({ onNewTodo }) => {
  const { formState, onInputChange, onResetForm } = useForm({
    title: "",
    description: "",
  });

  const { title, description } = formState;

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.length <= 1 || description.length <= 1) return;

    const newTodo: Todo = {
      id: new Date().getTime(), // Genera un ID único
      done: false,
      title: title,
      description: description,
      createdAt: new Date(), // Usa un objeto Date aquí
    };

    onNewTodo(newTodo);
    onResetForm();
  };

  return (
    <Box
      component="form"
      onSubmit={onFormSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Título"
        name="title"
        value={title}
        onChange={onInputChange}
        variant="outlined"
        fullWidth
        sx={{ background: "rgba(107, 110, 242, 0.5)" }}
      />
      <TextField
        label="Descripción"
        name="description"
        value={description}
        onChange={onInputChange}
        variant="outlined"
        multiline
        rows={8}
        fullWidth
        sx={{ background: "rgba(107, 110, 242, 0.5)" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          background: "rgba(107, 110, 242, 0.8)",
          width: "15%",
          position: "relative",
          top: "5%",
          left: "40%",
        }}
      >
        Agregar
      </Button>
    </Box>
  );
};
