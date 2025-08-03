import React, { Component, createRef } from "react";

class TaskItem extends Component {
  inputRef = createRef();

  componentDidUpdate(prevProps) {
    if (!prevProps.isEditing && this.props.isEditing && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const {
      task,
      isEditing,
      input,
      onToggleDone,
      onStartEditing,
      onSaveEdit,
      onCancelEdit,
      onInputChange,
      onRemove,
    } = this.props;

    return (
      <li className={task.done ? "done" : ""}>
        <span
          className={`circle ${task.done ? "checked" : ""}`}
          onClick={() => onToggleDone(task.id)}
        ></span>

        {isEditing ? (
          <input
            ref={this.inputRef}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
          />
        ) : (
          <span>{task.done ? <s>{task.text}</s> : task.text}</span>
        )}

        <div className="actions">
          <button onClick={() => onToggleDone(task.id)}>
            {task.done ? "⬅" : "➡"}
          </button>
          {isEditing ? (
            <>
              <button className="save" onClick={() => onSaveEdit(task.id)}>
                ✔
              </button>
              <button className="cancel" onClick={onCancelEdit}>
                ✖
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onStartEditing(task.id, task.text)}>
                ✏️
              </button>
              <button className="delete" onClick={() => onRemove(task.id)}>
                🗑️
              </button>
            </>
          )}
        </div>
      </li>
    );
  }
}

export default TaskItem;
