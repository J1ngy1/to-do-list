import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      if (!res.ok) {
        return rejectWithValue("Failed to fetch todos");
      }

      //   await new Promise((resolve) => setTimeout(resolve, 2000));

      const raw = await res.json();
      return raw.map((t) => ({
        id: t.id,
        text: t.title,
        done: Boolean(t.completed),
      }));
    } catch (err) {
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(text) {
        return { payload: { id: nanoid(), text, done: false } };
      },
    },
    toggleDone(state, action) {
      const t = state.items.find((x) => x.id === action.payload);
      if (t) t.done = !t.done;
    },
    removeTodo(state, action) {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    editTodo(state, action) {
      const { id, text } = action.payload;
      const t = state.items.find((x) => x.id === id);
      if (t) t.text = text;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.items.length === 0) state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message || "Unknown error";
      });
  },
});

export const { addTodo, toggleDone, removeTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
