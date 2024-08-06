import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useContext,
  useState,
} from "react";
import { Todo, NotesContextValue } from "../helpers/interfaces";
import { useAuthContext } from "./AuthContext";
import { todoReducer } from "../reducers/todoReducer";

const defaultNotesContextValue: NotesContextValue = {
  notes: [],
  addNote: () => {},
  editNote: () => {},
  deleteNote: () => {},
  filter: "All",
  setFilter: () => {},
};

export const NotesContext = createContext<NotesContextValue>(
  defaultNotesContextValue
);

const init = (initialNotes: Todo[], userEmail: string | null) => {
  if (userEmail) {
    const savedNotes = localStorage.getItem(`notes_${userEmail}`);
    return savedNotes ? JSON.parse(savedNotes) : initialNotes;
  }
  return initialNotes;
};

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { state } = useAuthContext();
  const [notes, dispatch] = useReducer(
    (state: Todo[], action: any) => todoReducer(state, action),
    [],
    (initialNotes) => init(initialNotes, state.userEmail)
  );

  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    if (state.userEmail) {
      const savedNotes = localStorage.getItem(`notes_${state.userEmail}`);
      if (savedNotes) {
        dispatch({ type: "[TODO] Set Todos", payload: JSON.parse(savedNotes) });
      } else {
        dispatch({ type: "[TODO] Set Todos", payload: [] });
      }
    }
  }, [state.userEmail]);

  useEffect(() => {
    if (state.userEmail) {
      localStorage.setItem(`notes_${state.userEmail}`, JSON.stringify(notes));
    }
  }, [notes, state.userEmail]);

  const addNote = (newNote: Todo) => {
    if (!state.userEmail) return;
    dispatch({
      type: "[TODO] Add Todo",
      payload: newNote,
    });
  };

  const editNote = (id: number, updatedNote: Partial<Todo>) => {
    if (!state.userEmail) return;
    dispatch({
      type: "[TODO] Edit Todo",
      payload: { id, updatedNote },
    });
  };

  const deleteNote = (id: number) => {
    if (!state.userEmail) return;
    dispatch({
      type: "[TODO] Remove Todo",
      payload: id,
    });
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

export const useNotesContext = () => useContext(NotesContext);
