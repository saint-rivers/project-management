function toggleNavigation(mode) {
  if (mode == "hidden") {
    $("#back-btn").hide();
    $("#add-btn").hide();
  } else if (mode == "visible") {
    $("#back-btn").show();
    $("#add-btn").show();
  }
}

function toggleView(mode) {
  if (mode == "project") {
    $("#task-container").hide();
		$("#project-card").show();
		toggleNavigation("hidden")
  } else if (mode == "task"){
    $("#task-container").show();
		$("#project-card").hide();
		toggleNavigation("visible")
	}  
}
