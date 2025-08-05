import { useReducer, useState } from "react";
import { TodoContext } from "./TodoContext";

const initialState = [
  { id: 1, text: "1111", done: false },
  { id: 2, text: "22", done: false },
  { id: 3, text: "32132", done: true },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((t) => t.id !== action.payload);
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
    case "EDIT":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text } : t
      );
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [todosList, dispatch] = useReducer(todoReducer, initialState);
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [input, setInput] = useState("");

  return (
    <TodoContext.Provider
      value={{
        todosList,
        dispatch,
        newTask,
        setNewTask,
        editing,
        setEditing,
        input,
        setInput,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
