const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const doneTasks = document.getElementById("doneTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Digite uma tarefa antes de adicionar.");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    done: false
  };

  tasks.push(newTask);
  taskInput.value = "";

  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        done: !task.done
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  renderTasks();
}

function updateStatus() {
  const completedTasks = tasks.filter((task) => task.done).length;

  totalTasks.textContent = `${tasks.length} tarefas`;
  doneTasks.textContent = `${completedTasks} concluídas`;
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty";
    emptyMessage.textContent = "Nenhuma tarefa adicionada ainda.";

    taskList.appendChild(emptyMessage);
    updateStatus();
    return;
  }

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.done ? "task done" : "task";

    const taskLeft = document.createElement("div");
    taskLeft.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "check";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Apagar";

    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(taskText);

    taskItem.appendChild(taskLeft);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });

  updateStatus();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
