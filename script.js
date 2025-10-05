// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Trim the input value
        const taskText = taskInput.value.trim();

        // If empty, alert and stop
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create new list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create 'Remove' button and give it the required class using classList.add
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Assign onclick event to remove the li from the taskList
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append button to li and li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add task when the button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when pressing Enter in the input
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
