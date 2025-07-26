import { useState } from "react";
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

  const toggleDone = (id) => {
    setTodosList(
      todosList.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

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

      <ul className="todo-list">
        {todosList.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <span
              className={`circle ${t.done ? "checked" : ""}`}
              onClick={() => toggleDone(t.id)}
            ></span>

            {editing === t.id ? (
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            ) : (
              <span>{t.done ? <s>{t.text}</s> : t.text}</span>
            )}

            <div className="actions">
              {editing === t.id ? (
                <>
                  <button className="save" onClick={() => saveEdit(t.id)}>
                    ✔
                  </button>
                  <button className="cancel" onClick={() => setEditing(null)}>
                    ✖
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEditing(t.id, t.text)}>✏️</button>
                  <button className="delete" onClick={() => removeTask(t.id)}>
                    🗑️
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
