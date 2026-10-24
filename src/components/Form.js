import React, { useState } from "react";

function Form({
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  searchText,
  setSearchText,
}) {
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
    if (error) setError("");
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    const text = inputText.trim();
    if (text === "") {
      setError("Please enter a task title.");
      return;
    }
    setError("");
    setTodos([
      ...todos,
      {
        text: text,
        completed: false,
        id: Math.random() * 1000,
        priority: priority,
        dueDate: dueDate || null,
      },
    ]);
    setInputText("");
    setPriority("medium");
    setDueDate("");
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const searchHandler = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <form onSubmit={submitTodoHandler}>
      <div className="form-row">
        <div className="input">
          <input
            className="todo-input"
            value={inputText}
            onChange={inputTextHandler}
            type="text"
            aria-label="Task title"
            aria-invalid={error ? "true" : "false"}
            aria-describedby="form-error"
            placeholder="Add a task..."
          />
          <button
            className="todo-button"
            type="submit"
            aria-label="Add task"
          >
            <i className="fas fa-plus-square"></i>
          </button>
        </div>

        <div className="input-meta">
          <label className="visually-hidden" htmlFor="priority-select">
            Priority
          </label>
          <select
            id="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            name="priority"
            className="priority-select"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <label className="visually-hidden" htmlFor="due-date-input">
            Due date
          </label>
          <input
            id="due-date-input"
            className="due-date-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p id="form-error" className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="controls">
        <div className="search">
          <label className="visually-hidden" htmlFor="search-input">
            Search tasks
          </label>
          <input
            id="search-input"
            className="search-input"
            value={searchText}
            onChange={searchHandler}
            type="search"
            placeholder="Search tasks..."
          />
        </div>

        <div className="select">
          <label className="visually-hidden" htmlFor="filter-todo">
            Filter tasks
          </label>
          <select
            id="filter-todo"
            onChange={statusHandler}
            name="todos"
            className="filter-todo"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </form>
  );
}

export default Form;
