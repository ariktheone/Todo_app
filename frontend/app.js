// frontend/app.js

// Function to fetch and display tasks
function fetchTasks() {
  fetch('http://localhost:3000/tasks', {
    headers: { 'authorization': 'Basic ' + btoa('root:202550') }
  })
    .then(response => response.json())
    .then(tasks => {
      displayTasks(tasks);
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Function to display tasks
function displayTasks(tasks) {
  const taskList = document.getElementById('task-list');
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const filterValue = document.getElementById('filter').value;
  const sortValue = document.getElementById('sort').value;

  taskList.innerHTML = '';

  // Filter tasks based on search query
  tasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery) || 
    task.description.toLowerCase().includes(searchQuery)
  );

  // Filter tasks based on completion status
  if (filterValue === 'completed') {
    tasks = tasks.filter(task => task.completed);
  } else if (filterValue === 'incomplete') {
    tasks = tasks.filter(task => !task.completed);
  }

  // Sort tasks
  if (sortValue === 'title') {
    tasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === 'completed') {
    tasks.sort((a, b) => a.completed - b.completed);
  }

  // Create list items
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.title}: ${task.description}</span>
      <div>
        <button onclick="toggleComplete(${task.id}, ${task.completed})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Function to add a new task
document.getElementById('task-form').addEventListener('submit', event => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + btoa('root:202550') },
    body: JSON.stringify({ title, description })
  })
    .then(() => {
      document.getElementById('task-form').reset();
      fetchTasks();
    })
    .catch(error => console.error('Error adding task:', error));
});

// Function to toggle task completion
function toggleComplete(id, completed) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'authorization': 'Basic ' + btoa('root:202550') },
    body: JSON.stringify({ completed: !completed })
  })
    .then(fetchTasks)
    .catch(error => console.error('Error toggling task:', error));
}

// Function to delete a task
function deleteTask(id) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'authorization': 'Basic ' + btoa('root:202550') }
  })
    .then(fetchTasks)
    .catch(error => console.error('Error deleting task:', error));
}

// Event listeners for search, sort, and filter controls
document.getElementById('search').addEventListener('input', fetchTasks);
document.getElementById('sort').addEventListener('change', fetchTasks);
document.getElementById('filter').addEventListener('change', fetchTasks);

// Initial fetch of tasks
fetchTasks();
