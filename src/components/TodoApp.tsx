import React, { useState } from "react";
import { Todo } from "../type";
import "./TodoApp.css";

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now(), text, completed: false }]);
      setText("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todos">
      <h1 className="todos-title">TODOS</h1>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="todos-input"
          placeholder="What needs to be done?"
        />
        <button onClick={addTodo} className="todos-add">
          Добавить
        </button>
      </div>

      <div className="todos-search">Общий список</div>
      {todos.map((todo) => (
        <div key={todo.id} className={`task`}>
          <span
            onClick={() => toggleTodo(todo.id)}
            className={`cursor-pointer ${todo.completed ? "line-through" : ""}`}
          >
            {todo.text}
          </span>
        </div>
      ))}
      <div className="todos-wrap">
        <div className="todos-tasks">
          <div className="border">Невыполненные:</div>
          {todos
            .filter((t) => !t.completed)
            .map((todo) => (
              <div key={todo.id}>{todo.text}</div>
            ))}
        </div>
        <div className="todos-tasks">
          <div className="border">Выполненные:</div>
          {todos
            .filter((t) => t.completed)
            .map((todo) => (
              <div key={todo.id} className="">
                {todo.text}
              </div>
            ))}
        </div>
      </div>
      <div>
        <span>Осталось: {remaining}</span>
        <button onClick={clearCompleted} className="todos-delete">
          Очистить
        </button>
      </div>
    </div>
  );
};
