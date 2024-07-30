import React, { useState, createContext, ReactNode, useEffect } from "react";
import { Todo, NotesContextValue } from "../helpers/interfaces";

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
  const [notes, setNotes] = useState<Todo[]>(() => {
    const localData = localStorage.getItem("notes");
    return localData ? JSON.parse(localData) : [];
  });

  const [filter, setFilter] = useState<string>("All"); // Estado para el filtro

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote: Todo) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const editNote = (id: number, updatedNote: Todo) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? updatedNote : note))
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
