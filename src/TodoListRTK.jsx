import { useEffect, useMemo, useState, useCallback } from "react";
import TaskItem from "./components/TaskItem";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  toggleDone,
  removeTodo,
  editTodo,
} from "./rtk/todosSlice";

function TodoList() {
  const {
    items: todosList,
    status,
    error,
  } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    dispatch(addTodo(trimmed));
    setNewTask("");
  };

  const removeTask = useCallback(
    (id) => {
      dispatch(removeTodo(id));
    },
    [dispatch]
  );

  const toggleDoneLocal = useCallback(
    (id) => {
      dispatch(toggleDone(id));
    },
    [dispatch]
  );

  const startEditing = useCallback((id, currentText) => {
    setEditing(id);
    setInput(currentText);
  }, []);

  const saveEdit = (id) => {
    const t = input.trim();
    if (t) dispatch(editTodo({ id, text: t }));
    setEditing(null);
    setInput("");
  };

  const pendingTasks = useMemo(() => {
    return todosList.filter((t) => !t.done);
  }, [todosList]);

  const completedTasks = useMemo(() => {
    return todosList.filter((t) => t.done);
  }, [todosList]);

  if (status === "loading") {
    return (
      <div className="todo-box">
        <h2>To-Do List 📋</h2>
        <div className="status-msg loading-msg">Loading todos…</div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="todo-box">
        <h2>To-Do List 📋</h2>
        <div className="status-msg error-msg">
          {error || "Something went wrong."}
        </div>
      </div>
    );
  }

  return (
    <div className="todo-box">
      <h2>To-Do List 📋</h2>

      <div className="input-area">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add your task"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>ADD</button>
      </div>

      <div className="split-box">
        <div>
          <h3>Pending Tasks</h3>
          <ul className="todo-list">
            {pendingTasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                isEditing={editing === t.id}
                input={input}
                onToggleDone={toggleDoneLocal}
                onStartEditing={startEditing}
                onSaveEdit={saveEdit}
                onCancelEdit={() => setEditing(null)}
                onInputChange={setInput}
                onRemove={removeTask}
              />
            ))}
          </ul>
        </div>

        <div>
          <h3>Completed Tasks</h3>
          <ul className="todo-list">
            {completedTasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                isEditing={editing === t.id}
                input={input}
                onToggleDone={toggleDoneLocal}
                onStartEditing={startEditing}
                onSaveEdit={saveEdit}
                onCancelEdit={() => setEditing(null)}
                onInputChange={setInput}
                onRemove={removeTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
