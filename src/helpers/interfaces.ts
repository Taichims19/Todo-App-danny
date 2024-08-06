// Define el tipo Todo
export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt?: Date; // Opcional: fecha de la última actualización
}

export type TodoAction =
  | { type: "[TODO] Add Todo"; payload: Todo }
  | { type: "[TODO] Remove Todo"; payload: number }
  | { type: "[TODO] Toggle Todo"; payload: number }
  | {
      type: "[TODO] Edit Todo";
      payload: { id: number; updatedNote: Partial<Todo> };
    }
  | { type: "[TODO] Set Todos"; payload: TodoState }; // Añadir nuevo tipo de acción

// Definición del estado inicial como una lista de Todo
export type TodoState = Todo[];

// Actualizar la interfaz para el contexto
export interface NotesContextValue {
  notes: Todo[]; // Cambiado de Note[] a Todo[]
  addNote: (newNote: Todo) => void; // Cambiado de Note a Todo
  editNote: (id: number, updatedNote: Partial<Todo>) => void; // Cambiado de string a number y Note a Partial<Todo>
  deleteNote: (id: number) => void; // Cambiado de string a number
  filter: string; // Añadido para el filtro
  setFilter: (filter: string) => void; // Añadido para actualizar el filtro
}
