// fetches to the backend
function getProjects() {
  fetch(baseUrl+'/projects')
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    Project.createFromCollection(data)
    Project.renderProjects();
  });
}

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
  getProjects();
  formLinkEvent();
  projectsLinkEvent();
  // renderPForm();
})