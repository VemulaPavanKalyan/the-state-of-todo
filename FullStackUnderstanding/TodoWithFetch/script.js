
const API_URL = "https://jsonplaceholder.typicode.com/todos";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = [];
let nextLocalId = 1;

async function loadTodos() {
    todoList.innerHTML = "<li>Loading tasks...</li>";

    try {
        const response = await fetch(API_URL + "?_limit=10");

        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }

        const data = await response.json();

        todos = data.map(todo => ({
            localId: todo.id,
            apiId: todo.id,
            title: todo.title,
            completed: todo.completed
        }));

        nextLocalId = todos.length + 1;

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
            updateTodo(todo.localId, checkbox.checked);
        });

        const title = document.createElement("span");
        title.textContent = todo.title;

        if (todo.completed) {
            title.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            deleteTodo(todo.localId);
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
                title: title,
                completed: false,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error("Failed to add todo");
        }

        const data = await response.json();

        todos.unshift({
            localId: nextLocalId++,
            apiId: data.id,
            title: data.title,
            completed: data.completed
        });

        todoInput.value = "";
        renderTodos();

    } catch (error) {
        console.log(error);
        alert("Could not add task");
    } finally {
        addBtn.disabled = false;
    }
}

async function updateTodo(localId, completed) {
    const todo = todos.find(item => item.localId === localId);

    try {
        const response = await fetch(API_URL + "/" + todo.apiId, {
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

        await response.json();

        todo.completed = completed;
        renderTodos();

    } catch (error) {
        console.log(error);
        alert("Could not update task");
        renderTodos();
    }
}

async function deleteTodo(localId) {
    const todo = todos.find(item => item.localId === localId);

    try {
        const response = await fetch(API_URL + "/" + todo.apiId, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete todo");
        }

        todos = todos.filter(item => item.localId !== localId);

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
