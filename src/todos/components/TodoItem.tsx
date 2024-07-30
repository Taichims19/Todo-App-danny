import React, { useContext, useState } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Modal,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NotesContext } from "../../context/NoteContext";
import { Todo } from "../../helpers/interfaces";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { deleteNote, editNote } = useContext(NotesContext);
  const [newDescription, setNewDescription] = useState(todo.description);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    editNote(todo.id, {
      ...todo,
      description: newDescription,
      createdAt: todo.createdAt, // Asegúrate de que la fecha se mantenga
    });
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ marginBottom: "16px" }}>
        <ListItem
          sx={{
            background: "white",
            padding: "6px",
            marginBottom: 0,
            display: "flex",
            border: "none",
            alignItems: "flex-start", // Alinea los elementos al inicio del contenedor
            flexDirection: "row", // Alinea los elementos en una fila
            gap: 1, // Espacio entre el checkbox y el contenido
          }}
          secondaryAction={
            <>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={handleOpen}
                sx={{
                  background: "rgba(233, 223, 229,1)",
                  borderRadius: 2,
                  marginRight: 2,
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteNote(todo.id)}
                sx={{
                  background: "rgba(233, 223, 229,1)",
                  borderRadius: 2,
                  marginRight: 2,
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <Checkbox
            checked={todo.done}
            onChange={() => editNote(todo.id, { ...todo, done: !todo.done })}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 40,
              },
            }}
            style={{
              backgroundColor: todo.done
                ? "rgba(107, 110, 242, 1)"
                : "rgba(233, 223, 229,0.7)",
              borderRadius: "10%",
              marginTop: 10,
              marginLeft: 3,
              width: 35,
              height: 35,
            }}
          />
          <ListItemText
            sx={{ background: "white" }}
            primary={
              <Typography
                variant="h6"
                onClick={handleOpen}
                sx={{
                  textDecoration: todo.done ? "line-through" : "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  mb: 0, // Espacio debajo del título
                }}
              >
                {todo.title}
              </Typography>
            }
            secondary={
              <>
                <Typography
                  variant="body2"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    whiteSpace: "nowrap",
                    fontSize: "16px",
                    paddingBottom: 0,
                    textOverflow: "ellipsis",
                  }}
                >
                  {todo.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  fontWeight={900}
                  sx={{ mt: 1 }} // Espacio arriba de la fecha
                >
                  {new Date(todo.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  {new Date(todo.createdAt).toLocaleDateString()}
                </Typography>
              </>
            }
          />
        </ListItem>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "70%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {todo.title}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={12}
            margin="normal"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={handleSave}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteNote(todo.id)}
            >
              Eliminar
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
