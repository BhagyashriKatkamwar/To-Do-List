document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault();
    });

    document.getElementById('new-task').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <span>${taskText}</span>
        <button class="edit-btn" onclick="editTask(this)"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-trash-alt"></i></button>
    `;

    taskList.appendChild(newTask);
    saveTask(taskText);
    taskInput.value = '';
}

function deleteTask(btn) {
    const taskList = document.getElementById('task-list');
    const taskText = btn.previousElementSibling.previousElementSibling.textContent;
    const taskItem = btn.parentElement;

    taskList.removeChild(taskItem);
    removeTask(taskText);
}

function editTask(btn) {
    const taskList = document.getElementById('task-list');
    const taskText = btn.previousElementSibling.textContent;
    const newTaskText = prompt(`Edit task: "${taskText}"`, taskText);

    if (newTaskText !== null) {
        btn.previousElementSibling.textContent = newTaskText;
        updateTask(taskText, newTaskText);
    }
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldTask, newTask) {
    let tasks = getTasks();
    const index = tasks.indexOf(oldTask);

    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function loadTasks() {
    let tasks = getTasks();
    const taskList = document.getElementById('task-list');

    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span>${task}</span>
            <button class="edit-btn" onclick="editTask(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-trash-alt"></i></button>
        `;
        taskList.appendChild(newTask);
    });
}

function getTasks() {
    const tasksString = localStorage.getItem('tasks');
    return tasksString ? JSON.parse(tasksString) : [];
}
