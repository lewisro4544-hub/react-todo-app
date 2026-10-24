import React, { useState } from "react";

function TodoItem({ text, todo, todos, setTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority || "medium");
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue =
    !todo.completed &&
    todo.dueDate &&
    new Date(todo.dueDate + "T00:00:00") < today;

  //Event Handlers
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  const editHandler = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority || "medium");
    setEditDueDate(todo.dueDate || "");
    setIsEditing(true);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  const saveEditHandler = (e) => {
    e.preventDefault();
    const newText = editText.trim();
    if (newText === "") {
      return;
    }
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            text: newText,
            priority: editPriority,
            dueDate: editDueDate || null,
          };
        }
        return item;
      })
    );
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`todo ${isOverdue ? "overdue" : ""}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={saveEditHandler}>
          <input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            aria-label="Edit task title"
            autoFocus
          />
          <select
            className="edit-priority"
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            aria-label="Edit priority"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input
            className="edit-due-date"
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            aria-label="Edit due date"
          />
          <button type="submit" className="save-btn" aria-label="Save task">
            <i className="fas fa-save"></i>
          </button>
          <button
            type="button"
            onClick={cancelEditHandler}
            className="cancel-btn"
            aria-label="Cancel editing"
          >
            <i className="fas fa-times"></i>
          </button>
        </form>
      ) : (
        <>
          <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <span className="todo-text">{text}</span>
            <span className="todo-meta">
              <span className={`priority-badge priority-${todo.priority || "medium"}`}>
                {(todo.priority || "medium").charAt(0).toUpperCase() +
                  (todo.priority || "medium").slice(1)}
              </span>
              {todo.dueDate && (
                <span className={`due-date ${isOverdue ? "due-overdue" : ""}`}>
                  <i className="far fa-calendar-alt" aria-hidden="true"></i>{" "}
                  {formatDate(todo.dueDate)}
                  {isOverdue && <span className="overdue-label">Overdue</span>}
                </span>
              )}
            </span>
          </li>

          <button
            onClick={completeHandler}
            className="complete-btn"
            aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
          >
            <i className="fas fa-check"></i>
          </button>

          <button onClick={editHandler} className="edit-btn" aria-label="Edit task">
            <i className="fas fa-edit"></i>
          </button>

          <button onClick={deleteHandler} className="trash-btn" aria-label="Delete task">
            <i className="fas fa-trash"></i>
          </button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
