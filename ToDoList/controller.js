// Get the create button element
const createBtn = document.getElementById('createTodoBtn');
// Get the edit or update button element
const updateBtn = document.getElementById('updateBtn');
// Get the delete button element
const deleteBtn = document.getElementById('deleteBtn');
// Get the home link element
const homeLinks = document.querySelectorAll('.home');
// Get the priority filter buttons
const priorityFilters = document.querySelectorAll('#priority-collapse a');
// Get the h1 element
const h1 = document.querySelector('h1');

// Event listener for edit and update button
updateBtn.addEventListener('click', function() {
    editUpdateToDo();
});

// Event listener for delete button
deleteBtn.addEventListener('click', function() {
    deleteToDo();
});

// Event listener for the create button
createBtn.addEventListener('click', function() {
    createToDo();
});

// Event listeners for the priority filters
priorityFilters.forEach(filter => {
    filter.addEventListener('click', function() {
        const priority = this.textContent.trim(); // Get the priority text
        const filteredTodos = filterByPriority(priority);
        h1.textContent = "Priority - " + filter.textContent;
        // Call a function to display filtered todos
        displayToDoCards(filteredTodos);
    });
});

// Event listener for the home links
homeLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        h1.textContent = "Home";
        // Call the displayToDoCards function without passing any filters
        displayToDoCards(todoList);
    });
});

