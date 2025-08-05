import { useMemo } from "react";
import TaskItem from "./components/TaskItem";
import "./TodoList.css";
import { useTodo } from "./context/useTodo";

function TodoList() {
  const {
    todosList,
    dispatch,
    newTask,
    setNewTask,
    editing,
    setEditing,
    input,
    setInput,
  } = useTodo();

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    dispatch({
      type: "ADD",
      payload: { id: Date.now(), text: trimmed, done: false },
    });
    setNewTask("");
  };

  const removeTask = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const toggleDone = (id) => {
    dispatch({ type: "TOGGLE", payload: id });
  };

  const startEditing = (id, currentText) => {
    setEditing(id);
    setInput(currentText);
  };

  const saveEdit = (id) => {
    dispatch({ type: "EDIT", payload: { id, text: input } });
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
      <h2>To-Do List 📋 (Context)</h2>

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
