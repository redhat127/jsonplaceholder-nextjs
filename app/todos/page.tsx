import axios from "axios";
import { Metadata } from "next";
import { Suspense } from "react";
import { Todo } from "../types";

export const metadata: Metadata = {
  title: "list of all todos",
};

export default function Todos() {
  return (
    <>
      <h1>list of all todos</h1>
      <Suspense fallback={<div>loading todos...</div>}>
        <TodosList />
      </Suspense>
    </>
  );
}

const TodosList = async () => {
  const { data: todos } = await axios.get<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li
            style={{
              textDecorationLine: todo.completed ? "line-through" : "none",
            }}
            key={todo.id}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};
