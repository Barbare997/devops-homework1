const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

let todos = [
  { id: 1, text: "Finish DevOps Assignment 1", completed: false },
  { id: 2, text: "Add CI/CD pipeline", completed: false }
];
let currentId = 3;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/todos", (req, res) => {
  res.status(200).json(todos);
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body || {};

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "Todo text is required." });
  }

  const todo = {
    id: currentId++,
    text: text.trim(),
    completed: false
  };

  todos.push(todo);
  return res.status(201).json(todo);
});

app.patch("/api/todos/:id/toggle", (req, res) => {
  const todoId = Number(req.params.id);
  const todo = todos.find((item) => item.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found." });
  }

  todo.completed = !todo.completed;
  return res.status(200).json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const todoId = Number(req.params.id);
  const initialLength = todos.length;

  todos = todos.filter((item) => item.id !== todoId);

  if (todos.length === initialLength) {
    return res.status(404).json({ error: "Todo not found." });
  }

  return res.status(204).send();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
