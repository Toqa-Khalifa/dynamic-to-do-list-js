// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Keep tasks in a JS array and sync with localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Helper to save the tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Add a task to the DOM (and optionally to localStorage).
     * If taskTextArg is provided, it will be used instead of reading the input.
     * The 'save' flag prevents re-saving when loading existing tasks from storage.
     */
    function addTask(taskTextArg, save = true) {
        // Determine the task text either from the argument or the input field
        const taskText = typeof taskTextArg === 'string' ? taskTextArg.trim() : taskInput.value.trim();

        // If the text is empty, alert only when this was a user-triggered add (save === true)
        if (taskText === "") {
            if (save) {
                alert("Please enter a task!");
            }
            return;
        }

        // Create list item and a text node so the button is a separate child node
        const li = document.createElement('li');
        const textNode = document.createTextNode(taskText);
        li.appendChild(textNode);

        // Create 'Remove' button and give it the required class using classList.add
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // When the remove button is clicked, remove the li and update localStorage
        removeBtn.onclick = function() {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from tasks array (removes first matching occurrence)
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append the button to li and li to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If this add should be saved (normal user add), update the tasks array and localStorage
        if (save) {
            tasks.push(taskText);
            saveTasks();
            // Clear the input field for the next entry
            taskInput.value = "";
        }
    }

    // Load tasks from localStorage and render them (do not re-save while loading)
    function loadTasks() {
        tasks.forEach(taskText => addTask(taskText, false));
    }

    // Attach event listeners

    // Add task when the "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when pressing "Enter" key inside the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Populate the list from localStorage on startup
    loadTasks();

});
