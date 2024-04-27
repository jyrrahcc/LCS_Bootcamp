// Array to store ToDo objects
var todoList = [];
todoList = getToDoList();

//Array Month Names
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Constructor function for ToDo object
function ToDo(id, title, category, notes, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
}

displayToDoCards(todoList);
displayCategories();

// Save todoList array to local storage
function saveToDoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Retrieve todoList array from local storage
function getToDoList() {
    const savedList = localStorage.getItem('todoList');
    return savedList ? JSON.parse(savedList) : [];
}

// Generate unique ID function for ToDo objects
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

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
        convertDateFormat(dueDate),
        priority
    );

    // Add the new ToDo object to the todoList array
    todoList.push(newToDo);

    // Log the updated todoList array
    console.log('Successfully added:', newToDo);

    // clear the form fields after creating the ToDo
    document.getElementById('createTodoForm').reset();

    alert("ToDo created successfully.");

    //redisplay todo cards
    displayToDoCards(todoList);

    //reload categories
    displayCategories();

    // Close the modal
    closeModal("addTodoModal");
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
function displayToDoCards(filteredTodos) {
    // Sort the filteredTodos array based on dueDate in ascending order
    filteredTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Get the section where ToDo cards will be displayed
    const section = document.getElementById('todoSection');

    // Clear any existing content in the section
    section.innerHTML = '';

    // Iterate over the sorted todoList array
    filteredTodos.forEach(todo => {
        // Create a new ToDo card element
        const todoCard = document.createElement('section');

        // Add classes to the div
        todoCard.classList.add('todo-card', 'shadow');

        // Set data attributes
        todoCard.setAttribute('data-toggle', 'modal');
        todoCard.setAttribute('data-target', '#UDTodoModal');
        todoCard.setAttribute('data-todo-id', todo.id);
        todoCard.setAttribute('data-todo-title', todo.title);
        todoCard.setAttribute('data-todo-category', todo.category);
        todoCard.setAttribute('data-todo-notes', todo.notes);
        todoCard.setAttribute('data-todo-due-date', todo.dueDate);
        todoCard.setAttribute('data-todo-priority', todo.priority);

        todoCard.innerHTML = `
            <div class="todo-id d-none">${todo.id}</div>
            <div class="todo-header">
                <h3 class="todo-title fs-4">${todo.title}</h3>
            </div>
            <p class="fs-5 text-muted mb-2 fs-6">${todo.category}</p>
            <div class="todo-details">
                <p class="todo-description">${todo.notes}</p>
                <div class="todo-meta">
                    <p class="todo-due-date text-muted mb-2">${todo.dueDate}</p>
                    <p class="todo-priority todo-${todo.priority} text-light rounded-pill">${todo.priority}</p>
                </div>
            </div>
        `;

        // Append the ToDo card to the section
        section.appendChild(todoCard);
    });
    saveToDoList();
    // Add event listeners to newly created elements
    addListenersToDoCards();
}

// Function to add event listeners to displayed ToDo cards
function addListenersToDoCards() {
    // Get all the ToDo cards
    const todoCards = document.querySelectorAll('.todo-card');

    // Iterate over each ToDo card and attach event listener
    todoCards.forEach(todoCard => {
        todoCard.addEventListener('click', function() {
            populateTodoDetails(this);
        });
    });
}

// Function to populate modal todo details
function populateTodoDetails(element) {
    // Access data attributes of the clicked ToDo card
    const todoId = element.dataset.todoId;
    const todoTitle = element.dataset.todoTitle;
    const todoCategory = element.dataset.todoCategory;
    const todoNotes = element.dataset.todoNotes;
    const todoDueDate = element.dataset.todoDueDate;
    const todoPriority = element.dataset.todoPriority;

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
    document.getElementById('todopriority' + todoPriority).checked = true;
}

// Function to display categories
function displayCategories() {
    // Extract unique categories from todoList
    const categories = [...new Set(todoList.map(todo => todo.category))];

    // Get the collapse elements
    const categoryList = document.querySelector('#category-collapse');
    const categoriesList = document.querySelector('#categories-collapse');

    // Clear any existing content
    categoryList.innerHTML = '';
    categoriesList.innerHTML = '';

    // Loop through each category and create <a> elements
    categories.forEach(category => {
        // Create <a> elements for each category
        const a = document.createElement('a');
        a.href = '#';
        a.classList.add('nav_item');
        a.textContent = category; // Insert category text

        // Append category to the respective collapse element
        categoryList.appendChild(a.cloneNode(true)); // Clone for the other collapse element
        categoriesList.appendChild(a);
    });

    // Get all category filters
    const categoryFilters = document.querySelectorAll('#category-collapse a');
    const categoriesFilters = document.querySelectorAll('#categories-collapse a');

    // Add click event listeners for category buttons
    categoryButtonsEvents(categoryFilters);
    categoryButtonsEvents(categoriesFilters);
}

// Function to edit and update todo
function editUpdateToDo() {
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
            displayToDoCards(todoList);
            displayCategories();
            alert("To-Do updated successfully.");
        } else {
            console.log('ToDo object not found in todoList array.');
        }
    }
}

// Function to delete todo
function deleteToDo() {
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

            // Update the display of ToDo cards and categories
            displayToDoCards(todoList);
            displayCategories();

            // Optionally, notify the user that the ToDo was deleted
            alert('To-Do deleted successfully.');
        } else {
            // ToDo not found in the todoList array
            alert('To-Do not found.');
        }
        closeModal("UDTodoModal");
    }
}

// Function to add event listeners to each category filter
function categoryButtonsEvents(categoryfilter) {
    // Event listeners for category filters
    categoryfilter.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.textContent.trim(); // Get the category text
            const filteredTodos = filterByCategory(category);
            h1.textContent = "Category - " + category; // Update heading
            // Call a function to display filtered todos
            displayToDoCards(filteredTodos);
        });
    });
}

// Function to filter todoList based on category
function filterByCategory(category) {
    return todoList.filter(todo => todo.category === category);
}

// Function to filter todoList based on priority
function filterByPriority(priority) {
    return todoList.filter(todo => todo.priority === priority);
}

// set min date of input type="date"
function minDate() {
// Get today's date
var today = new Date();

// Format the date as yyyy-mm-dd
var yyyy = today.getFullYear();
var mm = String(today.getMonth() + 1).padStart(2, '0');
var dd = String(today.getDate()).padStart(2, '0');

var minDate = yyyy + '-' + mm + '-' + dd;

// Set the minimum date for the due date input
document.getElementById('todoDueDate').setAttribute('min', minDate);
document.getElementById('DueDate').setAttribute('min', minDate);
}

// close a Modal
function closeModal(modalID){
// Close the Bootstrap modal without jQuery
var modal = document.getElementById(modalID);
modal.classList.remove('show');
modal.setAttribute('aria-hidden', 'true');
modal.setAttribute('style', 'display: none');

var backdrop = document.querySelector('.modal-backdrop');
backdrop.remove();
}

// Convert "April 24, 2024" to "2024-04-24"
function formatStringToDate(dateString) {
    // Split the date string into its components
    const parts = dateString.split(' ');

    // Extract the month, day, and year
    const month = parts[0];
    const day = parseInt(parts[1].replace(',', ''), 10);
    const year = parseInt(parts[2], 10);

    // Create a Date object with the extracted components + 1 for day discrepancies
    const dateObject = new Date(year, monthNames.indexOf(month), day + 1);

    // Format the date to "YYYY-MM-DD"
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate;
}

// Convert "2024-04-24" to "April 4, 2024"
function convertDateFormat(dateString) {
    // Create a new Date object from the input date string
    const date = new Date(dateString);

    // Extract the day, month index, and year components
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Format the date string
    const formattedDate = monthNames[monthIndex] + ' ' + day + ', ' + year;

    return formattedDate;
}