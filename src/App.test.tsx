import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";
import "@testing-library/jest-dom";

describe("Todo App", () => {
  it("adds a new task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Новая задача");
    fireEvent.change(input, { target: { value: "Моя задача" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText("Моя задача")).toBeInTheDocument();
  });

  it("toggles task completion", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Новая задача");
    fireEvent.change(input, { target: { value: "Задача" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const task = screen.getByText("Задача");
    fireEvent.click(task);

    expect(task).toHaveClass("line-through");
  });
});
