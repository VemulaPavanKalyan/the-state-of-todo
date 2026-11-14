
let todoInput = document.getElementById("todoInput");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");

addBtn.addEventListener("click", function() {

    let task = todoInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let span = document.createElement("span");
    span.textContent = task;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            span.style.color = "#80868b";
        } else {
            span.style.textDecoration = "none";
            span.style.color = "#202124";
        }
    });

    deleteBtn.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    todoInput.value = "";

});
