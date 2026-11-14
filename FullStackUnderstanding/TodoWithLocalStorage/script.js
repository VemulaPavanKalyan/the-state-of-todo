
let todoInput = document.getElementById("todoInput");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos() {

    todoList.innerHTML = "";

    todos.forEach(function(todo) {

        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        let span = document.createElement("span");
        span.textContent = todo.title;

        if (todo.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "#80868b";
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        checkbox.addEventListener("change", function() {
            todo.completed = checkbox.checked;
            saveTodos();
            displayTodos();
        });

        deleteBtn.addEventListener("click", function() {
            todos = todos.filter(function(item) {
                return item.id !== todo.id;
            });

            saveTodos();
            displayTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

    });

}

addBtn.addEventListener("click", function() {

    let task = todoInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    let todo = {
        id: Date.now(),
        title: task,
        completed: false
    };

    todos.push(todo);

    saveTodos();
    displayTodos();

    todoInput.value = "";

});

displayTodos();
