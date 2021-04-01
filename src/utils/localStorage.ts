import { Todo } from "../types/todo";

export function readTodos(): Todo[] {
  return JSON.parse(localStorage.getItem("todos") || "[]");
}

export function saveTodos(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
