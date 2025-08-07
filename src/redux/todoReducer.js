export const initialState = [
  { id: 1, text: "1111", done: false },
  { id: 2, text: "22", done: false },
  { id: 3, text: "32132", done: true },
];

export function todoReducer(state = initialState, action) {
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
