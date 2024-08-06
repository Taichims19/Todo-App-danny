import { useEffect, useReducer } from "react";
import { todoReducer } from "../reducers/todoReducer";
import { Todo, TodoAction, TodoState } from "../helpers/interfaces";
import { useDebounce } from "./useDebounce";

const init = (): TodoState => {
  try {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    if (Array.isArray(todos)) {
      const parsedTodos = todos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt), // Parsea `createdAt` a Date
      }));

      console.log("Parsed todos from localStorage:", parsedTodos); // Verifica los todos parseados desde localStorage

      return parsedTodos;
    }
    return [];
  } catch (error) {
    console.error("Failed to parse todos from localStorage", error);
    return [];
  }
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);
  const debouncedTodos = useDebounce(todos, 500); // Debounce de 500ms

  // Y en el useEffect para guardar en localStorage:
  useEffect(() => {
    if (debouncedTodos) {
      const todosToStore = debouncedTodos.map((todo: any) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(), // Convierte a ISOString antes de guardar
      }));
      localStorage.setItem("todos", JSON.stringify(todosToStore));
    }
  }, [debouncedTodos]);

  const handleNewTodo = (todo: Todo) => {
    const newTodo: Todo = {
      ...todo,
      createdAt: new Date(), // Añadir fecha de creación aquí
    };
    const action: TodoAction = {
      type: "[TODO] Add Todo",
      payload: newTodo,
    };
    dispatch(action);
  };
  const handleDeleteTodo = (id: number) => {
    const action: TodoAction = {
      type: "[TODO] Remove Todo",
      payload: id,
    };
    dispatch(action);
  };

  const handleToggleTodo = (id: number) => {
    const action: TodoAction = {
      type: "[TODO] Toggle Todo",
      payload: id,
    };
    dispatch(action);
  };

  const handleEditTodo = (id: number, newDescription: string) => {
    const action: TodoAction = {
      type: "[TODO] Edit Todo",
      payload: { id, newDescription },
    };
    dispatch(action);
  };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleEditTodo,
  };
};
