

function resetFormInputs() {
  titleInput().value = "";
  descriptionInput().value = "";
}

function resetMain() {
  main().innerHTML = "";
}

//form links
function formLinkEvent() {
  pFormLink().addEventListener("click", function(e) {
    e.preventDefault();

    Project.renderPForm();
  })
}
function projectsLinkEvent() {
  projectsLink().addEventListener("click", function(e) {
    e.preventDefault();

    Project.renderProjects();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  Project.getProjects();
  formLinkEvent();
  projectsLinkEvent();
  // renderPForm();
})