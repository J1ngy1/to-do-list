import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { todoReducer } from "./todoReducer";
import { formatAddTitleMiddleware } from "./middleware";
import { timingEnhancer } from "./enhancer";

const middlewares = [formatAddTitleMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer, timingEnhancer];
const composedEnhancers = compose(...enhancers);

export default function configureStore(preloadedState) {
  const store = createStore(todoReducer, preloadedState, composedEnhancers);
  return store;
}
