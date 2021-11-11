/**
 * Global Variables
 */

const tasks = document.querySelector(".tasks")!;
const handleTask = document.querySelector(".handle-task") as HTMLFormElement;
const handleTaskWrapper = document.querySelector(".handle-task-wrapper")!;
const backBtn = document.querySelector(".back-btn")!;
const editTask = document.querySelector(".edit-task")!;
const completed = document.getElementById("completed") as HTMLInputElement;
const taskId = document.querySelector(".task-id-content")!;
const taskName = document.querySelector(".task-name-content")!;

backBtn.addEventListener("click", () => {
  backBtn.classList.add("hide");
  editTask.classList.add("hide");
  tasks.classList.remove("hide");
  handleTaskWrapper.classList.remove("hide");
  tasks.innerHTML = "";
  getAllTasks();
});

let timeoutID: NodeJS.Timeout;
let errorElement: HTMLElement;

/**
 * Types
 */

type TaskType = {
  _id: string;
  name: string;
  completed: boolean;
  _v: number;
};

/**
 * Create Task
 */

const createTask = (task: TaskType) => {
  // Task
  let taskElement = document.createElement("article");
  taskElement.id = task._id;

  if (task.completed) {
    // If Task is completed then add checked icon to task
    // Created Span Element
    let isChecked = document.createElement("span");
    isChecked.classList.add("isChecked");
    // Created i Element
    let icon = document.createElement("i");
    icon.classList.add("fas", "fa-check-circle");
    isChecked.appendChild(icon);
    taskElement.appendChild(isChecked);
  }
  // Creating paragraph for task name
  let text = document.createElement("p");
  text.textContent = task.name;
  taskElement.appendChild(text);

  // creating edit button for editing task
  let editBtn = document.createElement("button");
  editBtn.classList.add("btn", "edit-btn");
  let editIcon = document.createElement("i");
  editIcon.classList.add("fas", "fa-edit");
  editBtn.appendChild(editIcon);
  taskElement.appendChild(editBtn);

  // Editing task
  editBtn.addEventListener("click", getTask);

  // creating delete button for deleting task
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "delete-btn");
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash");
  deleteBtn.appendChild(deleteIcon);
  taskElement.appendChild(deleteBtn);

  // Deleting task
  deleteBtn.addEventListener("click", deleteTask);

  // Adding task to tasks
  taskElement.classList.add("task");
  tasks.appendChild(taskElement);
};

/**
 * Get all tasks
 */
const getAllTasks = async () => {
  const response = await fetch(`/api/v1/tasks`);
  const data: { tasks: TaskType[] } = await response.json();
  // Showing all task
  data.tasks.map((task) => {
    createTask(task);
  });
};

// on load render all tasks
window.addEventListener("load", getAllTasks);

/**
 * Creating new task
 */
handleTask.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formElement = event.target as HTMLFormElement;
  let inputElement = formElement.elements[0] as HTMLInputElement;

  // Checking if value is valid or not
  if (inputElement.value) {
    // First delete last error
    deleteError();
    // Sending post (create) request
    const response = await fetch("/api/v1/tasks", {
      method: "POST",
      body: JSON.stringify({
        name: inputElement.value,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    // Getting data (task);
    const data: { task: TaskType } = await response.json();
    // removing value from input field
    inputElement.value = "";
    // create task
    createTask(data.task);
  } else {
    // if error does not exist create error
    if (handleTaskWrapper.children.length < 2) {
      createError("invalid-task", "Task must be more than 5 character!");
    } else {
      // clear previous timeout
      clearTimeout(timeoutID);
      // delete previous error
      deleteError();
      // create new error
      createError("invalid-task", "Task must be more than 5 character!");
    }
  }
});

/**
 * Create Error
 */
const createError = (which: string, msg: string) => {
  errorElement = document.createElement("article");
  errorElement.classList.add("error", which);
  errorElement.textContent = msg;
  handleTaskWrapper.appendChild(errorElement);

  // delete previous error after 3 sec
  timeoutID = setTimeout(() => {
    deleteError();
  }, 3000);
};

/**
 * Delete Error
 */
const deleteError = () => {
  // if error exist then, it is deleted
  if (handleTaskWrapper.children.length > 1) {
    handleTaskWrapper.removeChild(errorElement);
  }
};

/**
 * Delete task
 */
const deleteTask: EventListener = async (event) => {
  let target = event.currentTarget as HTMLButtonElement;
  let id = target.parentElement?.id!;
  try {
    await fetch(`/api/v1/tasks/${id}`, {
      method: "DELETE",
    });
    tasks.removeChild(target.parentElement!);
  } catch (error) {
    console.log(error);
  }
};
/**
 * Get task
 */
const getTask: EventListener = async (event) => {
  let target = event.currentTarget as HTMLButtonElement;
  let id = target.parentElement?.id!;
  try {
    const response = await fetch(`/api/v1/tasks/${id}`);
    const data: { task: TaskType } = await response.json();
    handleTaskWrapper.classList.add("hide");
    tasks.classList.add("hide");
    editTask.classList.remove("hide");

    taskId.textContent = data.task._id;
    taskName.textContent = data.task.name;
    completed.checked = data.task.completed;
  } catch (error) {
    console.log(error);
  }
};

const updateTask: EventListener = async (event) => {
  let target = event.currentTarget as HTMLInputElement;
  let id = taskId.textContent;
  try {
    await fetch(`/api/v1/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: target.checked,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    backBtn.classList.remove("hide");
  } catch (error) {
    console.log(error);
  }
  console.log(target.checked);
};

completed.addEventListener("click", updateTask);
