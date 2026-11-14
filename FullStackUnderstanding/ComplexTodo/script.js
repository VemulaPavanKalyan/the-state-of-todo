
const API_URL = "http://localhost:3000/todos";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = [];

async function loadTodos() {
    todoList.innerHTML = "<li>Loading tasks...</li>";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load todos");
        }

        todos = await response.json();

        renderTodos();

    } catch (error) {
        console.log(error);
        todoList.innerHTML = "<li>Failed to load tasks</li>";
    }
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener("change", () => {
            updateTodo(todo.id, checkbox.checked);
        });

        const title = document.createElement("span");
        title.textContent = todo.title;

        if (todo.completed) {
            title.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            deleteTodo(todo.id);
        });

        li.append(checkbox, title, deleteBtn);
        todoList.appendChild(li);
    });
}

async function addTodo() {
    const title = todoInput.value.trim();

    if (!title) {
        alert("Please enter a task");
        return;
    }

    addBtn.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title
            })
        });

        if (!response.ok) {
            throw new Error("Failed to add todo");
        }

        const newTodo = await response.json();

        todos.unshift(newTodo);

        todoInput.value = "";

        renderTodos();

    } catch (error) {
        console.log(error);
        alert("Could not add task");
    } finally {
        addBtn.disabled = false;
    }
}

async function updateTodo(id, completed) {
    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                completed: completed
            })
        });

        if (!response.ok) {
            throw new Error("Failed to update todo");
        }

        const updatedTodo = await response.json();

        todos = todos.map(todo =>
            todo.id === id ? updatedTodo : todo
        );

        renderTodos();

    } catch (error) {
        console.log(error);
        alert("Could not update task");
        await loadTodos();
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete todo");
        }

        todos = todos.filter(todo => todo.id !== id);

        renderTodos();

    } catch (error) {
        console.log(error);
        alert("Could not delete task");
    }
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTodo();
    }
});

loadTodos();
