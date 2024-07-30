// src/todos/components/todoReducer.ts
import { Todo, TodoState } from "../../helpers/interfaces";

type TodoAction =
  | { type: "[TODO] Add Todo"; payload: Todo }
  | { type: "[TODO] Remove Todo"; payload: number }
  | { type: "[TODO] Toggle Todo"; payload: number }
  | {
      type: "[TODO] Edit Todo";
      payload: { id: number; newDescription: string };
    };

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
            description: action.payload.newDescription,
            createdAt: new Date(todo.createdAt), // Asegúrate de que la fecha se mantenga
          };
        }
        return todo;
      });

    default:
      return initialState;
  }
};
