// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Step 1: Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Define the function to add a new task
    function addTask() {
        // Get the text from the input field and remove any extra spaces
        const taskText = taskInput.value.trim();

        // If input is empty, show alert and stop
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Step 3: Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Step 4: Create a 'Remove' button for each task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // When remove button is clicked, remove the parent <li>
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Step 5: Append the button to the list item, and list item to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Step 6: Clear the input field after adding
        taskInput.value = "";
    }

    // Step 7: Add event listeners

    // Add task when the "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when pressing "Enter" key inside the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
