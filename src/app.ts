interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  class ToDoApp {
    private tasks: Task[] = [];
    private taskListElement: HTMLElement | null;
    private taskInputElement: HTMLInputElement | null;
  
    constructor() {
      this.taskListElement = document.getElementById("taskList");
      this.taskInputElement = document.getElementById("taskInput") as HTMLInputElement;
      const addTaskBtn = document.getElementById("addTaskBtn");
  
      addTaskBtn?.addEventListener("click", () => this.addTask());
    }
  
    addTask(): void {
      if (!this.taskInputElement || !this.taskListElement) return;
  
      const taskTitle = this.taskInputElement.value.trim();
      if (taskTitle === "") return alert("Task cannot be empty!");
  
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: taskTitle,
        completed: false,
      };
  
      this.tasks.push(newTask);
      this.taskInputElement.value = "";
      this.renderTasks();
    }
  
    completeTask(id: number): void {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
        this.renderTasks();
      }
    }
  
    deleteTask(id: number): void {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.renderTasks();
    }
  
    renderTasks(): void {
      if (!this.taskListElement) return;
  
      this.taskListElement.innerHTML = ""; // Clear current list
  
      this.tasks.forEach((task) => {
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
  
        completeBtn?.addEventListener("click", () => this.completeTask(task.id));
        deleteBtn?.addEventListener("click", () => this.deleteTask(task.id));
  
        this.taskListElement?.appendChild(li);
      });
    }
  }
  
  const app = new ToDoApp();
  