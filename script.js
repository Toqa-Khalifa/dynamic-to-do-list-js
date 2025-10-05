// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements as required
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Internal array to hold tasks (strings)
    let tasks = [];

    /**
     * Render the tasks array into the DOM
     */
    function renderTasks() {
        // Clear current list
        taskList.innerHTML = '';

        // Create list items for each task
        tasks.forEach((taskText, index) => {
            const li = document.createElement('li');

            // Create a span to hold the task text (keeps structure flexible)
            const textSpan = document.createElement('span');
            textSpan.textContent = taskText;

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';

            // When clicked, remove task at 'index' and update storage + UI
            removeBtn.addEventListener('click', () => {
                removeTask(index);
            });

            // Build and append the list item
            li.appendChild(textSpan);
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    /**
     * Save current tasks array to Local Storage
     */
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Add a task to the list and optionally save to Local Storage.
     * If taskText is omitted, read from the input field.
     * `save` flag prevents double-saving when loading stored tasks.
     */
    function addTask(taskText = null, save = true) {
        // If no taskText passed, read from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        // Validate: non-empty
        if (!taskText) {
            alert('Please enter a task.');
            return;
        }

        // Add to internal array
        tasks.push(taskText);

        // Save to Local Storage (unless caller asked not to)
        if (save) {
            saveTasks();
        }

        // Re-render the list and clear input
        renderTasks();
        taskInput.value = '';
    }

    /**
     * Remove a task by index, update Local Storage and re-render
     */
    function removeTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    /**
     * Load tasks from Local Storage and render them.
     * Uses addTask(taskText, false) pattern in example, but here we populate
     * the tasks array directly and render once to avoid duplicates.
     */
    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Ensure it's an array
        if (Array.isArray(stored)) {
            tasks = stored;
        } else {
            tasks = [];
        }
        renderTasks();
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // prevent side effects if any
            addTask();
        }
    });

    // Load tasks from Local Storage when page loads
    loadTasks();
});
