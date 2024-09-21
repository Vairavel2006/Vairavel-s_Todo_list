function addTask() {
    let inputBox = document.getElementById("input-box");
    let listContainer = document.getElementById("list-container");

    // Get the value from the input box
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        // Create a new list item
        let li = document.createElement("li");
        li.innerText = inputBox.value;

        // Add the delete button (X) to the task
        let span = document.createElement("span");
        span.innerHTML = '&#x2715;'; // This is the "X" symbol for delete
        span.classList.add("delete-btn");
        li.appendChild(span);

        // Append the new task (list item) to the container
        listContainer.appendChild(li);
        
        // Clear the input box after adding the task
        inputBox.value = "";
        saveData();

        // Add click event for task completion (toggle check)
        li.addEventListener('click', function() {
            li.classList.toggle("checked");
            saveData();
        });

        // Add click event for deleting the task
        span.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the click from toggling the check
            li.remove(); // Remove the task from the list
            saveData();
        });
    }
}

// Add an event listener for pressing "Enter" to add a task
document.getElementById("input-box").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function saveData() {
    let listContainer = document.getElementById("list-container");
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    let listContainer = document.getElementById("list-container");
    listContainer.innerHTML = localStorage.getItem("data") || ""; // Ensure no null value

    // Re-attach the event listeners for tasks loaded from localStorage
    let listItems = listContainer.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        let li = listItems[i];

        // Add click event for task completion (toggle check)
        li.addEventListener('click', function() {
            li.classList.toggle("checked");
            saveData();
        });

        // Add click event for deleting the task
        let span = li.querySelector(".delete-btn");
        span.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the click from toggling the check
            li.remove(); // Remove the task from the list
            saveData();
        });
    }
}

// Show tasks when the page loads
showTask();
