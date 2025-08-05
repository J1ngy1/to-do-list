import "./App.css";
//import TodoList from "./TodoList";
// import TodoList from "./TodoListClass";
import { TodoProvider } from "./context/TodoProvider";
import TodoList from "./TodoListContext";

function App() {
  // return <TodoList />;
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

export default App;
