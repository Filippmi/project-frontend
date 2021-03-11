let projects = [];
const baseUrl = "http://localhost:3000"

function main() {
  return document.getElementById("main");
}

function nameInput() {
  return document.getElementById('name');
}

function descriptionInput() {
  return document.getElementById('description');
}

function pForm() {
  return document.getElementById("project_form");
}

// functions for Links
function pFormLink() {
  return document.getElementById("pform-link")
}
function projectsLink() {
  return document.getElementById("my-projects")
}

// fetches to the backend
function getProjects() {
  fetch(baseUrl+'/projects')
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    projects = data
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
        <label for="description">Description</label><br>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
      </div>
      <input type="submit" value="Create Project">
    </form>
  `;
}

function projectsTemp() {
  return `
  <h3>My Projects</h3>
  <div id="projects">
  </div>
  `
}

function renderProject(project) {
  const projectsDiv = document.getElementById("projects");
  const div = document.createElement("div");

  const h4 = document.createElement("h4");
  h4.innerText = `Project Name: ${project.name}`;

  const p = document.createElement("p");
  p.innerText = `Short description: ${project.description}`;

  div.append(h4, p)
  projectsDiv.appendChild(div);
}

function renderPForm() {
  resetMain();
  main().innerHTML = projectFormTemplate();
  pForm().addEventListener("submit", submitPForm);
}

function renderProjects() {
  resetMain();
  main().innerHTML = projectsTemp();

  projects.forEach( function(project) {
    renderProject(project)
  })
}

function submitPForm(e) {
  e.preventDefault();

  let strongParams = {
    project: {
      name: nameInput().value,
      description: descriptionInput().value
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
      projects.push(project)
      renderProjects();
    })

}

function formLinkEvent() {
  pFormLink().addEventListener("click", function(e) {
    e.preventDefault();

    renderPForm();
  })
}

function myProjectsLinkEvent() {
  projectsLink().addEventListener("click", function(e) {
    e.preventDefault();

    renderProjects();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  getProjects();
  formLinkEvent();
  myProjectsLinkEvent();
  // renderPForm();
})