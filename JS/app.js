let name = localStorage.getItem("firstName");
let email = localStorage.getItem("email");
document.getElementById("userEmail").innerHTML = email
document.getElementById("year").innerHTML = new Date().getFullYear()
const greetUsers = () => {
  let user = name;
  let hours = new Date().getHours();
  let msg;
  if (hours >= 5 && hours <= 11) {
    msg = "Good Morning";
  } else if (hours > 11 && hours <= 13) {
    msg = "Good Noon";
  } else if (hours > 13 && hours <= 16) {
    msg = "Good Afternoon";
  } else if (hours > 16 && hours < 20) {
    msg = "Good Evening";
  } else {
    msg = "Good Night";
  }

  let HTML = `<h2><span style="color:#000">${msg} ${user}</span>, Whats up!</h2>`;
  document.getElementById("greeting-msg").innerHTML = HTML;
};
greetUsers();

const notify = (msg, type) => {
  switch (type) {
    case "success": {
      Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #000000, #0f9b0f)",
        },
        onClick: function () {},
      }).showToast();
      break;
    }
    case "error": {
      Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)",
        },
        onClick: function () {},
      }).showToast();
    }
  }
};

const getInp = (id) => document.getElementById(id);
let getRanId = () => Math.random().toString(36).slice(4);

let getTime = () => {
  let HH = new Date().getHours();
  let MM = new Date().getMinutes();
  return `${HH}:${MM}`;
};

let todos = [];

const addTask = () => {
  event.preventDefault();
  let task = {
    taskName: getInp("taskNameIn").value,
    taskDue: getInp("taskDueIn").value,
    taskCreatedAt: getTime(),
  };
  if (!task.taskName) {
    notify("Enter task name", "error");
  } else if (!task.taskDue) {
    notify("Enter due time", "error");
  } else {
    let taskContainer = document.getElementById("task-container");
    notify("Task added", "success");
    todos.push(task);
    let newTask = document.createElement("div");
    newTask.innerHTML = `<div class="my-3" id="task">
<div class="d-flex justify-content-between">
  <div id="taskName">${task.taskName}</div>
  <div id="taskDue">${task.taskDue}</div>
  <div id="taskCreatedAt">${task.taskCreatedAt}</div>
</div>
<div class="d-flex justify-content-end pt-3 pe-2 gap-2">
  <button class="btn btn-danger" id="delete">Delete</button>
  <button class="btn btn-success" id="edit">Edit</button>
  <button class="btn btn-info" id="comp">Completed</button>
</div>
</div>`;
    taskContainer.appendChild(newTask);
    newTask.addEventListener("click", (event) => {
      const clickedElement = event.target;
      const clickedTask = clickedElement.closest(".my-3");
      if (clickedElement.classList.contains("btn-danger")) {
        clickedTask.remove();
      } else if (clickedElement.classList.contains("btn-info")) {
        clickedTask.remove();
      } else if (clickedElement.classList.contains("btn-success")) {
        let newName = getInp("taskNameIn").value;
        let newDue = getInp("taskDueIn").value;
        if (newName && newDue) {
          newTask.querySelector("#taskName").innerHTML = newName;
          newTask.querySelector("#taskDue").innerHTML = newDue;
          notify("both changed", "success");
        } else if (newName) {
          newTask.querySelector("#taskName").innerHTML = newName;
          notify("task name edited", "success");
        } else if (newDue) {
          notify("task time edited", "success");
          newTask.querySelector("#taskDue").innerHTML = newDue;
        } else {
          notify("Enter new name or due", "error");
        }
      }
    });
  }
};
