let data;
let selectedProject = -1;

var pageTitle = $("project-title");

var projectCard = document.getElementById("project-card");
var taskContainer = document.getElementById("task-container");

var pop = $("#task-popup");

function uuid() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

// =================================================================
//
// Task Management Functions
//
// =================================================================

function addTaskToProject() {
  // insert into array
  insertNewTask(
    $("#t-name-i").val(),
    false,
    $("#select-member").val(),
    $("#deadline").val(),
    $("#description").val()
  );
}

function clearTaskContainer() {
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.lastChild);
  }
}

function insertNewTask(name, isComplete, assignedTo, deadline, description) {
  var task = {
    name,
    isComplete,
    assignedTo,
    deadline,
    description,
  };

  // var task = {
  //   name: "troooooooooooooooooool",
  //   isComplete: false,
  //   assignedTo: 1,
  //   deadline: "2021-11-11",
  //   description: "there is no description",
  // };
  console.log(task);
  console.log("before", data.projects[0].tasks);
  data.projects[0].tasks.push(task);
  console.log("after", data.projects[0].tasks);
}

function onSaveNewTask() {
  // insert
  addTaskToProject();
  // clear
  clearTaskContainer();
  // reload tasks
  const project = data.projects[0];
  // close modal
  $("#task-input").hide();
  console.log(data.projects[0].tasks);
}

function setupTaskInputModal() {
  populateDropdownWithUsers();

  $("#create-task-btn").on("click", onSaveNewTask);

  $("#t-close-i").on("click", () => {
    $("#task-input").hide();
  });
  $("#task-input").show();
}

function setupTaskDisplay(task) {
  $("#t-name").html(task.name);
  $("#t-desc").html(task.description);
  $("#t-assigned").html("Assigned To: " + task.assignedTo);
  $("#t-deadline").html("Deadline: " + task.deadline);

  $("#t-close").on("click", () => {
    $("#task-modal").hide();
  });
  $("#task-modal").show();
}

function renderTasks(tasks) {
  $("#back-btn").on("click", () => {
    toggleView("task");
  });

  unloadTasksFromDOM();

  tasks.forEach((task, index) => {
    var div = document.createElement("div");
    div.setAttribute("id", "task-" + index);

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    var h4 = document.createElement("h4");

    h4.textContent = task.name;

    checkbox.checked = task.isComplete;

    div.appendChild(checkbox);
    div.appendChild(h4);
    div.classList.add("task-card");
    div.addEventListener("click", () => setupTaskDisplay(task));

    taskContainer.appendChild(div);
  });
}

function unloadTasksFromDOM() {
  projectCard.style.display = "block";
  taskContainer.style.display = "none";
  pageTitle.innerHTML = "Projects";
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.lastChild);
  }
}

// =================================================================
//
// Modal Functions
//
// =================================================================

function loadProjectModal() {
  $("#project-modal").show();
  $("#p-save").on("click");
  $("#p-close").on("click", () => $("#project-modal").hide());
}

function clearDropdown() {
  var select = document.getElementById("select-member");
  while (select.firstChild) {
    select.removeChild(select.lastChild);
  }
}

function populateDropdownWithUsers() {
  members = ["jason", "belle", "delphine"];
  var select = document.getElementById("select-member");

  members.forEach((member) => {
    var option = document.createElement("option");
    option.setAttribute("value", member);
    option.textContent = member;

    select.appendChild(option);
  });
  // dropdown.appendChild();
}

function startPopupToInsertProject() {
  $("#modal-title").html("New Project");
  $("#modal-body").hide();
  $("#assigned-to").hide();

  clearDropdown();
  populateDropdownWithUsers();

  $("#modal-edit").html("Create");
  $("#modal-close").html("Cancel");
  $("#modal-close").on("click", () => $("#task-popup").hide());

  pop.show();
}

// =================================================================
//
// Project Management Functions
//
// =================================================================

function unloadProjectsFromDOM() {
  while (projectCard.firstChild) {
    projectCard.removeChild(projectCard.lastChild);
  }
}

function insertNewProject(title, desc) {
  var project = {
    _id: uuid(),
    title,
    desc,
    members: [1],
  };
  data.projects.push(project);
}

async function loadInitialProject() {
  data = await getData();
  renderProjectTODOM(data);
}

function renderProjectTODOM(obj) {
  $("#back-btn").on("click", () => {
    toggleView("project");
  });

  toggleView("project");
  unloadProjectsFromDOM();
  obj.projects.forEach((project, index) => {
    var div = document.createElement("div");
    div.setAttribute("id", "project-" + index);
    div.classList.add("project-card");
    var h3 = document.createElement("h3");
    // var hr = document.createElement("hr");
    h3.textContent = project.title;

    div.addEventListener("click", () => {
      toggleView("task");
      pageTitle.innerHTML = project.title;

      // load tasks of project
      renderTasks(project.tasks);
    });

    div.appendChild(h3);
    // div.appendChild(hr);
    projectCard.appendChild(div);
  });

  renderButtonToAddProject();
}

function renderButtonToAddProject() {
  var div = document.createElement("div");
  div.setAttribute("id", "add-project");
  div.classList.add("project-card");
  div.classList.add("text-center");
  div.classList.add("add-new-project");
  var h3 = document.createElement("h3");
  h3.textContent = "+";

  div.addEventListener("click", loadProjectModal);

  div.appendChild(h3);
  projectCard.appendChild(div);
}

// =================================================================
//
// Data Functions
//
// =================================================================

async function getData() {
  const obj = await fetch("../data/data.json");
  return obj.json();
}

// =================================================================
//
// MAIN
//
// =================================================================

function closeProjectModal() {
  $("#p-name").val("");
  $("#project-modal").hide();
}

function addProject() {
  insertNewProject($("#p-name").val());
  unloadProjectsFromDOM();
  renderProjectTODOM(data);
  closeProjectModal();
}

function renderHomePage() {
  taskContainer.style.display = "none";
  pop.hide();
}

renderHomePage();
loadInitialProject();
// $("#modal-edit").on("click", addProject);
$("#p-save").on("click", addProject);

$("#back-btn").on("click", () => {
  toggleView("project");
  renderProjectTODOM(data);
});
