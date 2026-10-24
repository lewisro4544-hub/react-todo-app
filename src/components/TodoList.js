import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, setTodos, filteredTodos }) {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-list">
            {todos.length === 0
              ? "No tasks yet. Add your first task above."
              : "No tasks match your search or filter."}
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              text={todo.text}
              key={todo.id}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
