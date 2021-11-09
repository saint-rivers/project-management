var pageTitle = $("project-title");

var projectCard = document.getElementById("project-card");
var taskContainer = document.getElementById("task-container");

var pop = $("#task-popup");

function renderHomePage() {
  taskContainer.style.display = "none";
  pop.hide();
}

function loadTasksOfProject(project){

	var backBtn = document.createElement("input")

  // set back button
	backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "back");
  backBtn.classList.add("back-btn");
  backBtn.addEventListener("click", backToProjectPage)


	taskContainer.appendChild(backBtn);
  taskContainer.appendChild(document.createElement("hr"))

	project.tasks.forEach((task, index) => {
		var div = document.createElement("div");
    div.setAttribute("id", "task-" + index);

		var checkbox = document.createElement("input")
		checkbox.setAttribute("type", "checkbox");

    var h4 = document.createElement("h4");
    // var hr = document.createElement("hr");

		h4.textContent = task.name;
    
		checkbox.checked = task.isComplete;
    
		div.appendChild(checkbox);
		div.appendChild(h4);
		div.classList.add("task-card")
    div.addEventListener("click", () => {
      
      var modalBody = task.description;
      var assignedTo = "Assigned To: " + task.assignedTo;
      
      $("#modal-title").html(task.name)
      $("#modal-body").find("p").html(modalBody);
      $("#assigned-to").find("p").html(assignedTo);
      $("#modal-close").on("click", ()=>$("#task-popup").hide())

      pop.show();
    })

    // div.appendChild(hr);

		taskContainer.appendChild(div);
	})
}

function insertProjectIntoDOM(obj) {
  obj.projects.forEach((project, index) => {
    var div = document.createElement("div");
    div.setAttribute("id", "project-" + index);
    div.classList.add("project-card");
    var h3 = document.createElement("h3");
    // var hr = document.createElement("hr");
    h3.textContent = project.title;

    div.addEventListener("click", () => {
      projectCard.style.display = "none";
      taskContainer.style.display = "block";
      pageTitle.innerHTML = project.title;

			// load tasks of project
			loadTasksOfProject(project)
    });

    div.appendChild(h3);
    // div.appendChild(hr);
    projectCard.appendChild(div);
  });

  loadNewProjectButton()
}

function loadNewProjectButton(){
  var div = document.createElement("div");
  div.setAttribute("id", "add-project");
  div.classList.add("project-card");
  div.classList.add("text-center")
  div.classList.add("add-new-project")
  var h3 = document.createElement("h3");
  h3.textContent = "+"

  div.addEventListener("click", (e)=>{
    $("#modal-title").html("New Project")
    $("#modal-body").find("p").html("asd");
    $("#assigned-to").find("p").html("asd");

    $("#modal-edit").html("Create")
    $("#modal-close").html("Cancel")
    $("#modal-close").on("click", ()=>$("#task-popup").hide())

    pop.show();
  })

  div.appendChild(h3)
  projectCard.appendChild(div)
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
  fetch("../data/data.json")
    .then((response) => response.json())
    .then((json) => (obj = json))
    .then(() => insertProjectIntoDOM(obj));
}

renderHomePage();
loadProjects();
