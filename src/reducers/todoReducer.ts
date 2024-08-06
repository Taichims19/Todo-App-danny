// src/todos/components/todoReducer.ts
import { TodoState, TodoAction } from "../helpers/interfaces";

export const todoReducer = (
  initialState: TodoState = [],
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case "[TODO] Add Todo":
      return [...initialState, action.payload];

    case "[TODO] Remove Todo":
      return initialState.filter((todo) => todo.id !== action.payload);

    case "[TODO] Toggle Todo":
      return initialState.map((todo) => {
        if (todo.id === action.payload) {
          // id
          return {
            ...todo,
            done: !todo.done,
          };
        }

        return todo;
      });

    case "[TODO] Edit Todo":
      return initialState.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            ...action.payload.updatedNote, // Actualización correcta
          };
        }
        return todo;
      });

    case "[TODO] Set Todos":
      return action.payload; // Manejo de la nueva acción

    default:
      return initialState;
  }
};
