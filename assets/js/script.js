// Retrieve tasks and nextId from localStorage, or initialize them
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
    const id = nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

// Function to create a task card
function createTaskCard(task) {
    return `
    <div class="card mb-2" id="task-${task.id}" data-id="${task.id}">
        <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text"><small class="text-muted">Due: ${dayjs(task.dueDate).format('MMMM D, YYYY') || 'No due date'}</small></p>
            <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
        </div>
    </div>
    `;
}


// Function to render the task list and make cards draggable
function renderTaskList() {
    // Clear existing tasks
    ['todo', 'in-progress', 'done'].forEach(status => {
        $(`#${status}-cards`).empty();
    });

    if (taskList.length) {
        taskList.forEach(task => {
            const taskCard = createTaskCard(task);
            $(`#${task.status}-cards`).append(taskCard);
        });
    }

    // Make task cards draggable
    $(".card").draggable({
        revert: "invalid",
        helper: "clone"
    });

    // Make lanes droppable
    $(".lane .card-body").droppable({
        accept: ".card",
        drop: handleDrop
    });
}

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const title = $("#task-title").val();
    const description = $("#task-description").val();
    const status = "todo"; // Default status or handle category selection if implemented
    const dueDate = dayjs($("#due-date").val()).format('YYYY-MM-DD'); // Format the date

    const newTask = {
        id: generateTaskId(),
        title,
        description,
        status,
        dueDate: dueDate || 'No due date'
    };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();

    // Close the modal
    const modalElement = document.querySelector('#formModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}



// Function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).data("id");
    taskList = taskList.filter(task => task.id !== taskId);

    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.helper.data("id");
    const newStatus = $(this).closest('.lane').attr('id');

    taskList = taskList.map(task => {
        if (task.id === taskId) {
            task.status = newStatus;
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
}

// When the page loads
$(document).ready(function () {
    renderTaskList();

    // Initialize the date picker
    $("#due-date").datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText) {
            // Optionally format date with Day.js here if needed
            const formattedDate = dayjs(dateText).format('YYYY-MM-DD');
            $(this).val(formattedDate);
        }
    });

    $('#add-task-form').on('submit', handleAddTask);
    $(document).on('click', '.delete-task', handleDeleteTask);
});

