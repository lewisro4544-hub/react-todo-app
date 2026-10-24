import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

test("renders the to-do app header", () => {
  render(<App />);
  expect(screen.getByText(/to-do list/i)).toBeInTheDocument();
});

test("adds a task and shows it in the list", () => {
  render(<App />);
  const input = screen.getByLabelText(/task title/i);
  fireEvent.change(input, { target: { value: "Buy milk" } });
  fireEvent.click(screen.getByLabelText(/add task/i));
  expect(screen.getByText("Buy milk")).toBeInTheDocument();
});

test("rejects empty task titles", () => {
  const { container } = render(<App />);
  fireEvent.click(screen.getByLabelText(/add task/i));
  expect(screen.getByRole("alert")).toHaveTextContent(/task title/i);
  expect(container.querySelector(".todo")).not.toBeInTheDocument();
});

test("search filters tasks case-insensitively", () => {
  render(<App />);
  const input = screen.getByLabelText(/task title/i);
  fireEvent.change(input, { target: { value: "Buy Milk" } });
  fireEvent.click(screen.getByLabelText(/add task/i));
  fireEvent.change(input, { target: { value: "walk the dog" } });
  fireEvent.click(screen.getByLabelText(/add task/i));

  fireEvent.change(screen.getByLabelText(/search tasks/i), {
    target: { value: "milk" },
  });
  expect(screen.getByText("Buy Milk")).toBeInTheDocument();
  expect(screen.queryByText("walk the dog")).not.toBeInTheDocument();
});

test("status filter shows only active or completed tasks", () => {
  render(<App />);
  const input = screen.getByLabelText(/task title/i);
  fireEvent.change(input, { target: { value: "Task one" } });
  fireEvent.click(screen.getByLabelText(/add task/i));
  fireEvent.change(input, { target: { value: "Task two" } });
  fireEvent.click(screen.getByLabelText(/add task/i));

  fireEvent.click(screen.getAllByLabelText(/mark as completed/i)[0]);

  fireEvent.change(screen.getByLabelText(/filter tasks/i), {
    target: { value: "completed" },
  });
  expect(screen.getByText("Task one")).toBeInTheDocument();
  expect(screen.queryByText("Task two")).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/filter tasks/i), {
    target: { value: "active" },
  });
  expect(screen.getByText("Task two")).toBeInTheDocument();
  expect(screen.queryByText("Task one")).not.toBeInTheDocument();
});

test("editing a task updates its title", () => {
  render(<App />);
  const input = screen.getByLabelText(/task title/i);
  fireEvent.change(input, { target: { value: "Old title" } });
  fireEvent.click(screen.getByLabelText(/add task/i));

  fireEvent.click(screen.getByLabelText(/edit task/i));
  const editInput = screen.getByLabelText(/edit task title/i);
  fireEvent.change(editInput, { target: { value: "New title" } });
  fireEvent.click(screen.getByLabelText(/save task/i));
  expect(screen.getByText("New title")).toBeInTheDocument();
  expect(screen.queryByText("Old title")).not.toBeInTheDocument();
});

test("overdue incomplete tasks are highlighted", () => {
  render(<App />);
  const input = screen.getByLabelText(/task title/i);
  fireEvent.change(input, { target: { value: "Late task" } });
  fireEvent.change(screen.getByLabelText(/due date/i), {
    target: { value: "2000-01-01" },
  });
  fireEvent.click(screen.getByLabelText(/add task/i));
  expect(screen.getByText("Overdue")).toBeInTheDocument();
});
