import { useState, useCallback, useMemo } from "react";
import TaskItem from "./components/TaskItem";
import "./TodoList.css";

function TodoList() {
  const [todosList, setTodosList] = useState([
    { id: 1, text: "1111", done: false },
    { id: 2, text: "22", done: false },
    { id: 3, text: "32132", done: true },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [input, setInput] = useState("");

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    setTodosList([
      ...todosList,
      { id: Date.now(), text: trimmed, done: false },
    ]);
    setNewTask("");
  };

  const removeTask = (id) => {
    setTodosList(todosList.filter((t) => t.id !== id));
  };

  const toggleDone = useCallback((id) => {
    setTodosList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const startEditing = (id, currentText) => {
    setEditing(id);
    setInput(currentText);
  };

  const saveEdit = (id) => {
    setTodosList(
      todosList.map((t) => (t.id === id ? { ...t, text: input } : t))
    );
    setEditing(null);
    setInput("");
  };

  const pendingTasks = useMemo(() => {
    return todosList.filter((t) => !t.done);
  }, [todosList]);

  const completedTasks = useMemo(() => {
    return todosList.filter((t) => t.done);
  }, [todosList]);

  return (
    <div className="todo-box">
      <h2>To-Do List 📋</h2>

      <div className="input-area">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add your task"
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
                onToggleDone={toggleDone}
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
                onToggleDone={toggleDone}
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
