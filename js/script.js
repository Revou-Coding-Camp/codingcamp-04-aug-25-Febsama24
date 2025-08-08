document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const addBtn = document.getElementById("add-btn");
  const filterBtn = document.getElementById("filter-btn");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const todoList = document.getElementById("todo-list");

  let todos = [];

  function renderTodos() {
    todoList.innerHTML = "";

    if (todos.length === 0) {
      todoList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
      return;
    }

    todos.forEach((todo, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td class="status">${todo.completed ? "Completed" : "Pending"}</td>
        <td>
          <span class="complete-btn" onclick="toggleComplete(${index})">✔️</span>
          <span class="delete-btn" onclick="deleteTodo(${index})">🗑️</span>
        </td>
      `;
      todoList.appendChild(tr);
    });
  }

  window.toggleComplete = function (index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  };

  window.deleteTodo = function (index) {
    todos.splice(index, 1);
    renderTodos();
  };

  addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
      alert("Task and date are required!");
      return;
    }

    todos.push({ task, date, completed: false });
    taskInput.value = "";
    dateInput.value = "";
    renderTodos();
  });

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      todos = [];
      renderTodos();
    }
  });

  filterBtn.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    renderTodos();
  });

  renderTodos();
});
