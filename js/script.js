// VAriables
let closeBtn = document.getElementsByClassName("close-btn"); //All Close Buttons
let editeBtn = document.getElementsByClassName("edite-btn"); //All Edite Buttons
let itemTask = document.getElementsByClassName("list-group-item"); //All Edite Buttons
let inputTask = document.getElementById("myInput"); // input Task
let list = document.querySelector("ul"); // List Container
let taskList = "";

// Get User ID
let userID = prompt("Enter Your User ID ...");

// Fetch All Users
async function fetchUsers() {
  let users = [];
  try {
    let data = await fetch("https://reqres.in/api/users");
    users = await data.json();
    console.log(users.data);
  } catch (error) {
    console.log(error);
  }
}

// Get All Tasks By User ID
const fetchTasks = () => {
  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${+userID}`)
    .then((res) => res.json())
    .then((data) => {
      showList(data);
      console.log(data);
    });
};

fetchUsers();
fetchTasks();

// View Todos List
const showList = (data) => {
  data.map((item) => {
    taskList += `<li class="list-group-item"><div class="w-75"><input class="taskContent" readonly type="text" value="${item.title}" onclick=completed(${item.completed},${item.id})></input></div><div class="w-25 d-flex justify-content-between btn-wrapper"><button onclick="editeTask(${item.id})" class="btn btn-warning edite-btn">Edite</button><button onclick="deleteTask(${item.id})" class="btn btn-danger close-btn">Delete</button></div></li>`;
    list.innerHTML = taskList;
  });
};

// Add a "checked" symbol when clicking on a list item
const completed = (status, taskId) => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: !status,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "INPUT") {
      ev.target.parentElement.parentElement.classList.toggle("completed");
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
// Request Send And Respone With New Data
function addNewTask() {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      completed: false,
      title: `${inputTask.value}`,
      userId: `${+userID}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

// Delete Item
// Request Send And Respone With New Data
const deleteTask = function (taskId) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  console.log(taskId);
  Array.from(closeBtn).forEach((element) => {
    element.onclick = function () {
      let task = this.parentElement.parentElement;
      task.remove();
    };
  });
};

// edite Item
// Request Send And Respone With New Data
const editeTask = function (taskId) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: `${inputTask.value}`,
      body: "bar",
      userId: `${+userID}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};
