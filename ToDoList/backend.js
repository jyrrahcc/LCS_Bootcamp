// Array to store ToDo objects
var todoList = [];

var data = new ToDo(
    generateUniqueId(),
    "To-Do List App",
    "LCS BOOTCAMP",
    "Create a To-Do List App with CRUD Operations without Database.",
    "April 24, 2024",
    "Medium"
);

todoList.push(data);
displayToDoCards();

// Constructor function for ToDo object
function ToDo(id, title, category, notes, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
}

// Generate unique ID function for ToDo objects
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// Get the values of the inputs in the modal
var title = document.getElementById('todoTitle').value;
var category = document.getElementById('todoCategory').value;
var notes = document.getElementById('todoNotes').value;
var dueDate = document.getElementById('todoDueDate').value;
var priority = document.querySelector('input[name="todoPriority"]:checked').value;

// Event listener for the "Create" button in the modal
document.getElementById('createTodoBtn').addEventListener('click', function() {
    createToDo();
});

// Function to create a new ToDo object
function createToDo() {
    // Get the values of the inputs in the modal
    var title = document.getElementById('todoTitle').value;
    var category = document.getElementById('todoCategory').value;
    var notes = document.getElementById('todoNotes').value;
    var dueDate = document.getElementById('todoDueDate').value;
    var priority = document.querySelector('input[name="todoPriority"]:checked').value;

    // Validate the form
    if (!validateForm(title, category, dueDate)) {
        return; // Exit the function if validation fails
    }

    // Create a new ToDo object
    var newToDo = new ToDo(
        generateUniqueId(),
        title,
        category,
        notes,
        dueDate,
        priority
    );

    // Add the new ToDo object to the todoList array
    todoList.push(newToDo);

    // Log the updated todoList array
    console.log('Successfully added:', newToDo);

    // clear the form fields after creating the ToDo
    document.getElementById('createTodoForm').reset();

    // Close the modal
    closeModal("addTodoModal");

    //redisplay todo cards
    displayToDoCards();
}

// Function to validate the form inputs
function validateForm(title, category, dueDate) {
    // Validate title
    if (title === '') {
        alert('Please provide a title.');
        return false;
    }

    // Validate category
    if (category === '') {
        alert('Please provide a category.');
        return false;
    }

    // Validate due date
    if (dueDate === '') {
        alert('Please provide a due date.');
        return false;
    }

    // Validation successful
    return true;
}

// Function to display ToDo cards
function displayToDoCards() {
    // Get the section where ToDo cards will be displayed
    const section = document.getElementById('todoSection');

    // Clear any existing content in the section
    section.innerHTML = '';

    // Iterate over the todoList array
    todoList.forEach(todo => {
        // Create a new ToDo card element
        const todoCard = document.createElement('section');
        todoCard.classList.add('mb-3');

        todoCard.innerHTML = `
            <div class="todo-card shadow" data-toggle="modal" data-target="#UDTodoModal" data-todo-id="${todo.id}" data-todo-title="${todo.title}" data-todo-category="${todo.category}" data-todo-notes="${todo.notes}" data-todo-due-date="${todo.dueDate}" data-todo-priority="${todo.priority}">
                <div class="todo-id d-none">${todo.id}</div>
                <div class="todo-header">
                    <h3 class="todo-title fs-5">${todo.title}</h3>
                </div>
                <p class="fs-5 text-muted mb-2">${todo.category}</p>
                <div class="todo-details">
                    <p class="todo-description">${todo.notes}</p>
                    <div class="todo-meta">
                        <p class="todo-due-date text-muted mb-2">${todo.dueDate}</p>
                        <p class="todo-priority todo-${todo.priority} text-light rounded-pill">${todo.priority}</p>
                    </div>
                </div>
            </div>
        `;

        // Append the ToDo card to the section
        section.appendChild(todoCard);
    });
    // Add event listeners to newly created elements
    addListenersToDoCards();
}

// Function to add event listeners to ToDo cards
function addListenersToDoCards() {
    // Get all the ToDo cards
    const todoCards = document.querySelectorAll('.todo-card');

    // Iterate over each ToDo card and attach event listener
    todoCards.forEach(todoCard => {
        todoCard.addEventListener('click', function() {
            // Access data attributes of the clicked ToDo card
            const todoId = this.dataset.todoId;
            const todoTitle = this.dataset.todoTitle;
            const todoCategory = this.dataset.todoCategory;
            const todoNotes = this.dataset.todoNotes;
            const todoDueDate = this.dataset.todoDueDate;
            const todoPriority = this.dataset.todoPriority;

            // Do whatever you need with the data attributes
            console.log('Clicked ToDo Card:');
            console.log('ID:', todoId);
            console.log('Title:', todoTitle);
            console.log('Category:', todoCategory);
            console.log('Notes:', todoNotes);
            console.log('Due Date:', todoDueDate);
            console.log('Priority:', todoPriority);
            // Populate modal with todo information
            document.getElementById('ID').value = todoId;
            document.getElementById('Title').value = todoTitle;
            document.getElementById('Category').value = todoCategory;
            document.getElementById('Notes').value = todoNotes;
            document.getElementById('DueDate').value = formatStringToDate(todoDueDate);
            document.getElementById('todopriority' + todoPriority).checked = true; // Select the correct radio button
        });
    });
}

// Get the update button element
const updateBtn = document.getElementById('updateBtn');

// Add event listener to the update button
updateBtn.addEventListener('click', function() {
    // Check if the button text is 'Edit'
    if (updateBtn.innerText.trim() === 'Edit') {
        // Enable form fields and change button text to "Update"
        document.getElementById('Title').disabled = false;
        document.getElementById('Category').disabled = false;
        document.getElementById('Notes').disabled = false;
        document.getElementById('DueDate').disabled = false;
        document.getElementById('todopriorityLow').disabled = false;
        document.getElementById('todopriorityMedium').disabled = false;
        document.getElementById('todopriorityHigh').disabled = false;

        updateBtn.innerText = 'Update';
    } else {
        // Get the TodoID
        const todoId = document.getElementById('ID').value;
        // Find the index of the ToDo object in the todoList array
        const index = todoList.findIndex(todo => todo.id === todoId);

        // If the ToDo object is found
        if (index !== -1) {
            // Update the ToDo object's properties
            todoList[index].title = document.getElementById('Title').value;
            todoList[index].category = document.getElementById('Category').value;
            todoList[index].notes = document.getElementById('Notes').value;
            todoList[index].dueDate = convertDateFormat(document.getElementById('DueDate').value);

            // Update priority based on the selected radio button
            if (document.getElementById('todopriorityLow').checked) {
                todoList[index].priority = 'Low';
            } else if (document.getElementById('todopriorityMedium').checked) {
                todoList[index].priority = 'Medium';
            } else if (document.getElementById('todopriorityHigh').checked) {
                todoList[index].priority = 'High';
            }

            // Optionally, update the UI to reflect the changes

            // Disable form fields and change button text to "Edit"
            document.getElementById('Title').disabled = true;
            document.getElementById('Category').disabled = true;
            document.getElementById('Notes').disabled = true;
            document.getElementById('DueDate').disabled = true;
            document.getElementById('todopriorityLow').disabled = true;
            document.getElementById('todopriorityMedium').disabled = true;
            document.getElementById('todopriorityHigh').disabled = true;

            updateBtn.innerText = 'Edit';
            // Call the function to display ToDo cards
            displayToDoCards();
            alert("To-Do updated successfully.");
        } else {
            console.log('ToDo object not found in todoList array.');
        }
    }
});

// Get the delete button element
const deleteBtn = document.getElementById('deleteBtn');

// Add event listener to the delete button
deleteBtn.addEventListener('click', function() {
    // Prompt the user with a confirmation dialog
    const confirmation = confirm('Are you sure you want to delete this To-Do?');

    // Check if the user confirmed the deletion
    if (confirmation) {
        // Get the ID of the ToDo to be deleted
        const todoIdToDelete = document.querySelector('#ID').value;

        // Find the index of the ToDo in the todoList array
        const indexToDelete = todoList.findIndex(todo => todo.id === todoIdToDelete);

        // Check if the ToDo was found in the todoList array
        if (indexToDelete !== -1) {
            // Remove the ToDo from the todoList array
            todoList.splice(indexToDelete, 1);

            // Update the display of ToDo cards
            displayToDoCards();

            // Optionally, notify the user that the ToDo was deleted
            alert('To-Do deleted successfully.');
        } else {
            // ToDo not found in the todoList array
            alert('To-Do not found.');
        }
        closeModal("UDTodoModal");
    }
});