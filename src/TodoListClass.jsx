import React, { Component } from "react";
import TaskItem from "./components/TaskItemClass";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todosList: [
        { id: 1, text: "1111", done: false },
        { id: 2, text: "22", done: false },
        { id: 3, text: "32132", done: true },
      ],
      newTask: "",
      editing: null,
      input: "",
    };
  }

  addTask = () => {
    const trimmed = this.state.newTask.trim();
    if (!trimmed) return;
    this.setState((prevState) => ({
      todosList: [
        ...prevState.todosList,
        { id: Date.now(), text: trimmed, done: false },
      ],
      newTask: "",
    }));
  };

  removeTask = (id) => {
    this.setState((prevState) => ({
      todosList: prevState.todosList.filter((t) => t.id !== id),
    }));
  };

  toggleDone = (id) => {
    this.setState((prevState) => ({
      todosList: prevState.todosList.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    }));
  };

  startEditing = (id, currentText) => {
    this.setState({ editing: id, input: currentText });
  };

  saveEdit = (id) => {
    this.setState((prevState) => ({
      todosList: prevState.todosList.map((t) =>
        t.id === id ? { ...t, text: prevState.input } : t
      ),
      editing: null,
      input: "",
    }));
  };

  handleInputChange = (value) => {
    this.setState({ input: value });
  };

  render() {
    const { todosList, newTask, editing, input } = this.state;
    const pendingTasks = todosList.filter((t) => !t.done);
    const completedTasks = todosList.filter((t) => t.done);

    return (
      <div className="todo-box">
        <h2>To-Do List 📋</h2>

        <div className="input-area">
          <input
            value={newTask}
            onChange={(e) => this.setState({ newTask: e.target.value })}
            placeholder="Add your task"
          />
          <button onClick={this.addTask}>ADD</button>
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
                  onToggleDone={this.toggleDone}
                  onStartEditing={this.startEditing}
                  onSaveEdit={this.saveEdit}
                  onCancelEdit={() => this.setState({ editing: null })}
                  onInputChange={this.handleInputChange}
                  onRemove={this.removeTask}
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
                  onToggleDone={this.toggleDone}
                  onStartEditing={this.startEditing}
                  onSaveEdit={this.saveEdit}
                  onCancelEdit={() => this.setState({ editing: null })}
                  onInputChange={this.handleInputChange}
                  onRemove={this.removeTask}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
