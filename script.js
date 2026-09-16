document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const priorityDropdown = document.getElementById('priority-dropdown');
    const dueDateInput = document.getElementById('due-date-input');
    const stateDropdown = document.getElementById('state-dropdown');
    const sendButton = document.getElementById('send-button');
    const taskTableBody = document.getElementById('task-table-body');

    const STORAGE_KEY = 'task-manager-tasks';
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function saveTasks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    function clearForm() {
        taskInput.value = '';
        priorityDropdown.selectedIndex = 0;
        dueDateInput.value = '';
        stateDropdown.selectedIndex = 0;
        taskInput.focus();
    }

    function renderTasks() {
        taskTableBody.innerHTML = '';

        if (tasks.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="5" class="empty-state">No hay tareas aún!!</td>
            `;
            taskTableBody.appendChild(emptyRow);
            return;
        }

        tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.priority}</td>
                <td>${task.dueDate}</td>
                <td>${task.state}</td>
                <td>
                    <button type="button" class="delete-button" data-index="${index}">Eliminar</button>
                </td>
            `;
            taskTableBody.appendChild(row);
        });

        document.querySelectorAll('.delete-button').forEach((button) => {
            button.addEventListener('click', () => {
                const index = Number(button.dataset.index);
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
        });
    }

    function addTask() {
        const name = taskInput.value.trim();
        const priority = priorityDropdown.value;
        const dueDate = dueDateInput.value;
        const state = stateDropdown.value;

        if (!name || !priority || !dueDate || !state) {
            alert('Completa todos los campos antes de agregar la tarea.');
            return;
        }

        tasks.push({ name, priority, dueDate, state });
        saveTasks();
        renderTasks();
        clearForm();
    }

    sendButton.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});