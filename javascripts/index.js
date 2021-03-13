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

function projectFormTemplate() {
  return `
  <h3>Create Project</h3>
  <form id="project_form">
    <div class="input-feild">
      <label for="name">Project Name</label>
      <input type="text" name="name" id="name"><br>
    </div>
    <div class="input-feild">
      <label for="lead-name">Team Lead </label>
      <input type="text" name="lead-name" id="lead-name"><br>
    </div>
    <div class="input-feild">
      <label for="description">Project Description</label><br>
      <textarea name="description" id="description" cols="30" rows="5"></textarea>
    </div>
    <input type="submit" value="Create Project">
  </form>
  `;
}

function editFormTemplate(project) {
  return `
  <h3>Edit Project</h3>
  <form id="project_form" data-id="${project.id}">
  <div class="input-feild">
  <label for="name">Project Name</label>
  <input type="text" name="name" id="name" value="${project.name}"><br>
  </div>
  <div class="input-feild">
  <label for="description">Description</label><br>
  <textarea name="description" id="description" cols="30" rows="5">${project.description}</textarea>
  </div>
  <input type="submit" value="Edit">
  </form>
  `;
}

function editProject(e) {
  e.preventDefault();
  const id = e.target.dataset.id;

  const project = Project.all.find(function(project) {
    return project.id == id;
  })

  renderEditForm(project);
}

function deleteProject(e) {
  e.preventDefault();
  
  let id = e.target.dataset.id;

  fetch(baseUrl + "/projects/" + id, {
    method: "DELETE"
  })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {

    Project.all = Project.all.filter(function(project) {
      return project.id !== data.id;
    })
    Project.renderProjects();
  });
}
function renderPForm() {
  resetMain();
  main().innerHTML = projectFormTemplate();
  pForm().addEventListener("submit", submitPForm);
}

function renderEditForm(project) {
  resetMain();
  main().innerHTML = editFormTemplate(project);
  pForm().addEventListener("submit", submitEditProjectForm);
}

function submitEditProjectForm(e) {
  e.preventDefault();

  let strongParams = {
    project: {
      name: nameInput().value,
      description: descriptionInput().value
    }
  }
  const id = e.target.dataset.id;

  fetch(baseUrl + "/projects/" + id, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(strongParams)
  })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(project) {
    let p = Project.all.find(function(p) {
      return p.id == project.id;
    })
    let idx = Project.all.indexOf(p);
    Project.all[idx] = project;
    alert(`${project.name} was edited`)
    Project.renderProjects();
  })
}

function submitPForm(e) {
  e.preventDefault();

  let strongParams = {
    project: {
      name: nameInput().value,
      description: descriptionInput().value,
      lead_attributes: leadNameInput().value
    }
  }
  fetch(baseUrl+"/projects", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(strongParams),
    method: "POST"
  })
    .then( function(resp) {
      return resp.json();
    })
    .then( function(project) {
      Project.all.push(project)
      Project.renderProjects();
    })

}

//form links
function formLinkEvent() {
  pFormLink().addEventListener("click", function(e) {
    e.preventDefault();

    renderPForm();
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