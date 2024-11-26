"use strict";
class ToDoApp {
    constructor() {
        this.tasks = [];
        this.taskListElement = document.getElementById("taskList");
        this.taskInputElement = document.getElementById("taskInput");
        const addTaskBtn = document.getElementById("addTaskBtn");
        addTaskBtn === null || addTaskBtn === void 0 ? void 0 : addTaskBtn.addEventListener("click", () => this.addTask());
    }
    addTask() {
        if (!this.taskInputElement || !this.taskListElement)
            return;
        const taskTitle = this.taskInputElement.value.trim();
        if (taskTitle === "")
            return alert("Task cannot be empty!");
        const newTask = {
            id: this.tasks.length + 1,
            title: taskTitle,
            completed: false,
        };
        this.tasks.push(newTask);
        this.taskInputElement.value = "";
        this.renderTasks();
    }
    completeTask(id) {
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
        }
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.renderTasks();
    }
    renderTasks() {
        if (!this.taskListElement)
            return;
        this.taskListElement.innerHTML = ""; // Clear current list
        this.tasks.forEach((task) => {
            var _a;
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
          <span>${task.title}</span>
          <div>
            <button class="complete">${task.completed ? "Undo" : "Complete"}</button>
            <button class="delete">Delete</button>
          </div>
        `;
            const completeBtn = li.querySelector(".complete");
            const deleteBtn = li.querySelector(".delete");
            completeBtn === null || completeBtn === void 0 ? void 0 : completeBtn.addEventListener("click", () => this.completeTask(task.id));
            deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener("click", () => this.deleteTask(task.id));
            (_a = this.taskListElement) === null || _a === void 0 ? void 0 : _a.appendChild(li);
        });
    }
}
const app = new ToDoApp();
