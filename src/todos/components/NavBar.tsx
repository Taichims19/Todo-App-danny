import React, { useContext, useState } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Modal,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { TodoAdd } from "./TodoAdd";
import { NotesContext } from "../../context/NoteContext";
import { useAuthContext } from "../../context/AuthContext";
import { Todo } from "../../helpers/interfaces";
import { LogoutOutlined } from "@mui/icons-material";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { addNote, filter, setFilter } = useContext(NotesContext);
  const { state, logout } = useAuthContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => {
    setFilter(option);
    handleMenuClose();
  };

  const onLogout = () => {
    logout();
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography
            variant="h2"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              marginTop: "10px",
              color: "rgb(101, 103, 128)",
              fontWeight: 700,
            }}
          >
            TODO LIST
          </Typography>

          {/* Muestra el nombre del usuario aquí */}
          {state.displayName && (
            <Typography
              variant="h6"
              component="div"
              sx={{
                marginLeft: 2,
                color: "rgb(101, 103, 128)",
              }}
            >
              {state.displayName}
            </Typography>
          )}

          <IconButton
            color="error"
            sx={{
              position: "relative",
              left: "40%",

              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={onLogout}
          >
            <LogoutOutlined sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Toolbar>

        <Toolbar disableGutters sx={{ width: "100%" }}>
          <Button
            color="inherit"
            onClick={handleOpen}
            sx={{
              marginRight: "auto",
              marginLeft: "1%",
              paddingTop: "0.7%",
              paddingBottom: "0.5%",
              fontSize: "25px",
              width: "15%",
              background: "rgba(107, 110, 242, 1)",
              color: "white",
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Crear Nota
          </Button>

          <Button
            color="inherit"
            onClick={handleClick}
            sx={{
              background: "rgba(206, 205, 223, 1)",
              margin: "20px",
              textTransform: "none",
              fontWeight: 700,
              paddingTop: "1%",
              paddingBottom: "1%",
              fontSize: "25px",
              borderRadius: 3,
              textAlign: "left",
              width: "15%",
            }}
          >
            {filter === "All" ? "Todas" : "Una nota"}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuItemClick("All")}>
              Todas las Notas
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Specific")}>
              Una nota
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

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
            borderRadius: "1%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            background: "rgba(206, 205, 223, 1)",
            margin: "20px",
          }}
        >
          <Typography
            id="modal-title"
            variant="h4"
            component="h2"
            sx={{ textAlign: "center", fontSize: "25px", fontWeight: "900" }}
          >
            Añadir nueva tarea
          </Typography>
          <TodoAdd
            onNewTodo={(todo: Todo) => {
              addNote(todo);
              handleClose();
            }}
          />
        </Box>
      </Modal>
    </>
  );
};
