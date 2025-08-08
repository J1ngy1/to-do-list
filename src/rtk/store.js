import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import { formatAddTitleMiddleware } from "../redux/middleware";
import { timingEnhancer } from "../redux/enhancer";

export const store = configureStore({
  reducer: { todos: todosReducer },
  middleware: (getDefault) => getDefault().concat(formatAddTitleMiddleware),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(timingEnhancer),
});
