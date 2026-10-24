import "./App.css";

// Importing Components
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  // Keep this tab in sync when another tab updates saved todos
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "todos") getLocalTodos();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, status, searchText]);

  // Persist only when the task list itself changes
  useEffect(() => {
    saveLocalTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const filterHandler = () => {
    let result = todos;
    switch (status) {
      case "completed":
        result = result.filter((todo) => todo.completed === true);
        break;

      case "active":
        result = result.filter((todo) => todo.completed === false);
        break;

      default:
        break;
    }

    const query = searchText.trim().toLowerCase();
    if (query !== "") {
      result = result.filter((todo) =>
        todo.text.toLowerCase().includes(query)
      );
    }

    setFilteredTodos(result);
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Saving in LocalStorage
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodos = [];
      try {
        localTodos = JSON.parse(localStorage.getItem("todos")) || [];
      } catch (e) {
        localTodos = [];
      }
      // Migrate tasks saved before priority/dueDate existed
      setTodos(
        localTodos.map((todo) => ({
          priority: "medium",
          dueDate: null,
          ...todo,
        }))
      );
    }
  };

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>

      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <TodoList
        filteredTodos={filteredTodos}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
}

export default App;
