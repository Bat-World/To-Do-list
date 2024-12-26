// script.js

// Get references to DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const priorityModal = document.getElementById('priorityModal');
const veryImportantRadio = document.getElementById('veryImportantRadio');
const lessImportantRadio = document.getElementById('lessImportantRadio');
const confirmPriorityButton = document.getElementById('confirmPriorityButton');
const veryImportantList = document.getElementById('veryImportantList');
const lessImportantList = document.getElementById('lessImportantList');

// Store the current task text
let currentTaskText = '';

// Event listener for adding tasks
addTaskButton.addEventListener('click', showPriorityModal);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    showPriorityModal();
  }
});

// Show the priority modal
function showPriorityModal() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  currentTaskText = taskText;
  taskInput.value = '';

  // Show the modal and reset radio buttons
  priorityModal.style.display = 'flex';
  veryImportantRadio.checked = false;
  lessImportantRadio.checked = false;
}

// Confirm the priority selection
confirmPriorityButton.addEventListener('click', () => {
  let priority = '';

  if (veryImportantRadio.checked) {
    priority = 'very important';
  } else if (lessImportantRadio.checked) {
    priority = 'less important';
  } else {
    alert('Please select a priority!');
    return;
  }

  addTaskToList(priority);

  // Close the modal
  priorityModal.style.display = 'none';
});

// Add the task to the appropriate list based on the selected priority
function addTaskToList(priority) {
  const taskText = currentTaskText;

  // Create the task list item (li)
  const li = document.createElement('li');
  li.classList.add('task');

  // Create the task description span
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  // Create the delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', deleteTask);

  // Append elements to the list item
  li.appendChild(taskSpan);
  li.appendChild(deleteButton);

  // Add the task to the appropriate list based on priority
  if (priority === 'very important') {
    veryImportantList.appendChild(li);
  } else {
    lessImportantList.appendChild(li);
  }
}

// Delete task
function deleteTask(e) {
  const task = e.target.parentElement;
  task.remove();
}
