
import json
import os
import tkinter as tk
from tkinter import messagebox

FILE_NAME = "mytask.json"


# Load tasks
def load_tasks():
    if os.path.exists(FILE_NAME):
        try:
            with open(FILE_NAME, "r") as file:
                return json.load(file)
        except (json.JSONDecodeError, OSError):
            return []
    return []


tasks = load_tasks()


# Save tasks
def save_tasks():
    with open(FILE_NAME, "w") as file:
        json.dump(tasks, file, indent=4)


# Add task
def add_task():
    text = task_entry.get().strip()

    if text == "":
        messagebox.showwarning("Warning", "Please enter a task!")
        return

    tasks.append(text)
    save_tasks()

    task_entry.delete(0, tk.END)
    display_tasks()


# Delete selected task
def delete_task():
    selected = task_list.curselection()

    if not selected:
        messagebox.showwarning("Warning", "Select a task to delete!")
        return

    index = selected[0]
    removed = tasks.pop(index)

    save_tasks()
    display_tasks()

    messagebox.showinfo("Deleted", f"Task deleted: {removed}")


# Delete all tasks
def delete_all():
    if not tasks:
        messagebox.showinfo("Info", "No tasks available!")
        return

    confirm = messagebox.askyesno(
        "Confirm",
        "Are you sure you want to delete all tasks?"
    )

    if confirm:
        tasks.clear()
        save_tasks()
        display_tasks()


# Display tasks
def display_tasks():
    task_list.delete(0, tk.END)

    for i, task in enumerate(tasks, start=1):
        task_list.insert(tk.END, f"{i}. {task}")

    count_label.config(text=f"Total Tasks: {len(tasks)}")


# Main window
root = tk.Tk()
root.title("My Task Manager")
root.geometry("500x550")
root.config(bg="#f0f2f5")
root.resizable(False, False)


# Heading
title = tk.Label(
    root,
    text="MY TASK MANAGER",
    font=("Arial", 22, "bold"),
    bg="#f0f2f5",
    fg="#2c3e50"
)
title.pack(pady=20)


# Input frame
input_frame = tk.Frame(root, bg="#f0f2f5")
input_frame.pack(pady=10)


task_entry = tk.Entry(
    input_frame,
    font=("Arial", 13),
    width=28,
    bd=2
)
task_entry.grid(row=0, column=0, padx=5, ipady=7)


add_button = tk.Button(
    input_frame,
    text="Add Task",
    font=("Arial", 11, "bold"),
    bg="#27ae60",
    fg="white",
    command=add_task,
    width=10
)
add_button.grid(row=0, column=1, padx=5)


# Task count
count_label = tk.Label(
    root,
    text="Total Tasks: 0",
    font=("Arial", 11, "bold"),
    bg="#f0f2f5",
    fg="#34495e"
)
count_label.pack(pady=10)


# Task list
task_list = tk.Listbox(
    root,
    font=("Arial", 13),
    width=42,
    height=14,
    selectbackground="#3498db",
    selectforeground="white",
    bd=2
)
task_list.pack(pady=10)


# Buttons frame
button_frame = tk.Frame(root, bg="#f0f2f5")
button_frame.pack(pady=15)


delete_button = tk.Button(
    button_frame,
    text="Delete Selected",
    font=("Arial", 11, "bold"),
    bg="#e74c3c",
    fg="white",
    command=delete_task,
    width=15
)
delete_button.grid(row=0, column=0, padx=5)


delete_all_button = tk.Button(
    button_frame,
    text="Delete All",
    font=("Arial", 11, "bold"),
    bg="#c0392b",
    fg="white",
    command=delete_all,
    width=12
)
delete_all_button.grid(row=0, column=1, padx=5)


# Footer
footer = tk.Label(
    root,
    text="Tasks are automatically saved in mytask.json",
    font=("Arial", 9),
    bg="#f0f2f5",
    fg="gray"
)
footer.pack(pady=10)


# Load existing tasks into GUI
display_tasks()

# Run application
root.mainloop()
