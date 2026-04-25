const todoListEl = document.getElementById("todo-list");
const todoFormEl = document.getElementById("todo-form");
const todoInputEl = document.getElementById("todo-input");

async function fetchTodos() {
  const response = await fetch("/api/todos");
  return response.json();
}

async function createTodo(text) {
  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
}

async function toggleTodo(id) {
  await fetch(`/api/todos/${id}/toggle`, { method: "PATCH" });
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
}

function renderTodos(todos) {
  todoListEl.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const toggleButton = document.createElement("button");
    toggleButton.textContent = todo.completed ? "Undo" : "Done";
    toggleButton.addEventListener("click", async () => {
      await toggleTodo(todo.id);
      await refresh();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "danger";
    deleteButton.addEventListener("click", async () => {
      await deleteTodo(todo.id);
      await refresh();
    });

    actions.appendChild(toggleButton);
    actions.appendChild(deleteButton);

    li.appendChild(textSpan);
    li.appendChild(actions);
    todoListEl.appendChild(li);
  });
}

async function refresh() {
  const todos = await fetchTodos();
  renderTodos(todos);
}

todoFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = todoInputEl.value.trim();
  if (!text) return;

  await createTodo(text);
  todoInputEl.value = "";
  await refresh();
});

refresh();
