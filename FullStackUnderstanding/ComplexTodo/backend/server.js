
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const FILE_PATH = path.join(__dirname, "todos.json");

app.use(cors());
app.use(express.json());

function readTodos() {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
}

function writeTodos(todos) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

// GET: Retrieve all todos
app.get("/todos", (req, res) => {
    try {
        const todos = readTodos();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve todos" });
    }
});

// GET: Retrieve a particular todo
app.get("/todos/:id", (req, res) => {
    try {
        const todos = readTodos();
        const id = Number(req.params.id);

        const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json(todo);

    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve todo" });
    }
});

// POST: Create a new todo
app.post("/todos", (req, res) => {
    try {
        const { title } = req.body;

        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ message: "Valid title is required" });
        }

        const todos = readTodos();

        const id = todos.length > 0
            ? Math.max(...todos.map(todo => todo.id)) + 1
            : 1;

        const newTodo = {
            id: id,
            title: title.trim(),
            completed: false
        };

        todos.push(newTodo);

        writeTodos(todos);

        res.status(201).json(newTodo);

    } catch (error) {
        res.status(500).json({ message: "Failed to create todo" });
    }
});

// PATCH: Update an existing todo
app.patch("/todos/:id", (req, res) => {
    try {
        const todos = readTodos();
        const id = Number(req.params.id);

        const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        const { title, completed } = req.body;

        if (title !== undefined &&
            (typeof title !== "string" || !title.trim())) {
            return res.status(400).json({ message: "Invalid title" });
        }

        if (completed !== undefined && typeof completed !== "boolean") {
            return res.status(400).json({ message: "Invalid completed value" });
        }

        if (title === undefined && completed === undefined) {
            return res.status(400).json({ message: "No update data provided" });
        }

        if (title !== undefined) {
            todo.title = title.trim();
        }

        if (completed !== undefined) {
            todo.completed = completed;
        }

        writeTodos(todos);

        res.status(200).json(todo);

    } catch (error) {
        res.status(500).json({ message: "Failed to update todo" });
    }
});

// DELETE: Remove a todo
app.delete("/todos/:id", (req, res) => {
    try {
        const todos = readTodos();
        const id = Number(req.params.id);

        const updatedTodos = todos.filter(todo => todo.id !== id);

        if (updatedTodos.length === todos.length) {
            return res.status(404).json({ message: "Todo not found" });
        }

        writeTodos(updatedTodos);

        res.status(200).json({ message: "Todo deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo" });
    }
});

app.listen(PORT, () => {
    console.log(`Todo API running at http://localhost:${PORT}`);
});
