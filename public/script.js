let tasks = [];

window.onload = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
};

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    const li = document.querySelector(`li[data-id='${id}']`);
    if (li) {
        li.classList.add('removed');
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }, 300);
    }
}

function toggleTask(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const newText = prompt("Modifier la tâche :");
    if (newText !== null && newText.trim() !== '') {
        tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
        saveTasks();
        renderTasks();
    }
}

function filterTasks() {
    renderTasks();
}

function renderTasks() {
    const filter = document.getElementById('filter').value;
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
    }).forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.setAttribute('data-id', task.id);
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
            ${task.text}
            <button onclick="editTask(${task.id})"><i class="fa-solid fa-pen"></i></button>
            <button onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button>
        `;
        taskList.appendChild(li);
    });
}
