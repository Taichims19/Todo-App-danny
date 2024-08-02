import React, {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { Todo, NotesContextValue } from "../helpers/interfaces";
import { AuthContext } from "./AuthContext";

const defaultNotesContextValue: NotesContextValue = {
  notes: [],
  addNote: () => {},
  editNote: () => {},
  deleteNote: () => {},
  filter: "All", // Nuevo estado de filtro
  setFilter: () => {}, // Función para actualizar el filtro
};

export const NotesContext = createContext<NotesContextValue>(
  defaultNotesContextValue
);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { userEmail } = useContext(AuthContext);

  const [notes, setNotes] = useState<Todo[]>(() => {
    if (!userEmail) return [];
    const localData = localStorage.getItem(`notes_${userEmail}`);
    return localData ? JSON.parse(localData) : [];
  });

  const [filter, setFilter] = useState<string>("All"); // Estado para el filtro

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`notes_${userEmail}`, JSON.stringify(notes));
    }
  }, [notes, userEmail]);

  const addNote = (newNote: Todo) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const editNote = (id: number, updatedNote: Todo) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...updatedNote, updatedAt: new Date() } // Actualiza la fecha de modificación
          : note
      )
    );
  };

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const filteredNotes = filter === "All" ? notes : notes.slice(-1); // Aquí puedes ajustar para mostrar una sola nota específica

  return (
    <NotesContext.Provider
      value={{
        notes: filteredNotes,
        addNote,
        editNote,
        deleteNote,
        filter,
        setFilter,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
