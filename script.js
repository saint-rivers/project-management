var pageTitle = document.getElementById("project-title");

var projectCard = document.getElementById("project-card");
var taskContainer = document.getElementById("task-container");

function renderHomePage() {
  taskContainer.style.display = "none";
}

function loadTasksOfProject(project){

	var backBtn = document.createElement("input")
	backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "back");
  backBtn.addEventListener("click", backToProjectPage)
	taskContainer.appendChild(backBtn);
  taskContainer.appendChild(document.createElement("hr"))

	project.tasks.forEach((task, index) => {
		var div = document.createElement("div");
    div.setAttribute("id", "task-" + index);

		var checkbox = document.createElement("input")
		checkbox.setAttribute("type", "checkbox");

    var h4 = document.createElement("h4");
    var hr = document.createElement("hr");

		h4.textContent = task.name;
		h4.classList.add("task-card")

		checkbox.checked = task.isComplete;

		div.appendChild(checkbox);
		div.appendChild(h4);
    div.appendChild(hr);

		taskContainer.appendChild(div);
	})
}

function insertProjectIntoDOM(obj) {
  obj.projects.forEach((project, index) => {
    var div = document.createElement("div");
    div.setAttribute("id", "project-" + index);
    var h3 = document.createElement("h3");
    var hr = document.createElement("hr");
    h3.textContent = project.title;

    div.addEventListener("click", () => {
      projectCard.style.display = "none";
      taskContainer.style.display = "block";
      pageTitle.innerHTML = project.title;

			// load tasks of project
			loadTasksOfProject(project)
    });

    div.appendChild(h3);
    div.appendChild(hr);
    projectCard.appendChild(div);
  });
}

function backToProjectPage(){
  projectCard.style.display = "block";
  taskContainer.style.display = "none";
  pageTitle.innerHTML = "Projects";
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.lastChild);
  }
}

function loadProjects() {
  var obj;
  fetch("./data.json")
    .then((response) => response.json())
    .then((json) => (obj = json))
    .then(() => insertProjectIntoDOM(obj));
}

renderHomePage();
loadProjects();
