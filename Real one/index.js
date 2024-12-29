const themeSwitch = document.getElementById("theme-switch");


const enableLightMode = () => {
  document.body.classList.add("ligthmode"); 
  localStorage.setItem("theme", "light"); 
};


const disableLightMode = () => {
  document.body.classList.remove("ligthmode");
  localStorage.setItem("theme", "dark"); 
};


window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    enableLightMode();
  } else {
    disableLightMode();
  }
});

// Toggle Theme on Button Click
themeSwitch.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") {
    disableLightMode();
  } else {
    enableLightMode();
  }
});


const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const priorityModal = document.getElementById("priorityModal");
const veryImportantRadio = document.getElementById("veryImportantRadio");
const lessImportantRadio = document.getElementById("lessImportantRadio");
const confirmPriorityButton = document.getElementById("confirmPriorityButton");
const veryImportantList = document.getElementById("veryImportantList");
const importantList = document.getElementById("ImportantList");
const lessImportantList = document.getElementById("lessImportantTasks");

let currentTaskText = "";

// Show the priority modal
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return; 

  currentTaskText = taskText;
  taskInput.value = ""; 
  priorityModal.style.display = "flex"; 
});

confirmPriorityButton.addEventListener("click", () => {
  let priority = "";

  if (veryImportantRadio.checked) {
    priority = "very important";
  } else if (lessImportantRadio.checked) {
    priority = "important";
  } else if (lessImportantRadio.checked) {
    priority = "less important";
  } else {
    alert("Please select a priority!");
    return;
  }

  addTaskToList(priority);
  priorityModal.style.display = "none"; 
});


function addTaskToList(priority) {
  const li = document.createElement("li");
  li.classList.add("task");
  li.draggable = true;

  const taskSpan = document.createElement("span");
  taskSpan.textContent = currentTaskText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => li.remove());

  li.appendChild(taskSpan);
  li.appendChild(deleteButton);

  li.addEventListener("dragstart", handleDragStart);
  li.addEventListener("dragend", handleDragEnd);

  if (priority === "very important") {
    veryImportantList.appendChild(li);
  } else if (priority === "important") {
    importantList.appendChild(li);
  } else if (priority === "less important") {
    lessImportantList.appendChild(li);
  }
}

// Drag-and-Drop Functionality
let draggedTask = null;

function handleDragStart(e) {
  draggedTask = e.target;
  e.target.classList.add("dragging");
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
  draggedTask = null;
}

function allowDrop(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  if (draggedTask && e.target.tagName === "UL") {
    e.target.appendChild(draggedTask);
  }
}

[veryImportantList, importantList, lessImportantList].forEach((list) => {
  list.addEventListener("dragover", allowDrop);
  list.addEventListener("drop", handleDrop);
});
