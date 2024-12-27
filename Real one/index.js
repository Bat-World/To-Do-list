const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton')
const priorityModal = document.getElementById('priorityModal')
const veryImportantRadio = document.getElementById('veryImportantRadio');
const lessImportantRadio = document.getElementById('lessImportantRadio');
const confirmPriorityButton = document.getElementById('confirmPriorityButton');
const veryImportantList = document.getElementById('veryImportantList');
const lessImportantList = document.getElementById('lessImportantList');

// Show option when clicked
addTaskButton.addEventListener('click', showPriorityModal);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    showPriorityModal();
  }
});

function showPriorityModal() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  currentTaskText = taskText;
  taskInput.value = '';


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



// Handle drag start (set the element being dragged)
function handleDragStart(e) {
e.dataTransfer.setData('text/plain', e.target.id);  // Set the dragged element's data
e.target.classList.add('dragging');
}

// Handle drag end (remove the dragging class)
function handleDragEnd(e) {
e.target.classList.remove('dragging');
}

// Handle dragging over the drop target (allow the drop)
function handleDragOver(e) {
e.preventDefault();  // Necessary to allow drop
e.target.classList.add('drag-over');
}

// Handle dragging leave from the drop target (reset style)
function handleDragLeave(e) {
e.target.classList.remove('drag-over');
}

// Handle the drop event (move the task to the new list)
function handleDrop(e) {
e.preventDefault();
const draggingTask = document.querySelector('.dragging');
const targetList = e.target.querySelector('ul');

// Append the dragged item to the new list
if (targetList) {
  targetList.appendChild(draggingTask);
}


e.target.classList.remove('drag-over');
}


function deleteTask(e) {
  const task = e.target.parentElement;
  task.remove();
}


